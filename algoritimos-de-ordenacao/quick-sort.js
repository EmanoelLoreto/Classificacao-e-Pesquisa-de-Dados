// Algoritmo Quick Sort, algoritmo para o particionamento:
// 1. Escolha arbitrariamente um pivô x.
// 2. Percorra o vetor a partir da esquerda até que v[i] ≥ x.
// 3. Percorra o vetor a partir da direita até que v[j] ≤ x.
// 4. Troque v[i] com v[j].
// 5. Continue este processo até os apontadores i e j se cruzarem.

// let array = [23, 4, 67, -8, 90, 54, 21]
// let array = [1, 2, 3, 4, 5, 6, 7, 8]
// let array = [8, 7, 6 , 5, 4, 3, 2, 1]
// let array = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8]

// let generateRandomArray = (size, min, max) => {
//   return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
// }

// let array = generateRandomArray(1000, 1, 1000);

const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

// console.log('Array: ', array);

// console.time('quickSort');

// array = quickSort(array);

// console.log('Array ordenado: ', array);

// console.timeEnd('quickSort');

export default quickSort;