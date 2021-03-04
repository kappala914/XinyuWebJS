/* 
  JS高阶编程技巧：利用闭包的机制，实现出来的一些高阶编程方式
    + 模块化思想
    + 惰性函数
    + 柯里化函数
      + 高阶组件 React
      + 函数的防抖和节流
      + bind
      + ...
    + compose组合函数
    
    + ...
*/

// 模块化思想  单例->AMD(require.js)->CMD(sea.js)->CommonJS(Node)->ES6Module

// --------在没有模块化思想之前，团队协作开发或者代码量较多的情况下，会导致全局变量污染[全局变量冲突]
/* // 实现天气板块
var time = '2020-11-01';

function queryData() {
  // ...
}

function changeCity() {
  // ...
}

// 实现咨询板块
var time = '2020-10-31';

function changeCity() {
  // ...
} */

// -----------暂时基于闭包的'保护作用'防止了全局变量的污染 [但是因为每个板块的代码都是私有的，无法相互调用]

/* (function () {
  var time = '2020-11-01';
  function queryData() {}
  function changeCity() {}
})();

(function () {
  var time = '2020-10-31';
  function changeCity() {}
})(); */

// -----------基于某些方法去实现相互调用
/* (function () {
  var time = '2020-11-01';
  function queryData() {}
  function changeCity() {}
  // 把需要供别人调用的API方法，挂在到全局上【但是不能挂载太多，挂载多了还是会引发全局变量污染】
  window.queryData = queryData;
})();

(function () {
  var time = '2020-10-31';
  function changeCity() {}
  queryData(); //从全局拿到了queryData
})(); */

// ------------
// 对象的特点：每一个对象都是一个单独的堆内存（单独的实例->Object这个类的一个实例），这样即使多个对象中的成员名字相同，也互不影响
// 仿照其它后台语言，其实obj1/obj2不仅仅称为对象名，更被称为“命名空间[给堆内存空间起一个名字]”
// --> 每一个对象都是一个单独的实例，用来管理自己的私有信息，即使名字相同，也互不影响，其实这就是"JS单例设计模式"
/* var obj1 = {
  name:'lele', 
  age:12, 
  fn:function(){}
},
var obj2 = {
  name:'jiajia', 
  age:30, 
  fn:function(){}
} */

// -------------高级单例设计模式：闭包+单例的结合，也是最早期的JS模块化思想
/* var weatherModule = (function () {
  var time = '2020-11-01';
  function queryData() {}
  function changeCity() {}
  infoModule.changeCity();
  return {
    queryData: queryData,
    changeCity: changeCity,
  };
})();

var infoModule = (function () {
  var time = '2020-10-31';
  function changeCity() {}
  weatherModule.queryData();
  return {
    changeCity: changeCity,
  };
})();

var skinModule = (function () {
  // ...
  return {};
})(); */

//=========================================================================================
/* 
  获取DOM元素样式的方法：
    + getComputedStyle：获取当前元素经过浏览器计算的样式[返回样式对象]【window.getComputedStyle(document.body)】，但是IE6~8不兼容，需要使用"元素.currentStyle"来获取
      '属性' in 对象：检测当前对象是否有这个属性，有返回true,反之返回false
*/
/* function getCss(element, attr) {
  if ('getComputedStyle' in window) {
    return window.getComputedStyle(element)[attr];
  }
  return element.currentStyle[attr];
}

var body = document.body;
console.log(getCss(body, 'height'));
console.log(getCss(body, 'margin'));
console.log(getCss(body, 'background')); */

// -----------优化思想：第一次执行getCss我们已经知晓是否兼容了，第二次及以后再次执行getCss，则不想再处理兼容的校验了，其实这种思想就是“惰性思想”，[懒，干一次可以搞定的，绝对不去做第二次]

/* var flag = 'getComputedStyle' in window;
function getCss(element, attr) {
  if (flag) {
    // 减少了查找的过程
    return window.getComputedStyle(element)[attr];
  }
  return element.currentStyle[attr];
}

var body = document.body;
console.log(getCss(body, 'height'));
console.log(getCss(body, 'margin'));
console.log(getCss(body, 'background')); */

