const fs = require("fs");

let readStream = fs.createReadStream("./data/input.txt");

let count = 0;
let str = "";

readStream.on("data", (data) => {
    console.log(data)
//   str += data.replace('我是读取的数据1','XX');
  str += data;
  count++;
});

readStream.on("end", () => {
  console.log("count:", count);
  console.log("str:", str);
  str=str.replace(/我是读取的数据1/g,'XX');
  const fs = require("fs");

  let writeStream = fs.createWriteStream("./data/output.txt");

  writeStream.write(str);


});

readStream.on("error", (err) => {
  console.log(err);
});


 
// let readStream = fs.createReadStream('./data/input.txt');
// let writeStream = fs.createWriteStream('./data/output.txt');
 
// //读取input.txt文件内容，并将内容写入到output.txt文件中(原内容会被替换)
// readStream.pipe(writeStream)
 
// console.log('程序执行完毕')