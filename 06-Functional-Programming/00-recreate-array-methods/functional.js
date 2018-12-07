function forEach(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function doubler(elem) {
  return elem * 2;
}

function map(arr, callback) {
  let retArr = [];
  for (let i = 0; i < arr.length; i++) {
    retArr.push(callback(arr[i]));
  }
  return retArr;
}

function filter(arr, callback) {
  let retArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) retArr.push(arr[i]);
    else continue;
  }
  return retArr;
}

function includes(arr, elemToHave) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === elemToHave) return true;
    }
  } else {
    for (let key in arr) {
      if (arr[key] === elemToHave) return true;
    }
  }
  return false;
}

function countWords(startVal = 0, str) {
  let total = 1;
  if (str === ' ' || str === '') return startVal;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') total++;
    else continue;
  }
  return total + startVal;
}

function reduce(arr, acc, callback) {
  let retAcc = acc;
  for (let i = 0; i < arr.length; i++) {
    retAcc += callback(acc, arr[i]);
  }
  return retAcc;
}

function sum(arr) {
  return reduce(arr, 0, (a, b) => a + b);
}

function every(arr, callback) {
  let isTrue = false;

  if (arr.length === 0) return true;
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) isTrue = true;
    else return false;
  }
  return isTrue;
}

function any(arr, callback) {
  if (arr.length === 0) return false;
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) return true;
  }
  return false;
}
