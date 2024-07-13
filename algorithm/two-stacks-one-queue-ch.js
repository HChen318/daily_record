/**
 * @description 两个栈 - 一个队列
 * @author CH
 */

class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  /**
   * 入队
   */

  add(n) {
    this.stack1.push(n);
  }

  del() {
    let res;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    while (stack1.length) {
      const n = stack1.pop();
      stack2.push(n);
    }
    res = stack2.pop();
    while (stack2.length) {
      const n = stack2.pop();
      stack1.push(n);
    }
    return res || null;
  }

  get length() {
    return this.stack1.length;
  }
}

// // 功能测试
const q = new MyQueue();
// console.log(q.stack1);
q.add(100);
q.add(200);
q.add(300);
console.log(q.stack1);
// console.info(q.length)
console.info(q.del());
// console.info(q.length)
// console.info(q.delete())
// console.info(q.length)
