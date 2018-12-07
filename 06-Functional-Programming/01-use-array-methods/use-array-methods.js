function indexAndValue(arr) {
  return arr.map((elem, i) => {
    let elemObj = {};
    elemObj.index = i;
    elemObj.value = elem;
    return elemObj;
  });

  //USING OWN MAP
  // let retObj = {};
  // let index = 0;
  // return map(arr, (elem, i) => {
  //   let elemObj = {};
  //   elemObj.index = index;
  //   elemObj.value = elem;
  //   retObj[index] = elemObj;
  //   index++;
  //   return elemObj;
  // });
}

function capitalize(str) {
  //imparative solution
  let cappedStr = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') cappedStr += ' ';
    else cappedStr += str[i].toUpperCase();
    //if not suppose to use toUpperCase(), i could have an object that has key-val pairs with the lowercase as keys and the values being their capped form. maybe an easier way.
  }
  return cappedStr;
}

function swapCase(str) {
  let strArr = str.split(' ');
  return strArr
    .map((elem, i) => {
      if (i % 2 === 0) {
        return capitalize(elem);
      } else {
        return elem;
      }
    })
    .join(' ');
}

function extensionSearch(fileToFindIn, arrOfFiles) {
  return arrOfFiles.filter((elem, i) => {
    let fileExt = elem.slice(-3);
    return fileExt === fileToFindIn;
  });
}
//had to look at solution, i understand now but will need to redo with others
function getPopulation(arrOfCountries, arrToTally) {
  return arrOfCountries.reduce((acc, elem) => {
    if (arrToTally.includes(elem.name) || arrToTally.length === 0)
      return acc + elem.population;
    else return acc;
  }, 0);
}
//re look at for sure
const keyifyArrayOfObjects = function(key, superArr) {
  return superArr.reduce((acc, superObj) => {
    acc[superObj[key]] = superObj;
    return acc;
  }, {});
};

function powerLevelAverage(array) {
  let totalPL = array.reduce((acc, elem) => {
    return acc + elem.powerLevel;
  }, 0);

  return Math.round(totalPL / array.length);
}

function mapReduce(array, callback) {
  return array.reduce((acc, elem) => {
    acc.push(callback(elem));
    return acc;
  }, []);
}

function filterReduce(arr, callback) {
  return arr.reduce((acc, elem) => {
    if (callback(elem)) {
      acc.push(elem);
      return acc;
    } else {
      return acc;
    }
  }, []);
}

function inYourBudget(max, arrOfObjs) {
  //uses filter and map
  //returns array
  return arrOfObjs
    .filter(curObj => {
      return curObj.price < max;
    })
    .map(elem => {
      return elem.item;
    });
}

//spent a long time on this one, still do not know why it isnt pasting last spec for it. i am using both the map and filter, so idk.
function separateAndReturnNames(arr, nameLessThan, maxNameLength) {
  return arr
    .reduce((acc, curHero, i) => {
      //this creates the new first and last names on arr, and returns an array of first and lastname objects for the map to use
      let fName = curHero.name.split(' ')[0];
      let lName = curHero.name.split(' ')[1];
      arr[i].firstName = fName;
      arr[i].lastName = lName;
      let heroName = { firstName: fName, lastName: lName };
      acc.push(heroName);
      return acc;
    }, [])
    .map(elem => {
      //this creates an array of ony the keys that match the second parameter
      let foundName = elem[nameLessThan];
      return foundName;
    })
    .filter(elem => {
      //creates an array of only the names that are under the third parameters size
      return elem.length <= maxNameLength;
    });
}

function priorityTodoDuration(list) {
  return list
    .filter(elem => {
      return elem.priority === 'high';
    })
    .reduce((acc, elem) => {
      return acc + elem.duration;
    }, 0);
}

//pre=made functions from other excersize
// function forEach(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
//   }
// }

// function doubler(elem) {
//   return elem * 2;
// }

// function map(arr, callback) {
//   let retArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     retArr.push(callback(arr[i]));
//   }
//   return retArr;
// }

// function filter(arr, callback) {
//   let retArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (callback(arr[i])) retArr.push(arr[i]);
//     else continue;
//   }
//   return retArr;
// }

// function includes(arr, elemToHave) {
//   if (Array.isArray(arr)) {
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] === elemToHave) return true;
//     }
//   } else {
//     for (let key in arr) {
//       if (arr[key] === elemToHave) return true;
//     }
//   }
//   return false;
// }

// function countWords(startVal = 0, str) {
//   let total = 1;
//   if (str === ' ' || str === '') return startVal;

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === ' ') total++;
//     else continue;
//   }
//   return total + startVal;
// }

// function reduce(arr, acc, callback) {
//   let retAcc = acc;
//   for (let i = 0; i < arr.length; i++) {
//     retAcc += callback(acc, arr[i]);
//   }
//   return retAcc;
// }

// function sum(arr) {
//   return reduce(arr, 0, (a, b) => a + b);
// }

// function every(arr, callback) {
//   let isTrue = false;

//   if (arr.length === 0) return true;
//   for (let i = 0; i < arr.length; i++) {
//     if (callback(arr[i])) isTrue = true;
//     else return false;
//   }
//   return isTrue;
// }

// function any(arr, callback) {
//   if (arr.length === 0) return false;
//   for (let i = 0; i < arr.length; i++) {
//     if (callback(arr[i])) return true;
//   }
//   return false;
// }
