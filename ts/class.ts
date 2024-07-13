// 类的基本定义
// public 
// private  
// protected 实例不能访问,子类可以

class Animal {
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}

const snake = new Animal('snake');
snake.run();


// 继承
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}
const xiaobao = new Dog('xiaobao');
xiaobao.run()

// 多态
class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log("🚀 ~ name", this.name)
    }
    run() {
        return `xxx is ${super.run()}`
    }
}
const maomao = new Cat('maomao')



// 实例类型约束
interface ClockInterface {
    currentTime: number;
    alert(): void;
}
// 静态类型约束
interface ClockStatic {
    new(h: number, m: number): void;
    time: number
}

interface GmaeInterface {
    play(): void;
}

const Clock: ClockStatic = class Clock implements ClockInterface {
    constructor(h: number, m: number) {

    }
    static time = 12
    currentTime: number = 123;
    alert() { }
}

class Cellphone implements ClockInterface, GmaeInterface {
    currentTime: number = 123;
    alert() { }
    play() {

    }
}