// Selection Sort ou Ordenação por Seleção
// • Cada passo, procura o menor valor do vetor e o coloca na primeira posição
// • Descarta a primeira posição do vetor e repete o processo para a segunda posição.
// • Isso é feito para todas as posições

// const array = [23, 4, 67, -8, 90, 54, 21]
// let array = [1, 2, 3, 4, 5, 6, 7, 8]
// const array = [8, 7, 6 , 5, 4, 3, 2, 1]
let array = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8]

// const generateRandomArray = (size, min, max) => {
//   return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
// }

// let array = generateRandomArray(1000, 1, 1000);

console.log('Array: ', array);

console.time('selectionSort');

for (let index = 0; index < array.length; index++) {
  let menor = array[index];
  let indexMenor = index;

  for (let index2 = index; index2 < array.length; index2++) {
    if (array[index2 + 1] < array[index] && array[index2 + 1] < menor) {
      menor = array[index2 + 1]
      indexMenor = index2 + 1
    }
  }

  array[indexMenor] = array[index]
  array[index] = menor
}

console.log('Array ordenado: ', array);

console.timeEnd('selectionSort');
