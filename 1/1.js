/* 
  number 数字
    + 正数 负数 零 小数...
    + NaN：不是一个有效数字，但是是number类型的
      + NaN 和 NaN 本身不相等，和其他值也都不等
      + isNaN([value]) 检测当前值是否不是有效数字，如果不是有效数字返回true， 反之是有效数字则返回false
      Object.is(NaN,NaN):true，is方法内部做了特殊的处理
    + Infinity: 无穷大 -Infinity：无限小

    + 把其它数据类型转换为number类型
      + 显示转换：Number([value]) | parseInt/parseFloat([value])  两者的底层规则是不同的
      + 隐式转换：
        + 数学运算
        + 基于==比较的时候
        + isNaN([value])
*/

/* 
  console.log(typeof NaN); // => number
  console.log(typeof Infinity); // => number
  console.log(NaN === NaN); // => false
  console.log(Object.is(NaN, NaN)); // => true 
*/

/* 
  string字符串
    + '' / ""
    + `` 模板字符串
  
  把其他值转换成字符串
    + 显式转换： String([value]) 或者 [value].toString() [延展出数据类型检测]
    + 隐式转换：
        + 加号除了数学运算，还会产生字符串拼接
*/

// let n = '10',
//   m = 10;
// console.log(10 + n); // 1010 => "+"有一边出现了字符串（前提是有两边），会成为字符串拼接
// console.log(+n); // 10 => "+"只有一边，把值转换为数字
// console.log(++n); // 11 => "++"和上面一样，也是转换为数字，但是还会自身累加1
// i=i+1 i+=1 这两个一样
// i++/++i 大部分情况和上面一样，但是如果i本身的值是字符串，则不一致，【上面会处理为字符串拼接，下面是数学累加】

// 如果“+”两边，有一边是对象，则有可能会成为字符串拼接
//  ====> 10+{} 或者 10+{name:'lele'}， 结果是：'10[object Object]'
//  ====> 10 + new Number(10)， 结果是：20
// 特殊：
//  ====> 10 + [10]， 结果是：'1010'
//  ====> {} + 10 或者 {name:'xxxx'} + 10， 结果是： 10 【原因： {...}没有参与运算，浏览器认为其是一个代码块，计算的只有+10】
//    但是console.log相当于()包起来，而({} + 10)的结果是：[object Object]10
//    let x = {} + 10，x结果也是：[object Object]10
//      **下面这两种，无论是包起来还是赋值，从语法分析上都要参与到计算中了
// 底层机制： 对象在做数学运算的时候：
//  + 检测对象的 Symbol.toPrimitive 这个属性值，如果有，则基于这个值进行运算，如果没有：
//  + 检测对象的 valueOf() 这个值【原始值：基本类型值】，如果有，则基于这个值进行运算，如果不是原始值：
//  + 获取对象的 toString() 把其变为字符串 -> 如果是'+'处理，则看到字符串了，所以变成字符串拼接
//  + 如果最后就是想变为数字，则再把字符串转换为数字即可

// let obj = {};
// console.log(10 + obj); // =>'10[object Object]'

// let obj = {
//   [Symbol.toPrimitive]: function (hint) {
//     // hint:记录浏览器识别出来的，你会把其转换为什么类型的 default/string/number ...
//     // console.log(hint);
//     return 10;
//   },
// };
// console.log(10 + obj); // =>20

// console.log({} + m); // [object Object]10
// let res = {} + n;
// console.log(res); // [object Object]11

// console.log(m + {}); // NaN
// console.log(m + new Number(10)); // 20
// console.log(m + { value: 10 }); // 20

/* 
  Symbol():创建唯一值
    + 给对象设置一个Symbol属性：唯一属性 【减少属性处理上的冲突】
    + 宏观管理一些唯一的标识的时候，也是用唯一值
    + ...
*/
// new Symbol(); // Uncaught TypeError: Symbol is not a constructor
let xx = Symbol();
console.log(Symbol() === Symbol()); // false
console.log(Symbol('AAAA') === Symbol('AAAA')); // false
/* let obj = {
  [Symbol()]: 100,
};
console.log(obj[Symbol()]); // => undefined 这种属性无法取出属性是Symbol的值 */
let x = Symbol();
let obj = {
  [x]: 100,
};
console.log(obj[x]); // 像这样用变量存一下，才可以取出
/* 
  // 很多JS的内置原理都是基于这些Symbol的属性值处理的
      Symbol.toPrimitive
      Symbol.hasInstance
      Symbol.toStringTag
      Symbol.iterator 
...
*/

/* 
  BigInt:大数
    + BigInt([num])
    + xxxxn
    + ...
    大型项目中，服务器返回给客户端的数据中可能出现大数，【服务器数据库中可以基于longint存储数值，这个值可能会超过最大安全数字】
*/
// Number.MAX_SAFE_INTEGER ：9007199254740991   最大安全数字
// Number.MIN_SAFE_INTEGER ：-9007199254740991   最小安全数字
// 超过安全数字进行运算，结果是不准确的
// BigInt(9007199254740991) + BigInt(10) // =>9007199254741001n 用BigInt就能得到准确的结果
// 9007199254740996n+7n // =>9007199254741003n 在数字后面加n 也可以得到准确的结果
