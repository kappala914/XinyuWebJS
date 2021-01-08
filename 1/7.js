/* 
  JS中声明变量
    传统： var function
    ES6: let const import(模块导入)
*/

// import xxx from './axios'
// let VS const
//  + let 声明一个变量，变量存储可以改值
//  + const 声明的变量，一旦赋值，则不能再和其它的值关联（不允许指针重新指向）

/* 
  let VS var
    + var 存在变量提升，而let不存在
    + "全局上下文中"，基于var声明的变量，也相当于给GO（全局对象 window）新增一个属性，并且任何一个发生值的改变，另外一个也会跟着变化（映射机制）；
      但是let声明的变量，就是全局变量，和GO没有任何的关系；
    + 在相同的上下文中，let不允许重复声明（无论你之前基于何种方式声明，只要声明过，则都不能基于let重复声明了）；而var很松散，重复声明也无所谓，反正浏览器也只按照声明一次处理；
    + 暂时性死区[浏览器暂存的bug]
    + let/const/function 会产生块级私有上下文，而var是不会的
*/

/* 
  上下文 & 作用域
    + 全局上下文
    + 函数执行形成的“私有上下文”
    + 块级作用域（块级私有上下文）
      + 除了 对象/函数.. 的 大括号{} ,（例如：判断体、循环体、代码块...），都可能会产生块级上下文
*/

// n是全局上下文的，代码块不会对他有任何的限制
// m是代码块所代表的块级上下文中私有的
{
  var n = 12;
  console.log(n); //12

  let m = 13;
  console.log(m); //13
}
console.log(n); //12
console.log(m); // 报错： m is not defined

/* 
  n = 13; // 相当于window.n = 13； 没有基于任何关键词声明的，则相当于给window设置一个属性；
  console.log(n); // 13   首先看这个变量是否为全局变量，如果不是，则再看是否为window的一个属性...
  console.log(m); // 如果两者都不是，则报错：变量未被定义 m is not defined
*/

/* 
  function fn(){
    // 私有上下文
    m = 13; // window.m = 13; 按照作用域链查找机制，当前变量一直找到全局都没有，而且如果是设置的操作，则相当于给window设置一个属性
    console.log(m); // 13
    console.log(n); // 如果是获取的操作，则直接报错 n is not defined
  }
  fn();
  console.log(m); // 13
*/

/* 
  // 在代码执行之前，浏览器会自己处理很多事情：词法分析、变量提升
  // 词法分析阶段，如果发现有基于let/const并且重复声明的操作，则直接报语法错误，整个代码都不会做任何的执行
  console.log('OK); // 词法分析阶段就报错了，所以一行代码都没有执行
  var n = 12;
  var n = 13;
  let n = 14;
*/

/* 
  console.log(n); // 报错：n is not defined
  console.log(typeof n); // undefined 基于typeof检测一个未被声明的变量，不会报错，结果是undefined
*/

/* 
  console.log('OK');  // OK
  console.log(typeof n); // 报错：不能在声明之前使用变量n，这不是词法解析的报错，是代码运行的报错
  let n = 12;
*/
