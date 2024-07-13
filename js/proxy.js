// vue3 检测变化
const person = {
  name: "viking",
};

// console.log(Reflect.get(person, "name"));
// console.log(Reflect.set(person, "name", "ch"));
// console.log(Reflect.get(person, "name"));
const handler = {
  get(target, prop, receiver) {
    console.log(`getting`);
    // return target[prop];
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    // console.log(`trigger `);
    // target[prop] = value;
    // return true;
    return Reflect.set(...arguments);
  },
};

const proxy = new Proxy(person, handler);
// proxy.name = "ch";
// console.log("🚀 ~ proxy", proxy.name);
// console.log("🚀 ~ person", person.name);

function effect() {
  console.log("effect");
}

let dep = new Set();
function track() {
  dep.add(effect);
}
track()
console.log("🚀 ~ dep", dep);
