const array = Array.from({ length: 10000 }, (_, index) => index);

const pesquisaBinaria = (array, target) => {
  let inicio = 0;
  let fim = array.length - 1;

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);

    if (array[meio] === target) {
      return 'achou';
    }

    if (target < array[meio]) {
      fim = meio - 1;
    } else {
      inicio = meio + 1;
    }
  }

  return 'nao achou';
}

console.time('pesquisaBinaria')

console.log(pesquisaBinaria(array, 5001))

console.timeEnd('pesquisaBinaria')