/* 
  this的几种情况
*/

/* 
  this：函数的执行主体（不等价于执行上下文[作用域scope]） => 谁把这个函数执行的；
  想要分清楚函数执行的执行主题（this），可以按照如下的规律来分析：
    + 事件绑定
      + 无论是DOM0还是DOM2级事件绑定，给元素E的某个事件行为绑定方法，当事件触发，方法中的this是当前元素E本身；
      + 特殊情况：
        + IE6~8中基于attachEvent实现DOM2事件绑定，事件触发方法执行，方法中的this不是元素本身，大部分情况都是window；
        + 如果基于call/apply/bind强制改变了函数中的this，也是以强制改变后的为准；
    + 普通函数执行
      + 函数执行，看函数前面是否有“点”，如果有“点”，“点”前面是谁this就是谁，没有“点”this就是window，[JS严格模式下是undefined]
          fn() -> this:window/undefined
          obj.fn() -> this:obj
          xxx.__proto__.fn() -> this:xxx.__proto__
      + 自执行函数执行，其内的this一般都是window/undefined；
      + 回调函数中的this一般也是window/undefined，除非做过特殊的处理（例如forEach的第二个参数）；
      + 括号表达式中的this很变态；
    + 构造函数执行
    + 箭头函数执行
    + 基于call/apply/bind强制改变this

  在浏览器端运行JS代码，非函数中的this一般都是window；研究this都是研究函数中的this；
  有一个特殊的，就是ES6中，块级上下文中的this是其所在上下文中的this[理解为：块级上下文是没有自己的this的]；
*/

// 'use strict';
// console.log(this);

// {
//   let i = 0;
//   console.log(this);
// }

// document.body.onclick = function () {
//   console.log(this);
// };
// document.body.addEventListener('click', function () {
//   console.log(this);
// });
// document.body.attachEvent('onclick', function(){
//   console.log(this);
// })

// function fn() {
//   console.log(this);
// }
// var obj = {
//   name: 'lele',
//   fn: fn,
// };
// fn(); // this=>window
// obj.fn(); // this=>obj
// // (obj.fn)(); // this=>obj 小括号中只有一项，不算是括号表达式
// (fn, 10, obj.fn)(); // this=>window 小括号中有多项，只取最后一项，如果把其执行，无论之前this是谁，现在基本上都会变为window

// var obj = {
//   num: (function () {
//     // 把自执行函数执行的返回值，赋值给obj.num
//     console.log(this); // window
//     return 10;
//   })(),
// };

// 回调函数：把一个函数作为值，传递给另外一个函数，在另外一个函数执行中，把传递进来的函数执行...
// setTimeout(function () {
//   console.log(this); // window
// }, 1000);

// var obj = { name: 'lele' };
// [10].forEach(function () {
//   console.log(this); // window
// });
// [10].forEach(function () {
//   console.log(this); // obj
// }, obj);

var x = 3,
  obj = { x: 5 };
obj.fn = (function () {
  this.x *= ++x;
  return function (y) {
    this.x *= ++x + y;
    console.log(x);
  };
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);
