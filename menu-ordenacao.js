import readline from 'readline';
import bubbleSort from './algoritimos-de-ordenacao/bubble-sort.js'
import countingSort from './algoritimos-de-ordenacao/counting-sort.js';
import heapSortMax from './algoritimos-de-ordenacao/heap-sort-max.js';
import heapSortMin from './algoritimos-de-ordenacao/heap-sort-min.js';
import insertionSort from './algoritimos-de-ordenacao/insertion-sort.js'
import mergeSort from './algoritimos-de-ordenacao/merge-sort.js';
import quickSort from './algoritimos-de-ordenacao/quick-sort.js';
import selectionSort from './algoritimos-de-ordenacao/selection-sort.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numeros = [];

function exibirOpcoesDeOrdenacao() {
    console.log("\n\nEscolha uma opção para ordenar o array:");
    console.log("1 - Bubble Sort");
    console.log("2 - Counting Sort");
    console.log("3 - Heap Sort max");
    console.log("4 - Heap Sort Min");
    console.log("5 - Insertion Sort");
    console.log("6 - Merge sort");
    console.log("7 - Quick sort");
    console.log("8 - Selection sort");
    console.log("9 - Inserir um novo array");

    rl.question('Digite o número da opção desejada: ', (opcao) => {
        let resultado;
        console.log('\n\n')
        switch (opcao) {
            case '1':
                console.time('bubbleSort');
                resultado = bubbleSort(numeros);
                console.log("Array ordenado pelo Bubble Sort: " + resultado);
                console.timeEnd('bubbleSort');
                break;
            case '2':
                console.time('countingSort');
                resultado = countingSort(numeros);
                console.log("Array ordenado pelo Counting Sort: " + resultado);
                console.timeEnd('countingSort');
                break;
            case '3':
              console.time('heapSortMax');
              resultado = heapSortMax(numeros);
              console.log("Array ordenado pelo Heap Sort Max: " + resultado);
              console.timeEnd('heapSortMax');
              break;
            case '4':
              console.time('heapSortMin');
              resultado = heapSortMin(numeros);
              console.log("Array ordenado pelo Heap Sort Min: " + resultado);
              console.timeEnd('heapSortMin');
              break;
            case '5':
              console.time('insertionSort');
              resultado = insertionSort(numeros);
              console.log("Array ordenado pelo Insertion Sort: " + resultado);
              console.timeEnd('insertionSort');
              break;
            case '6':
              console.time('mergeSort');
              resultado = mergeSort(numeros);
              console.log("Array ordenado pelo Merge Sort: " + resultado);
              console.timeEnd('mergeSort');
              break;
            case '7':
              console.time('quickSort');
              resultado = quickSort(numeros);
              console.log("Array ordenado pelo Quick Sort: " + resultado);
              console.timeEnd('quickSort');
              break;
            case '8':
              console.time('selectionSort');
              resultado = selectionSort(numeros);
              console.log("Array ordenado pelo Selection Sort: " + resultado);
              console.timeEnd('selectionSort');
              break;
            case '9':
                solicitarNovoArray();
                return;
            default:
                console.log("Opção inválida!");
                break;
        }
        exibirOpcoesDeOrdenacao();
    });
}

function solicitarNovoArray() {
  rl.question('Digite uma lista de números separados por vírgula para ordenar: ', (input) => {
      numeros = input.split(',').map(num => parseFloat(num.trim()));

      if (numeros.some(isNaN)) {
          console.log("Por favor, insira uma lista válida de números.");
          solicitarNovoArray();
      } else {
          exibirOpcoesDeOrdenacao();
      }
  });
}

solicitarNovoArray();