/* function getCss(element, attr) {
  // 第一次执行，根据是否兼容，实现函数的重构
  if ('getComputedStyle' in window) {
    // 直接重构函数
    getCss = function getCss(element, attr) {
      return window.getComputedStyle(element)[attr];
    };
  } else {
    getCss = function getCss(element, attr) {
      return element.currentStyle[attr];
    };
  }
  // 为了保证第一次也能获取信息，则需要把重构的函数执行一次；
  return getCss(element, attr);
}

var body = document.body;
console.log(getCss(body, 'height'));
console.log(getCss(body, 'margin'));
console.log(getCss(body, 'background')); */

// ==========================================================================
/* 
  函数柯理化：预先处理的思想[形成一个不被释放的闭包，把一些信息存储起来，以后基于作用域链，访问到实现存储的信息，然后进行相关的处理，所有符合这种模式(或者闭包应用的)都被称为柯理化函数]
*/

function currying(x) {
  // x：预先存储的值
  return function (...args) {
    // 基于ES6剩余运算符获取传递的实参信息 -> 结果是个数组
    // ....
    // args.unshift(x);
    // 数组求和
    // 方法1 命令式编程：自己编写代码管控运行的步骤和逻辑，主要特点：怎么做，好处：自己可以灵活掌控执行步骤
    /* var total = 0;
    for (var i = 0; i < args.length; i++) {
      total += args[i];
    }
    return total; */
    // 方法2 函数式编程：具体实现的步骤，已经被封装成为方法，我们只需调用方法获取结果即可，无需关注怎么实现的，主要特点：关注结果，好处：用起来方便，代码量减少，弊端：自己无法灵活掌控执行步骤
    /* var total = 0;
    args.forEach((item) => {
      total += item;
    });
    return total; */
    // 方法3，eval()方法，将字符串转为JS表达式
    /* var total = eval(args.join('+'));
    return total; */
    // 方法4，数组reduce()方法
    return args.reduce((result, item) => result + item, x);
  };
}
var sum = currying(10);
console.log(sum(20)); // 10+20
console.log(sum(20, 30)); // 10+20+30

/* function currying(x) {
  // x：预先存储的值
  return function () {
    // 利用函数内置的实参集合，结果是一个类数组，将其转化为数组
    var args = Array.from(arguments); // 把类数组转化成数组 方法一
    var args = [].slice.call(arguments); // 把类数组转化成数组 方法二
  };
}
var sum = currying(10);
console.log(sum(20)); // 10+20
console.log(sum(20, 30)); // 10+20+30 */

/* 
  数组的reduce方法：在遍历数组的过程中，可以累积上一次处理的结果，基于上次处理的结果继续遍历处理
    + 数组.reduce([callback],[initialValue]); // initialValue可以不传
*/

// var arr = [10, 20, 30, 40];
/* var res = arr.reduce(function (result, item, index) {
  // 若initialValue初始值不传递，result默认初始值是数组第一项，然后reduce是从数组第二项开始遍历
  // 每遍历数组中的一项，回调函数会触发执行一次
  //  + result 存储的是上一次回调函数返回的结果（除了第一次是初始值或者数组第一项）
  //  + item 当前遍历这一项
  //  + index 当前遍历这一项的索引
  // console.log(item, index);
  console.log(result);
  return item + result;
});
console.log(res); */
/* var res = arr.reduce((result, item) => {
  // 若传递initialValue初始值，则result第一次的结果就是初始值，item从数组第一项开始遍历
  console.log(result, item);
  return result + item;
}, 0);
console.log(res);

var arr = ['小', '石', '子', '石', '子', '石', '子', '石', '子'];
var str = arr.reduce((result, item) => {
  return `${result},${item}`;
});
console.log(str); */

/* Array.prototype.reduce = function reduce(callback, initial) {
  var self = this, // this->arr
    i = 0;
  if (typeof callback !== 'function') throw new TypeError('callback must be a function');
  if (typeof initial === 'undefined') {
    initial = self[0];
    i = 1;
  }

  // 迭代数组每一项
  for (; i < self.length; i++) {
    var item = self[i],
      index = i;
    initial = callback(initial, item, index);
  }
  return initial;
};
var total = arr.reduce((result, item) => {
  return result + item;
});
console.log(total); */
