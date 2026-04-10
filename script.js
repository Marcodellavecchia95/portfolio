const minimumIndex = (arr) => {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
};

const myArr = [9, 5, 20, 4, -4, 0, 5, 2, 90, 98];

const min = minimumIndex(myArr);

console.log(min);

// Invocazione funzione
