// 数据类型转换
console.log([] == false);
console.log(![] == false);
/* 
  面试题：
  console.log( [] == false );
    对象 == 布尔    都转为数字（隐式转换）
    对象转为数字：先toString转换为字符串（应该是先基于valueOf获得原始值，没有原始值再去toString），再转换为数字的
    [] -> '' -> 0
    false -> 0   true -> 1
    => true

  console.log( ![] == false );
    ![] 把数组转换成布尔类型然后取反 false
    false == false
    => true
*/

/* 
  把其它类型转换为字符串，一般都是直接""包起来，
  只有{}普通对象调取toString是调取的Object.prototype.toString，不是转换为字符串，而是检测数据类型，返回结果是"[object Object]"
*/

/* 
  把其它数据类型转换为number类型，Number机制：
*/
console.log(Number('')); // 0
console.log(Number('10')); // 10
console.log(Number('10px')); // NaN 只要出现非有效数字字符，结果都是NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
// console.log(Number(Symbol(10))); // 报错
// console.log(Number(BigInt(10))); // 10

/* 
  把对象变为数字，应该先valueOf获取原始值，没有原始值再toString变为字符串，最后把字符串转换为数字
*/

/* 
  parseInt机制：
    从字符串左侧第一个字符开始，查找有效数字字符（遇到非有效数字字符停止查找，无论后面是否还有数字字符，都不再找了），把找到的有效数字字符转换为数字，如果一个都没有找到，结果就是NaN;
    （parseFloat比他多识别一个小数点）
*/
console.log(parseInt('')); // NaN
console.log(Number('')); // 0
console.log(isNaN('')); // false 0是有效数字
console.log(parseInt(null)); // parseInt('null') NaN
console.log(Number(null)); // 0
console.log(isNaN(null)); // false
console.log(parseInt('12px')); // 12
console.log(Number('12px')); // NaN
console.log(isNaN('12px')); // true
console.log(parseFloat('1.6px') + parseInt('1.2px') + typeof parseInt(null));
// 1.6 + 1 + 'number'
// 2.6 + "number" => "2.6number"
// 在JS中加号左右两边出现字符串，则变为字符串拼接（有特殊性），如果出现对象也会变为字符串拼接（因为原本，应该是把对象转换为数字，但是对象转数字需要先转为字符串，则加号遇到字符串直接变为字符串拼接 1+[]）
console.log(isNaN(Number(!!Number(parseInt(0.8)))));
// parseInt("0.8") => 0
// !!0 => false
// Number(false) => 0
// isNaN(0) => false
console.log(typeof !parseInt(null) + !isNaN(null));
// parseInt(null) => NaN
// !NaN => true
// typeof true => "boolean"
// isNaN(null) => false
// !false => true
// => "booleantrue"

let result = 10 + false + undefined + [] + 'tencent' + null + true + {};
/* 
  10 + false 数学运算 => 10 + 0 => 10
  10 + undefined 数学运算 => 10 + Number(undefined) => 10 + NaN => NaN
  NaN + [] 数学运算（[]在转成数字之前，先转成字符串，也就是""，所以就变成了字符串拼接） => "NaN"
  "NaN" + 'tencent' => 'NaNtencent'
  ...后面都是字符串拼接
  'NaNtencentnulltrue[object Object]'
*/
console.log(result);

/* 
  加号即使一边出现字符串或者对象，也不一定是字符串拼接： ++i/i++/+i 这种情况是数学运算
*/
let n = '10';
console.log(++n); // 11
console.log(+n); // 10

/* 
  {} + 0  => 0
  左边的{}认为是一个代码块，不参与运算，运算只处理的是+0
*/

/* 
  ({} + 0) => "[object Object]0"
  {}参与到数学运算中
*/

/* 
  0 + {} => "0[object Object]"
  这种情况是数学运算
*/

let arr = [10.18, 0, 10, 25, 23];
arr = arr.map(parseInt);
console.log(arr);

/* arr = arr.map((item, index) => {
  // 循环遍历数组中的每一项，就会触发回调函数
  // 每一次还会传递当前项和当前项的索引
}); 

parseInt在转换之前都会把被转换的值先转成字符串

parseInt('10.18', 0); =>10
  从字符串左侧的第一个字符开始查找，找到符合[radix]进制的值（遇到一个不合法的，则停止查找），把找到的值变为数字，再按照把[radix]转换成十进制的规则处理
  
parseInt('0',1); => NaN
parseInt('10',2); 
  把10看作2进制，最后转换为10进制
  1*2^1 + 0*2^0 => 2
parseInt('25',3);
  2符合三进制，5不符合三进制，所以从5开始就不往后找了
  把2看作3进制，转换为10进制
  2*3^0 => 2 
parseInt('23',4);
  2和3都符合四进制
  把23看作四进制，转换为10进制
  2*4^1 + 3*4^0 => 8 + 3 => 11

=====================================================

parseInt([value], [radix])   值，进制
->[radix] 这个值是一个进制，不写或者写0默认都按照10处理，即10进制，（特殊情况：如果value是以0x开头，则默认值不是10而是16进制）
->进制有一个取值的范围：2~36之间，如果不在这个范围内，整个程序运行的结果一定是NaN
->把[value]看作[radix]进制，最后把[radix]进制转换为十进制
->如果[value]从左开始第一个就不符合进制，则直接返回NaN

=====================================================
把一个值转换为十进制：
[位权值：每一位的权重，各位是0， 十位是1...]

  147（八进制） => 十进制
  1*8^2 + 4*8^1 + 7*8^0

  12.23（四进制） => 十进制
  1*4^1 + 2*4^0 + 2*4^-1 + 3*4^-2
  4^0 = 1
  4^-1 = 1/4
  4^-2 = 1/(4*4)
*/

// parseInt('12px12');
// parseFloat多识别一个小数点，但是不支持第二个参数
