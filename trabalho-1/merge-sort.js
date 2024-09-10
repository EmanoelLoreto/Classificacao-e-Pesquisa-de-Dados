const merge = (left, right) => {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].precoFloat < right[rightIndex].precoFloat) {
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
};

const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }

  let meio = Math.floor(arr.length / 2);
  let left = arr.slice(0, meio);
  let right = arr.slice(meio);

  return merge(
    mergeSort(left),
    mergeSort(right),
  );
};

export default mergeSort