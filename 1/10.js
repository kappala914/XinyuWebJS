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

function getCss(element, attr) {
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
console.log(getCss(body, 'background'));
