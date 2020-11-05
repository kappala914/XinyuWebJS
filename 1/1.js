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

console.log(typeof NaN); // => number
console.log(typeof Infinity); // => number
console.log(NaN === NaN); // => false
console.log(Object.is(NaN, NaN)); // => true

/* 
  string字符串
    + '' / ""
    + `` 模板字符串
  
  把其他值转换成字符串
    + 显式转换： String([value]) 或者 [value].toString()
*/
