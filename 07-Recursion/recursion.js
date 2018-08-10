const factorialIterative = n => {
  let total = 1;
  for (n; n >= 2; n--) {
    total *= n;
  }
  return total;
};

const factorial = n => {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

const fib = n => {
  if (n === 0 || n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
};

const type = val => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

const stringify = obj => {
  if (type(obj) === 'String') {
    return '"' + obj + '"';
  }
  if (type(obj) === 'Array') {
    const result = obj.map(o => stringify(o));
    return '[' + result.join(',') + ']';
  }

  if (type(obj) === 'Object') {
    let result = [];
    Object.keys(obj).forEach((key) =>  {
      let val = stringify(obj[key]);
      result.push('"' + key + '": ' + val);
    });
    return '{' + result.join(',') + '}';
  }

  return obj + '';
};
