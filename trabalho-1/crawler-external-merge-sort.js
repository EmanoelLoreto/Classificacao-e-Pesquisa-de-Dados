import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import mergeSort from './merge-sort.js';
import path from 'path';
import readline from 'readline';

const baseUrl = 'https://www.nuuvem.com/br-pt/catalog/platforms/pc/price/promo/sort/bestselling/sort-mode/desc/page/';
const PARTITION_SIZE = 10;

async function scrapeNuuvem() {
  let jogos = [];
  let particaoIndex = 0;

  try {
    for (let page = 1; page <= 3; page++) {
      console.log('\n')
      console.time(`Tempo para buscar a página ${page}`)

      const url = `${baseUrl}${page}`;
      const { data } = await axios.get(url);

      console.timeEnd(`Tempo para buscar a página ${page}`)
      
      const $ = load(data);

      // console.time(`Tempo para buscar a página ${page}`)
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

    console.log('\nPartições criadas salvas em disco.\n');
    return;
  } catch (error) {
    console.error('Erro ao fazer o scraping:', error);
  }
}

function salvarParticaoOrdenada(jogos, index) {
  console.time(`Tempo para ordenar e criar a partição ${index}`)
  const jogosOrdenados = mergeSort(jogos);

  const jogosTexto = jogosOrdenados.map(jogo => {
    return `Título: ${jogo.titulo}\nPreço: ${jogo.preco}\nLink: ${jogo.link}\n`;
  }).join('\n');

  fs.writeFileSync(`./runs/particao_${index}.txt`, jogosTexto, 'utf-8');
  console.timeEnd(`Tempo para ordenar e criar a partição ${index}`)
}

console.log('\nExecutando o Scrap nas 3 primeiras páginas da NuvemShop');

await scrapeNuuvem()

console.log('\nExecutando o merge de todas as partições salvas dentro da pasta ./runs.\n');

async function mergeParticoes(particaoCount) {
  const files = [];

  for (let i = 0; i < particaoCount; i++) {
    const fileStream = fs.createReadStream(`./runs/particao_${i}.txt`);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    files.push({ stream: rl, currentLine: null });
  }

  const output = fs.createWriteStream('./runs/fusao.txt');
  
  async function readNextLine(file) {
    const { value, done } = await file.stream[Symbol.asyncIterator]().next();
    file.currentLine = done ? null : value;
  }

  for (const file of files) {
    await readNextLine(file);
  }

  while (files.some(file => file.currentLine !== null)) {
    let minFile = null;
    let minPreco = Infinity;

    console.log('files: ', files);
    for (const file of files) {
      console.log('file: ', file);
      if (file.currentLine !== null) {
        const precoMatch = file.currentLine.match(/Preço: R\$\s?(\d+,\d+)/);
        if (precoMatch) {
          const precoFloat = parseFloat(precoMatch[1].replace(',', '.'));
          if (precoFloat < minPreco) {
            minPreco = precoFloat;
            minFile = file;
          }
        }
      }
    }

    if (minFile) {
      output.write(`${minFile.currentLine}\n`);
      minFile.currentLine = null;
      await readNextLine(minFile);
    }
  }

  output.end();
  console.log('Partições mescladas e salvas em ./runs/fusao.txt');
}

function contarParticoes(pasta) {
  return new Promise((resolve, reject) => {
    fs.readdir(pasta, (err, files) => {
      if (err) return reject(err);
      const particoes = files.filter(file => file.startsWith('particao_') && file.endsWith('.txt'));
      resolve(particoes.length);
    });
  });
}

async function executar() {
  try {
    console.time(`Tempo para encontrar todas as partições`)

    const particaoCount = await contarParticoes('./runs');

    console.timeEnd(`Tempo para encontrar todas as partições`)

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
