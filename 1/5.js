/* 
  变量提升机制
*/

/* 
  变量提升：在当前上下文中（全局/私有/块级），JS代码自上而下执行之前，浏览器会提前处理一些事情（可以理解为词法解析的一个环节，词法解析一定发生在代码执行之前）
    会把当前上下文所有带var/funcion关键字的进行提前的声明或者定义
      var a = 10;
      声明declare： var a;
      定义define: a = 10;
    带var的只会提前声明；
    带function的会提前的声明定义；
*/

/* 
  代码执行之前：全局上下文中的变量提升
    var a ;  默认值是undefined
*/

/* 
  console.log(a); // => undefined
  var a = 12; // => 创建值12，不需要再声明a了（变量提升阶段完成了，完成的事情不会重新处理）， a = 12赋值
  a = 13; // 全局变量a=13
  console.log(a); // => 13
*/

/* 
  全局上下文中的变量提升
    func = 函数   函数在这个阶段赋值都做了
*/
/* func();
function func() {
  var a = 12;
  console.log('OK');
} */

// func(); // 报错 func is not a function
/* var func = function () {
  // 真实项目中建议用函数表达式创建函数，因为这样在变量提升阶段只会声明func，不会赋值
  console.log('OK');
};
func(); */

var func = function AAA() {
  // 把原本作为值的函数表达式匿名函数“具名化”（虽说是起了名字，但是这个名字不能再外面访问 => 也就是不会再当前上下文中创建这个名字）
  // 当函数执行，在形成的私有上下文中，会把这个具名化的名字做为私有上下文中的变量（值就是这个函数）来进行处理
  console.log('OK');
  // console.log(AAA); // 当前函数
  // AAA(); // 递归调用 而不用严格模式下都不支持的 arguments.callee了
};
// AAA(); // 报错 AAA is not defined
// func()

/* setTimeout(function func() {
  // 写具名函数就可以直接递归调用，而无需arguments.callee了
  func();
}, 1000); */

/* 
  EC(G)变量提升
*/
/* 
  console.log(a); // 报错，a is not defined 后面不执行
  a = 13;
  console.log(a);
*/

/* 
  EC(G)变量提升 只有 var function 才会变量提升，ES6中的let 和 const 不会变量提升
*/
/* 
  console.log('OK'); // => 'OK'
  console.log(a); // 报错 Uncaught ReferenceError: Cannot access 'a' before initialization（不能在let声明之前使用变量），  后面不执行
  let a = 12;
  a = 13;
  console.log(a);
*/

/* 
  基于 var 或者 function 在全局上下文 中声明的变量（全局变量） 会映射到GO（全局对象window）上一份，作为他的属性；
  而且，接下来是一个修改，另外一个也会跟着修改；
*/
// var a = 12;
// console.log(a); // =>12 全局变量
// console.log(window.a); // =>12 映射到GO上的属性a

// window.a = 13;
// console.log(a); // =>13 映射机制是一个修改，另一个也会修改

/* 
  EC(G)：全局上下文中的变量提升
    无论条件是否成立，都要进行变量提升（细节点：条件中带function的，在新版本浏览器中只会提前声明，不会提前赋值）

    [老版本]
      var a; // 声明
      func= 函数 // 声明 + 定义
    [新版本]
      var a; // 声明，全局上下文中声明一个a也相当于给 window.a
      func; // 声明 window.func
*/
/* console.log(a, func); //[新版本]undefined undefined ， [老版本]undefined 函数
if (!('a' in window)) {
  //'a' in window ： 检测a是否为window的一个属性   !true => false
  var a = 1;

  function func() {}
}
console.log(a); // => undefined
 */

/* 
  EC(G)变量提升
    fn=>1
      =>2
    var fn; 已经声明过了，不再声明
      =>4
      =>5
  全局上下文中有一个全局变量fn，值是输出5的函数和（此时window.fn => 5）
 */
/* fn(); //=>5
function fn() {
  // =>不再处理，变量提升阶段搞过了
  console.log(1);
}
fn(); //=>5
function fn() {
  // =>不再处理，变量提升阶段搞过了
  console.log(2);
}
fn(); //=>5
var fn = function () {
  // => var fn不用再处理了，但是赋值在变量提升阶段没处理过，此时需要处理 fn => window.fn => 3
  console.log(3);
};
fn(); //=>3
function fn() {
  console.log(4);
}
fn(); // =>3
function fn() {
  console.log(5);
}
fn(); //=>3 */

var foo = 1;
function bar() {
  if (!foo) {
    var foo = 10;
  }
  console.log(foo);
}
bar();
