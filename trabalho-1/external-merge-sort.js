import fs from 'fs/promises';
import fsP from 'fs';

function garantirPasta(pasta) {
    if (!fsP.existsSync(pasta)) {
        fsP.mkdirSync(pasta, { recursive: true });
    }
}

const MEMORY_LIMIT = 10;

async function externalMergeSort(inputFile, outputFile) {
    const games = JSON.parse(await fs.readFile(inputFile, 'utf8'));
    const tempFiles = await createSortedChunks(games);
    await mergeChunks(tempFiles, outputFile);
}

async function createSortedChunks(games) {
    const tempFiles = [];
    for (let i = 0; i < games.length; i += MEMORY_LIMIT) {
        const chunk = games.slice(i, i + MEMORY_LIMIT);
        chunk.sort((a, b) => a.precoFloat - b.precoFloat);
        const tempFile = `./runs/temp_${i}.json`;
        await fs.writeFile(tempFile, JSON.stringify(chunk));
        tempFiles.push(tempFile);
    }
    return tempFiles;
}

async function mergeChunks(tempFiles, outputFile) {
    const chunks = await Promise.all(tempFiles.map(async (file) => {
        const content = await fs.readFile(file, 'utf8');
        return JSON.parse(content);
    }));

    const indices = new Array(chunks.length).fill(0);

    await fs.writeFile(outputFile, '[\n');

    let isFirstItem = true;

    while (true) {
        let minIndex = -1;
        let minPrice = Infinity;

        for (let i = 0; i < chunks.length; i++) {
            if (indices[i] < chunks[i].length) {
                const price = chunks[i][indices[i]].precoFloat;
                if (price < minPrice) {
                    minPrice = price;
                    minIndex = i;
                }
            }
        }

        if (minIndex === -1) break;

        const item = chunks[minIndex][indices[minIndex]];
        indices[minIndex]++;

        if (!isFirstItem) {
            await fs.appendFile(outputFile, ',\n');
        } else {
            isFirstItem = false;
        }

        await fs.appendFile(outputFile, JSON.stringify(item, null, 2));
    }

    await fs.appendFile(outputFile, '\n]');
}

const inputFile = './jogos-nao-ordenados.json';
const outputFile = './jogos-ordenados.json';

garantirPasta('./runs');

externalMergeSort(inputFile, outputFile)
    .then(() => console.log('Ordenação concluída!'))
    .catch((error) => console.error('Erro durante a ordenação:', error));