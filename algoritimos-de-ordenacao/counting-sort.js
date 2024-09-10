let array = [23, 4, 67, -8, 90, 54, 21]
// let array = [1, 2, 3, 4, 5, 6, 7, 8]
// let array = [8, 7, 6 , 5, 4, 3, 2, 1]
// let array = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8]

// let generateRandomArray = (size, min, max) => {
//   return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
// }

// let array = generateRandomArray(1000, 1, 1000);

const countingSort = (arr) => {
  if (arr.length === 0) {
    return arr;
  }
   
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
     if (arr[i] < min) {
        min = arr[i];
     }
     if (arr[i] > max) {
        max = arr[i];
     }
  }
   
  const count = new Array(max - min + 1).fill(0);
  const output = new Array(arr.length);
   
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
   
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
   
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  return output;
}

// console.log('Array: ', array);

// console.time('countingSort');

// array = countingSort(array);

// console.log('Array ordenado: ', array);

// console.timeEnd('countingSort');

export default countingSort