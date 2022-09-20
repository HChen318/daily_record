/**
 * @description Array rotate
 * @author CH
 * 输入一个数组 [1,2,3,4,5,6,7]
 * k=3,即旋转3步
 * 输出[5,6,7,1,2,3,4]
 */

/**
 * 旋转数组K步 - 使用pop和unshift
 * @param arr arr
 * @param k 步数
 * @returns
 */
function rotate1(arr, k) {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k);
  for (let index = 0; index < step; index++) {
    const n = arr.pop();
    if (n != null) {
      arr.unshift(n);
    }
  }
  return arr;
}

/**
 * 使用 concat
 * @param {*} arr
 * @param {*} k
 * @returns
 */
function rotate2(arr, k) {
  const length = arr.length;
  if (!k || length === 0) return arr;
  const step = Math.abs(k % length); // abs 取绝对值
  const part1 = arr.slice(-step); // O(1)
  const part2 = arr.slice(0, length - step);
  const part3 = part1.concat(part2);
  return part3;
}

// 功能测试
// const arr = [1, 2, 3, 4, 5, 6, 7];
// const arr2 = rotate1(arr, 3);
// console.info(arr2);

// // 性能测试
const arr1 = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr1.push(i);
}
console.time("rotate1");
rotate1(arr1, 9 * 10000);
console.timeEnd("rotate1"); // 885ms O(n^2)

const arr2 = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr2.push(i);
}
console.time("rotate2");
rotate2(arr2, 9 * 10000);
console.timeEnd("rotate2"); // 1ms O(1)
