// Selection Sort ou Ordenação por Seleção
// • Cada passo, procura o menor valor do vetor e o coloca na primeira posição
// • Descarta a primeira posição do vetor e repete o processo para a segunda posição.
// • Isso é feito para todas as posições

// const array = [23, 4, 67, -8, 90, 54, 21]
// const array = [1, 2, 3, 4, 5, 6, 7, 8]
const array = [8, 7, 6 , 5, 4, 3, 2, 1]

console.log('Array: ', array);

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
