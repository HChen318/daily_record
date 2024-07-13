/**
 * Array
 */

const testArr = [
  { name: "CH", age: 27 },
  { name: "XF", age: 26 },
  { name: "LXX", age: 3 },
  { name: "JIA", age: 15 },
  { name: "JIA", age: 27 },
];

// forEach
Array.prototype.myForEach = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    callBack && callBack(this[i], i);
  }
};

testArr.forEach((ele) => {
  // console.log(item, i);
});

testArr.myForEach((item, i) => {
  // console.log(item, i);
});

// map
Array.prototype.myMap = function (callBack) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(callBack(this[i], i, this));
  }
  return newArr;
};

var newArr = testArr.map((ele) => ele.name);
var newArr2 = testArr.myMap((ele, i) => `${ele.name} -- ${ele.age} -- ${i}`);
// console.log(newArr, "===newArr");
// console.log(newArr2, "===newArr2");

// filter
Array.prototype.myFilter = function (callBack) {
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    callBack(this[i]) && newArr.push(this[i]);
  }
  return newArr;
};

var filterArr = testArr.filter((ele) => ele.age > 10);
var filterArr1 = testArr.myFilter((ele) => ele.age > 10);
// console.log(filterArr, "===filterArr");
// console.log(filterArr1, "===filterArr1");

// every
Array.prototype.myEvery = function (callBack) {
  let flag = true;
  for (let i = 0; i < this.length; i++) {
    if (!callBack(this[i])) {
      flag = false;
      break;
    }
  }
  return flag;
};

var everyFlag = testArr.every((ele) => ele.age > 10);
var everyFlag = testArr.myEvery((ele) => ele.age > 10);
// console.log(everyFlag, "==everyFlag");

// some
Array.prototype.mySome = function (callBack) {
  let flag = false;
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i])) {
      flag = true;
      break;
    }
  }
  return flag;
};

// var someFlag = testArr.some((ele) => ele.age > 10);
var someFlag = testArr.mySome((ele) => ele.age > 10);
// console.log(someFlag,'===someFlag')

// find
Array.prototype.myFind = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

// var findObj = testArr.find((ele) => ele.age === 333);
var findObj = testArr.myFind((ele) => ele.age === 27);
// console.log(findObj, "==findObj");

// findIndex
Array.prototype.myFindIndex = function (callBack) {
  for (let i = 0; i < this.length; i++) {
    if (callBack(this[i], i, this)) {
      return i;
    }
  }
  return -1;
};
// var fIndex = testArr.findIndex((ele) => ele.age === 27);
var fIndex = testArr.myFindIndex((ele) => ele.age === 27);

console.log(fIndex);
