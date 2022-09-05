// class People {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   sayHello() {
//     console.log(this, "===this");
//     console.log(
//       `Hello, my name is ${this.name}, I am ${
//         this.age
//       } years old! ${this.work()}`
//     );
//   }
//   work() {
//     console.log(1111);
//   }
// }
// class Employee extends People {
//   constructor(name, age) {
//     super(name, age);
//     this.age = 12;
//   }
//   //   sayHello() {
//   //     console.log("I am from Employee.");
//   //   }
//   work() {
//     console.log("Coding like crazy!");
//   }
// }
// let xiaofu = new Employee("xiaofu", 99);
// xiaofu.sayHello(); //I am from Employee.
// console.log(1111);
// xiaofu.work(); //Coding like crazy!

class IncreasingCounter {
  _count = 0;
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}

const counter = new IncreasingCounter();
console.log("🚀 ~ counter", counter);
