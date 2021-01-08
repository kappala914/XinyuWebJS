/* 
    闭包应用之循环事件绑定的N种解决方法
*/

/* 
// 无法实现
var buttons = document.querySelectorAll('button'); // 类数组集合
console.log(buttons);
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    console.log(`当前点击按钮的索引：${i}`);
  };
}

*/

// 方案一：基于“闭包”的机制完成 [每一轮循环都产生一个闭包，存储对应的索引，点击事件触发，执行对应的函数，让其上级上下文是闭包即可]
/* var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  // 每一轮循环都会形成一个闭包，存储私有变量i的值（当前循环传递的i的值）
  //  + 自执行函数执行，产生一个上下文EC(A)，私有形参变量i=0/1/2
  //  + EC(A)上下文中创建一个小函数，并且让全局buttons中的某一项占用创建的函数
  (function (i) {
    buttons[i].onclick = function () {
      console.log(`当前点击按钮的索引：${i}`);
    };
  })(i);
} */

/* var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = (function (i) {
    return function () {
      console.log(`当前点击按钮的索引：${i}`);
    };
  })(i);
}
 */
/* var obj = {
  // 把自执行函数执行的返回值（小函数） 赋值给fn
  fn: function () {
    // 闭包
    console.log('大函数');
    return function () {
      console.log('小函数');
    };
  },
};
obj.fn(); // 执行的是返回的小函数 */

/* // 基于let这种方法也是‘闭包’方案
// 浏览器在每一轮循环的时候，帮助我们形成的“闭包”
var buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
  // 父级“块级上下文”：控制循环
  //    第一轮循环  私有的块级上下文EC(B1) i=0
  //    -> 当前上下文中创建的一个小函数，被全局的按钮的click占用了，EC(B1)不会被释放，所以形成了“闭包”
  buttons[i].onclick = function () {
    console.log(`当前点击按钮的索引：${i}`);
  };
} */

// 方案二：自定义属性 [性能强于闭包]
/* var buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
  // 每一轮循环都给当前按钮（对象）设置一个自定义属性：存储它的索引
  buttons[i].myIndex = i;
  buttons[i].onclick = function () {
    console.log(`当前点击按钮的索引：${this.myIndex}`);
  };
} */

// 方案三：事件委托 [比之前的性能提高40%-60%]
// + 不论点击body中的谁，都会触发body的点击事件
// + ev.target是事件源：具体点击的是谁
document.body.onclick = function (ev) {
  var target = ev.target,
    targetTag = target.tagName;
  if (targetTag === 'BUTTON') {
    var index = target.getAttribute('index');
    console.log(`当前点击按钮的索引：${index}`);
  }
};
