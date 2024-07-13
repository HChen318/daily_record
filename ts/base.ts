

// basic types
let isDone: boolean = false;
let age: number = 18;

let firstName: string = 'John';
let message: string = `Hello ${firstName}`;

let u: undefined = undefined;
let n: null = null;

// let num: string = null
let notSure: any = 4;
notSure = 'maybe a string';
notSure = true
notSure.myName
notSure.getName()

// array
let arrOfNumber: number[] = [1, 2, 3];
arrOfNumber.push(3)
// arrOfNumber.push('aaa')

// tuple 元祖
let user: [string, number] = ['John', 23];
// user = [1111, 'aaa']; //报错,值不能反
user.push(111)

// function 
function add(a: number, b: number, z?: number): number {
    return a + b;
}
let result = add(1, 2);

const add2 = (x: number, y: number): number => {
    return x + y
}
const add3 = add2  // add3类型推断


// interface
interface Person {
    name: string;
    age?: number;
    readonly id: number;
}

let viking: Person = {
    name: 'John',
    age: 23,
    id: 1
}


const sum = (a: number, b: number) => {
    return a + b
}
interface Isum {
    (a: number, b: number): number
}
const sum2: Isum = sum

interface RandomMap {
    [key: string]: string
}
const tets: RandomMap = {
    a: 'a',
    b: 'b'
}

interface LikeArray {
    [index: number]: string
}
const LikeArray: LikeArray = ['a', 'b']


// duck typing
interface FunctionWithProps {
    (x: number): number;
    name: string
}
const a: FunctionWithProps = (x: number) => {
    return x
}
a.name = 'xxx'


// 类型别名
// type
let sum4: (x: number, y: number) => number
const result3 = sum4(1, 2)
type PlusType = (x: number, y: number) => number
let sum5: PlusType


interface IName {
    name: string
}

// 交叉类型
type IPerson = IName & { age: number }
let person: IPerson = { name: 'ch', age: 123 }

// 联合类型
let numberOrString: number | string = 123

// 类型断言
function getLength(input: number | string) {
    const str = input as string
    if (str.length) {
        return str.length
    } else {
        const number = input as number
        return number.toString().length
    }
}

interface Person3 {
    name: string;
    age1: number
}

// Partial  内置类型变成可选的
type PersonOptopnal = Partial<Person3>
let viking2: PersonOptopnal = {}


// 测试类型定义文件d.ts
myFetch<string>('test', 'POST', { name: 'hellow' }).then(data => {

})

myFetch.get<number>('test').then(data => { })