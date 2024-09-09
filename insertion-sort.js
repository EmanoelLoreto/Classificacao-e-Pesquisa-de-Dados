// const array = [8, 3, 2, 6, 1, 7, 9]
// [8, 3, 2, 6, 1, 7, 9] index = 8, index2 + 1 = 3
// [3, 8, 2, 6, 1, 7, 9]
// [2, 3, 8, 6, 1, 7, 9]

const generateRandomArray = (size, min, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

let array = generateRandomArray(1000, 1, 1000);

console.log('Array original: ', array);

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

console.log('Array: ', array);

console.time('insertionSort');

insertionSort(array);

console.log('Array ordenado: ', array);

console.timeEnd('insertionSort');