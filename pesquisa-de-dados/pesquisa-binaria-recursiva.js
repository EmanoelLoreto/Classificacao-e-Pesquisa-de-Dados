const array = Array.from({ length: 10000 }, (_, index) => index);

const pesquisaBinaria = (array, target) => {
  if (array.length === 1) {
    return array[0] === target ? 'achou' : 'nao achou'
  }

  if (target === array[Math.floor(array.length / 2)]) {
    return 'achou'
  }

  if (target < array[Math.floor(array.length / 2)]) {
    return pesquisaBinaria(array.slice(0, Math.floor(array.length / 2)), target)
  }

  if (target > array[Math.floor(array.length / 2)]) {
    return pesquisaBinaria(array.slice(Math.floor(array.length / 2), array.length), target)
  }
}

console.time('pesquisaBinaria')

console.log(pesquisaBinaria(array, 5001))

console.timeEnd('pesquisaBinaria')