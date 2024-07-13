// 类型推断没法流动到函数里面
// 所以泛型
function echo<T>(arg: T): T {
    return arg;
}
const result1 = echo("1232");

function swap<T, U>(arg: [T, U]): [U, T] {
    return [arg[1], arg[0]]
}

const result2 = swap(["string", 123]);

interface GithubResp {
    name: string;
    count: number,
    area: string
}

function withAPI<T>(url: string): Promise<T> {
    return fetch(url).then(res => res.json())
}
withAPI<GithubResp>('https://api.github.com/users/octocat').then(res => {

})

// keyof  遍历取键值,字符串字面量
type Keys = keyof GithubResp;
let key: Keys = 'area'
// lookup types > 查找类型
type nameType = GithubResp['name'];
// mapped types
type Test = {
    [key in Keys]: any
}

type CountryOpt = {
    [p in Keys]?: GithubResp[p]
}


interface IWithLength {
    length: number;
}
// extended in generics  在泛型中的约束
function echoWithArr<T extends IWithLength>(arg: T): T {
    console.log(arg.length);
    return arg;
}
const arr = echoWithArr([1, 2, 3])
const str = echoWithArr("123")
const obj = echoWithArr([{ length: 123, width: 456 }])


// 泛型T为null 或者 undefined > nerver
type NonType<T> = T extends null | undefined ? never : T;
let demo1: NonType<number>
let demo2: NonType<null>
