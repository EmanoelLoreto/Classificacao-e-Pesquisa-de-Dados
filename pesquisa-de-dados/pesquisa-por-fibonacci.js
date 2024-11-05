const array = Array.from({ length: 10000 }, (_, index) => index);

const pesquisaPorFibonacci = (array, target) => {
  const fibonacci = [0, 1];

  while (fibonacci[fibonacci.length - 1] < array.length) {
    fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
  }

  let offset = -1;

  while (fibonacci.length > 1) {
    const i = Math.min(offset + fibonacci[fibonacci.length - 2], array.length - 1);

    if (array[i] < target) {
      fibonacci.pop();
      offset = i;
    } else if (array[i] > target) {
      fibonacci.pop();
    } else {
      return 'achou';
    }
  }

  return 'nao achou';
}

console.time('pesquisaPorFibonacci')

console.log(pesquisaPorFibonacci(array, 5001))

console.timeEnd('pesquisaPorFibonacci')