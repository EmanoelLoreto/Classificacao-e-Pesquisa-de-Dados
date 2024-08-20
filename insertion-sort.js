const array = [8, 3, 2, 6, 1, 7, 9]
// [8, 3, 2, 6, 1, 7, 9] index = 8, index2 + 1 = 3
// [3, 8, 2, 6, 1, 7, 9]
// [2, 3, 8, 6, 1, 7, 9]

console.log('Array: ', array);

const findLower = (index, index2) => {
  console.log('index: ', index);
  console.log('index2: ', index2);
  
  if (array[index] > array[index2])  {
    findLower(index2, index - 1)
  } else {
    console.log('Substituir: ', array[index], 'na posição: ', index, 'Por ', array[index2 + 1]);
    
    array.splice(index - 1, 0, array[index])
  }
}

for (let index = 0; index < array.length; index++) {
  findLower(index, index + 1)
}

console.log('Array ordernado: ', array);
