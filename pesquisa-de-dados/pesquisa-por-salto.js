const array = Array.from({ length: 10000 }, (_, index) => index);

const pesquisaPorSalto = (array, target) => {
  const salto = Math.floor(Math.sqrt(array.length));

  let blocoInicio = 0;
  let blocoFim = salto;
  while (target > array[Math.min(blocoFim, array.length) - 1]) {
    blocoInicio = blocoFim;
    blocoFim += salto;

    if (blocoInicio > array.length) {
      return 'nao achou';
    }
  }

  let currentIndex = blocoInicio;
  while (currentIndex < Math.min(blocoFim, array.length)) {
    if (array[currentIndex] === target) {
      return 'achou';
    }

    currentIndex += 1;
  }

  return 'nao achou';
}

console.time('pesquisaPorSalto')

console.log(pesquisaPorSalto(array, 5001))

console.timeEnd('pesquisaPorSalto')