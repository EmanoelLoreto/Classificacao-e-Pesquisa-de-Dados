// Merge Sort ou Ordenação por Mistura
// - Divide a lista em duas partes iguais (Dividir e Conquistar)
// • Continua dividindo (Recursivamente) até ter 1 elemento
// • Combina 2 conjuntos de forma a obter 1 conjunto maior e ordenado
// • Processo se repete até que exista apenas 1 conjunto.

// const generateRandomArray = (size, min, max) => {
//   return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
// }

// let array = generateRandomArray(1000, 1, 1000);

const merge = (left, right) => {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
}

const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }

  let meio = Math.floor(arr.length / 2)
  
  let left = arr.slice(0, meio)
  let right = arr.slice(meio)

  return merge(
    mergeSort(left),
    mergeSort(right),
  )
}

// console.log('Array: ', array);

// console.time('mergeSort');

// array = mergeSort(array);

// console.log('Array ordenado: ', array);

// console.timeEnd('mergeSort');

export default mergeSort