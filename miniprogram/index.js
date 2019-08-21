//weixin/day06/src/index.js
//1:创建Promise对象执行操作
//resolve 解析 正确
//reject 拒绝 错报
/*
new Promise((resolve,reject)=>{
//2:模拟异步操作 10:36
setTimeout(()=>{
console.log("异步执行...");
//成功两个不能输出
resolve("成功");
},500)
});
*/
//3个异步执行程序需要
//1,2 先执行完成 3再执行
//解决方案:使用Promise
//1:创建数组(保存Promise对象)
var rows = [];
//2:向数组中添加Promise对象1
rows.push(new Promise((resolve,reject)=>{
console.log(123);
resolve();
}));
//3:向数组中添加Promise对象2 45
rows.push(new Promise((resolve,reject)=>{
console.log(456);
resolve();
}))
//4:等待Promise1 和Promise2对象
// 执行完成, 回调函数执行Promise 3
Promise.all(rows).then(res=>{
//回调函数：p1 p2对象执行完毕
console.log(789);
});
// [1,2][3] 同步 10：40