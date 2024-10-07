import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.nuuvem.com/br-pt/catalog/platforms/pc/price/promo/sort/bestselling/sort-mode/desc/page/';

async function scrapeNuuvem() {
  let jogos = [];
  let numberOfPages = 10;

  try {
    console.time('\nPartições criadas salvas em disco.');
    for (let page = 1; page <= numberOfPages; page++) {
      console.log('\n')
      console.time(`Tempo para buscar a página ${page}`)

      const url = `${baseUrl}${page}`;
      const { data } = await axios.get(url);

      console.timeEnd(`Tempo para buscar a página ${page}`)
      
      const $ = load(data);

      $('.product-card--grid').each((index, element) => {
        const titulo = $(element).find('.product-title').text().trim();

        const precoButton = $(element).find($('.btn-conversion'));
        const precoElement = precoButton.find('.product-button__label');
        const precoSimbolo = precoElement.find('.currency-symbol').text().trim();
        const precoInteiro = precoElement.find('.integer').text().trim();
        const precoDecimal = precoElement.find('.decimal').text().trim();
        const preco = `${precoSimbolo} ${precoInteiro}${precoDecimal}`;

        const precoFloat = Number(`${precoInteiro}${precoDecimal}`.replace(',', '.'));

        const link = $(element).find('a').attr('href');

        jogos.push({ titulo, preco, precoFloat, link });
      });
    }

    salvarJogos(jogos);

    console.timeEnd('\nPartições criadas salvas em disco.');
    return;
  } catch (error) {
    console.error('Erro ao fazer o scraping:', error);
  }
}

function salvarJogos(jogos) {
  console.time('Tempo para salvar todos os jogos');
  
  const filePath = path.join('./', 'jogos-nao-ordenados.json');
  
  fs.writeFileSync(filePath, JSON.stringify(jogos, null, 2), 'utf-8');
  
  console.timeEnd('Tempo para salvar todos os jogos');
  console.log(`Total de jogos salvos: ${jogos.length}`);
}

console.log('\nExecutando o Scrap nas 10 primeiras páginas da NuvemShop');

await scrapeNuuvem()
