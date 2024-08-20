// Merge Sort ou Ordenação por Mistura
// - Divide a lista em duas partes iguais (Dividir e Conquistar)
// • Continua dividindo (Recursivamente) até ter 1 elemento
// • Combina 2 conjuntos de forma a obter 1 conjunto maior e ordenado
// • Processo se repete até que exista apenas 1 conjunto.

let array = [38, 27, 43, 3, 9, 82, 10]

console.log('Array: ', array);

const merge = (left, right) => {
  console.log('left: ', left);
  console.log('right: ', right);

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

  meio = Math.floor(arr.length / 2)
  
  let left = arr.slice(0, meio)
  let right = arr.slice(meio)

  return merge(
    mergeSort(left),
    mergeSort(right),
  )
}

array = mergeSort(array)

console.log(array);

