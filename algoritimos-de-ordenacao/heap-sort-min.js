// let array = [23, 4, 67, -8, 90, 54, 21]
// let array = [1, 2, 3, 4, 5, 6, 7, 8]
// let array = [8, 7, 6 , 5, 4, 3, 2, 1]
// let array = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8]

// let generateRandomArray = (size, min, max) => {
//   return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
// }

// let array = generateRandomArray(1000, 1, 1000);

function heapifyMin(arr, n, i) {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];

        heapifyMin(arr, n, smallest);
    }
}

const heapSortMin = (arr) => {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyMin(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];

        heapifyMin(arr, i, 0);
    }

    return arr
}

// console.log('Array: ', array);

// console.time('heapSortMin');

// heapSortMin(array);

// console.log('Array ordenado: ', array);

// console.timeEnd('heapSortMin');

export default heapSortMin