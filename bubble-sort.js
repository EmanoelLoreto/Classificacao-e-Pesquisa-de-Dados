const array = [8, 2, 3, 6, 1, 7, 9]
// const array = [1, 2, 3, 6, 7, 8, 9]
// const array = [9, 8 , 7, 6, 5, 4 , 3]

console.log('Array: ', array);

for (let index = 0; index < array.length; index++) {
  for (let index2 = 0; index2 < array.length; index2++) {
    if (array[index2] > array[index2 + 1]) {
      let temp = array[index2]

      array[index2] = array[index2 + 1]
      array[index2 + 1] = temp
    }
  }  
}

console.log('Array ordernado: ', array);
