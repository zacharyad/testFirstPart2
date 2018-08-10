// Given some number, n, factorial should
// compute n * (n-1) * (n-2) ... * 1
describe('the function factorial', () => {
  // The iterative approach is probably the one you
  // are more familiar with--it involves looping.
  describe('iterative approach', () => {
    it('correctly computes factorial', () => {
      let result = factorialIterative(10);
      let expected = 3628800;
      expect(result).toEqual(expected);
    });
    it('never calls itself', () => {
      spyOn(window, 'factorialIterative').and.callThrough();
      factorialIterative(5);
      expect(factorialIterative.calls.count()).toEqual(1);
    });
  });

  describe('recursive approach', () => {
    it('handles the base case', () => {
      expect(factorial(0)).toEqual(1);
    });
    it('correctly comptues factorial', () => {
      expect(factorial(10)).toEqual(3628800);
    });
    //
    // This is where we check that you
    // created a recursive function. We know it's
    // recursive if the function is called multiple times
    it('calls itself n + 1 times', () => {
      // The number of times your function recurses
      // will depend on how you construct your base case
      // If you are getting a different number of factorial calls,
      // Play around with your base case!
      spyOn(window, 'factorial').and.callThrough();
      let n = 5;
      factorial(n);
      expect(factorial.calls.count()).toEqual(n + 1);
    });
  });
});

// In the fibonacci sequence, the first and second
// numbers are both equal to 1.

// Each following number is the sum of the previous two.
// For example, this means the third number should be 2.

describe('recursive fibonacci', () => {
  it('handles the base cases', () => {
    //When n is 1 or 0, you know immediately what you should return!
    expect(fib(0)).toEqual(1);
    expect(fib(1)).toEqual(1);
  });
  it('correctly computes the third fibonacci number', () => {
    expect(fib(2)).toEqual(2);
  });
  it('calls itself', () => {
    spyOn(window, 'fib').and.callThrough();
    fib(2);
    expect(fib.calls.count()).toBeGreaterThan(1);
  });
  it('correctly computes the 23rd fibonacci number', () => {
    expect(fib(22)).toEqual(28657);
  });

  // The following should pass if you've implemented your
  // recursive solution properly. Again, if you are getting a higher
  // number of calls, see if you can refactor your base case!

  it('calls itself fib(n)*2-1 times', () => {
    spyOn(window, 'fib').and.callThrough();
    let n = 10;
    let fibN = fib(n);
    expect(fib.calls.count()).toEqual(fibN * 2 - 1);
  });
});

//Here we are creating variables of different types
let und = undefined;
let  nll = null;
let  bool = true;
let  num = 123;
let  str = 'abc';
let  fnc = function() {};
let  arr = [];
let  obj = {};

// The 'type' function will behave a lot like JavaScript's
// typeof operator. See more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

// You shouldn't be using recursion for the type function. This is a utility function
// That you will be using in the next recursive function
// But don't use typeof in your solution!

describe('the utility function type', () => {
  it('returns the correct type of its input', () => {
    expect(type(und)).toEqual('Undefined');
    expect(type(nll)).toEqual('Null');
    expect(type(bool)).toEqual('Boolean');
    expect(type(num)).toEqual('Number');
    expect(type(str)).toEqual('String');
    expect(type(fnc)).toEqual('Function');
    expect(type(arr)).toEqual('Array');
    expect(type(obj)).toEqual('Object');
  });
  it('does not use typeof', () => {
    // this assertion looks for "typeof" anywhere in type function's body,
    // but it'll exclude comments from the search
    const commentsRemoved = type
      .toString()
      .replace(/\/\/[\s\S]*?\n/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const bodyContainsTypeOf = /typeof/.test(commentsRemoved);
    expect(bodyContainsTypeOf).toBe(false);
  });

  // Hmmm...if you can't use typeof what can you do?
  //
  // Well, go to a JS console and call .toString() on some object.
  // You should get something like "[object Object]". Neat, maybe
  // we can get the type from this?
  //
  // But, wait, if you .toString() an Array, or a Number, something
  // different happens. We'd really like to use Object's toString
  // method on some input.
  //
  // Look into the .call method that every function has, and see
  // if you can figure out a way to make this happen. See the
  // docs here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

  it('invokes "Object\'s" toString method', () => {
    spyOn(Object.prototype.toString, 'call').and.callThrough();
    type();
    expect(Object.prototype.toString.call).toHaveBeenCalled();
  });
});

// stringify converts anything into a string
describe('the function stringify', () => {
  // We'll need different approaches for different types of
  // data, so it only makes sense that we'll use our very own
  // type function on stringify's input.
  it('invokes our custom "type" function', () => {
    spyOn(window, 'type').and.callThrough();
    stringify(null);
    expect(type).toHaveBeenCalled();
  });

  // values that aren't Arrays and Objects...coerce them to strings 
  it('handles everything but Arrays and Objects', () => {
    expect(stringify(und)).toBe('undefined');
    expect(stringify(nll)).toBe('null');
    expect(stringify(bool)).toBe('true');
    expect(stringify(num)).toBe('123');
    expect(stringify(str)).toBe('"abc"');    
  });

  describe('on Arrays', () => {
    beforeEach(() => {
      spyOn(window, 'stringify').and.callThrough();
    });
    it('invokes itself on each element', () => {
      const testArr = [1, 'something', []];
      stringify(testArr);
      expect(stringify.calls.count()).toEqual(testArr.length + 1); // + 1 because of the array itself
    });
    it('can handle nesting', () => {
      const testArr = [1, 'a', [true, 'b', [null], 'c'], 3];
      stringify(testArr);
      // it should be called 10 times because there
      // are 3 arrays with (all combined) 7 elements
      expect(stringify.calls.count()).toEqual(10);
    });
    it('wraps with brackets and concatenates with commas', () => {
      const result = stringify([1, 'a', [true, 'b', [null], 'c'], 3]);
      const expected = '[1,"a",[true,"b",[null],"c"],3]';
      expect(result).toEqual(expected);
    });

    // The native Array.prototype.toString method actually does
    // exactly what we want.... but it's better practice
    // to create it on your own :)
    
    // You might find Array.prototype.join useful.
    it('does not use native string conversion', () => {
      spyOn(Array.prototype, 'toString');
      stringify([1, 2, 3]);
      expect(Array.prototype.toString).not.toHaveBeenCalled();
    });
  });

  describe('on Objects', () => {
    it('invokes itself on each value', () => {
      const testObj = {
        a: 1,
        b: 2,
      };
      spyOn(window, 'stringify').and.callThrough();
      stringify(testObj);
      // If you are getting a much higher number of stringify calls, you
      // may be calling stringify when you don't need to...
      expect(stringify.calls.count()).toEqual(Object.keys(testObj).length + 1);
    });
    it('wraps with curly braces, inserts colons, and concatenates with commas', () => {
      const result = stringify({
          a: 1,
          b: 2,
        }),
        expected = '{"a": 1,"b": 2}';
      expect(result).toEqual(expected);
    });
    it('can handle arbitrary nesting', () => {
      const result = stringify({
          a: {
            b: true,
            c: [
              null,
              {
                d: 1,
              },
            ],
            e: {
              f: 'abc',
            },
          },
          g: undefined,
        }),
        expected =
          '{"a": {"b": true,"c": [null,{"d": 1}],"e": {"f": "abc"}},"g": undefined}';
      expect(result).toEqual(expected);
    });
  });
});
