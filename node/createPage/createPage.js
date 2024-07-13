/**
 * Created by CH
 */

 const fs = require("fs");
 const path = require("path");
 const pageName = process.argv.splice(2)[0];
 const pathArr = pageName.split("/");
 let basepath = "src/components/";
 
 /*
  * 新建项目页面模板
  * @src param{ String } 需要复制的目录
  * @dst param{ String } 复制到指定的目录
  */
 const copyDirectory = (src, dst) => {
   return new Promise((res, rej) => {
     //判断文件需要时间，必须同步
     if (fs.existsSync(src)) {
       // 获得指定目录下，所有文件的列表,readdir方法只读一层目录
       fs.readdir(src, function(err, files) {
         if (err) {
           console.log(err);
           return;
         }
         files.forEach((filename) => {
           // 获取目标文件的绝对路径
           const url = path.join(src, filename);
           // 复制的路径
           const dest = path.join(dst, filename);
           // 读取文件状态
           fs.stat(path.join(src, filename), function(err, stats) {
             if (err) throw err;
             // 判断是否是文件
             if (stats.isFile()) {
               let str = "";
               //创建读取流
               let readStream = fs.createReadStream(url);
 
               readStream.on("data", (data) => {
                 str += data;
               });
 
               readStream.on("end", () => {
                 // console.log("str:", str);
                 const pageNameStyle = pageName
                   .replace(/([A-Z])/g, "-$1")
                   .toLowerCase()
                   .substring(1);
                 str = str
                   .replace(/REPLACE_PAGE_NAME/g, pageName)
                   .replace(/REPLACE_PAGE_CLASS_NAME/g, pageNameStyle);
                 //创建写入流
                 let writeStream = fs.createWriteStream(dest, {
                   encoding: "utf8",
                 });
 
                 writeStream.write(str);
                 res('succ');
                 // 通过管道来传输流,并将内容写入到文件中
                 // readStream.pipe(writable);
               });
 
               // 判断是否是目录
             } else if (stats.isDirectory()) {
               existsFile(url, dest, copyDirectory);
             }
           });
         });
       });
     } else {
       console.log("文件目录不存在");
       return;
     }
   });
 };
 
 const existsFile = (url, dest, callback) => {
   fs.exists(dest, function(exists) {
     if (exists) {
       callback && callback(url, dest);
     } else {
       fs.mkdir(dest, 0777, function(err) {
         if (err) throw err;
         callback && callback(url, dest);
       });
     }
   });
 };
 
 //检测是否存在文件夹
 const exists = () => {
   return new Promise((res, rej) => {
     (async function() {
       for (let a of pathArr) {
         fs.existsSync(basepath + a)
           ? (basepath = `${basepath}${a}/`)
           : await mkdir(a);
       }
       res(basepath);
     })();
   });
 };
 
 //建立文件夹
 const mkdir = (a) => {
   return new Promise((res, rej) => {
     fs.mkdir(basepath + a, (err) => {
       if (err) rej(err);
       basepath = `${basepath}${a}/`;
       res(basepath);
     });
   });
 };
 
 const creatPage = async () => {
   try {
     await exists();
     await copyDirectory("./src/components/aa", basepath);
     return console.log(`Successfully created ${pageName} page!`);
   } catch (err) {
     console.error(err);
   }
 };
 
 creatPage();
 