import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import mergeSort from './merge-sort.js';
import path from 'path';

function garantirPasta(pasta) {
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
    console.log(`Pasta ${pasta} criada.`);
  }
}

const baseUrl = 'https://www.nuuvem.com/br-pt/catalog/platforms/pc/price/promo/sort/bestselling/sort-mode/desc/page/';
const PARTITION_SIZE = 10;

async function scrapeNuuvem() {
  let jogos = [];
  let numberOfPages = 10;
  let particaoIndex = 0;

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

        if (jogos.length >= PARTITION_SIZE) {
          salvarParticaoOrdenada(jogos, particaoIndex);
          particaoIndex++;
          jogos = [];
        }
      });
    }

    if (jogos.length > 0) {
      salvarParticaoOrdenada(jogos, particaoIndex);
    }

    console.timeEnd('\nPartições criadas salvas em disco.');
    return;
  } catch (error) {
    console.error('Erro ao fazer o scraping:', error);
  }
}

function salvarParticaoOrdenada(jogos, index) {
  console.time(`Tempo para ordenar e criar a partição ${index}`);
  
  const jogosOrdenados = mergeSort(jogos);
  
  const filePath = path.join('./runs', `particao_${index}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify(jogosOrdenados, null, 2), 'utf-8');
  
  console.timeEnd(`Tempo para ordenar e criar a partição ${index}`);
}

console.log('\nExecutando o Scrap nas 3 primeiras páginas da NuvemShop');

garantirPasta('./runs');

await scrapeNuuvem()

console.log('\nExecutando o merge de todas as partições salvas dentro da pasta ./runs.\n');

async function mergeParticoes(particaoCount) {
  const allJogos = [];

  console.log('\n');
  console.time(`Tempo para carregar e salvar em memoria as partições encontradas`);
  for (let i = 0; i < particaoCount; i++) {
    const filePath = path.join('./runs', `particao_${i}.json`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const jogos = JSON.parse(fileData);
      allJogos.push(...jogos);
    }
  }
  console.timeEnd(`Tempo para carregar e salvar em memoria as partições encontradas`);

  console.log('\n');
  console.time(`Tempo para ordenar todas as partições utilizando o Merge Sort`);

  const jogosOrdenados = mergeSort(allJogos);

  console.timeEnd(`Tempo para ordenar todas as partições utilizando o Merge Sort`);

  console.log('\n');
  console.time(`Tempo para criar o novo arquivo fusao.json com as partições mescladas`);

  const outputFilePath = path.join('./runs', 'fusao.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(jogosOrdenados, null, 2), 'utf-8');

  console.timeEnd(`Tempo para criar o novo arquivo fusao.json com as partições mescladas`);
  
  console.log('\n');
  console.log('Partições mescladas e salvas em ./runs/fusao.json');
}

function contarParticoes(pasta) {
  return new Promise((resolve, reject) => {
    fs.readdir(pasta, (err, files) => {
      if (err) return reject(err);
      const particoes = files.filter(file => file.startsWith('particao_') && file.endsWith('.json'));
      resolve(particoes.length);
    });
  });
}

async function executar() {
  try {
    console.time(`Tempo para encontrar todas as partições`);

    const particaoCount = await contarParticoes('./runs');

    console.timeEnd(`Tempo para encontrar todas as partições`);

    console.log(`\nNúmero de partições encontradas: ${particaoCount}`);
    if (particaoCount > 0) {
      await mergeParticoes(particaoCount);
    } else {
      console.log('Nenhuma partição encontrada para mesclar.');
    }
  } catch (error) {
    console.error('Erro ao contar partições ou realizar a fusão:', error);
  }
}

executar();
