/**
 * @description 反转单向链表
 * @author CH
 */

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 */
function reverseLinkList(listNode) {}

/**
 * 根据数组创建单向链表
 * @param arr number arr
 */
function createLinkList(arr) {
  const length = arr.length;
  if (!arr || !length) throw new Error("数组为0");
  // arr: [100,200,300]
  // {value: 300}
  // {value:200,next:{value:300}},
  // {value:100,next: {value: 200,next: { value:300 }}}
  let curNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;
  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[length - 1],
      next: curNode,
    };
  }
  return curNode;
}

const arr = [100, 200, 300, 400, 500];
const list = createLinkList(arr);
console.info("list:", list);

// const list1 = reverseLinkList(list)
// console.info('list1:', list1)
