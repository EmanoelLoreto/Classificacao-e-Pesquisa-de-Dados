import axios from 'axios'
import { load } from 'cheerio'
import fs from 'fs'
import mergeSort from './merge-sort.js';

const baseUrl = 'https://www.nuuvem.com/br-pt/catalog/platforms/pc/price/promo/sort/bestselling/sort-mode/desc/page/';

async function scrapeNuuvem() {
  const jogos = [];

  try {
    for (let page = 1; page <= 3; page++) {
      const url = `${baseUrl}${page}`;
      const { data } = await axios.get(url);
      
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

    console.log('Total de jogos encontrados:', jogos.length);
    console.log('3 primeiros jogos encontrados:', jogos.slice(0, 3));

    const jogosTexto = jogos.map(jogo => {
      return `Título: ${jogo.titulo}\nPreço: ${jogo.preco}\nLink: ${jogo.link}\n`;
    }).join('\n');

    fs.writeFileSync('jogos.txt', jogosTexto, 'utf-8');
    console.log('Lista de jogos salva em jogos.txt');
    
    const jogosOrdenados = mergeSort(jogos);

    const jogosOrdenadosTexto = jogosOrdenados.map(jogo => {
      return `Título: ${jogo.titulo}\nPreço: ${jogo.preco}\nLink: ${jogo.link}\n`;
    }).join('\n');

    fs.writeFileSync('jogos_ordenados.txt', jogosOrdenadosTexto, 'utf-8');
    console.log('Lista de jogos ordenada por preço salva em jogos_ordenados.txt');
  } catch (error) {
    console.error('Erro ao fazer o scraping:', error);
  }
}

scrapeNuuvem();
