/* // 1.为对象添加Symbol.iterator属性
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],

  // 添加Symbol.iterator标识接口以及iterator实现
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn, ...this.work];
    let index = 0;
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length,
        };
      },
    };
  },
  // others object method
};

// 2.用for...of遍历对象
for (const item of todos) {
  console.log(item);
}
 */

/* const fn = (literals, ...values) => {
  console.log('字面量数组', literals);
  console.log('变量数组', values);
  console.log('字面量数组是否比变量数组多一个元素', literals.length - 1 === values.length); // true
  let output = '';
  let index; // 不能放在for里，因为index在块级作用域之外还有访问
  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }
  output += literals[index];
  return output;
};

const name = '张三';
const age = 18;
const result = fn`姓名${age}`; */

function SaferHTML(templateData) {
  // 这里使用隐式参数arguments来访问模板字符串中的所有变量
  let s = templateData[0];
  console.log('arguments::', arguments);
  console.log('templateData::', templateData);
  for (let i = 1; i < arguments.length; i++) {
    console.log(`arguments[${i}]::`, arguments[i]);
    let arg = String(arguments[i]);

    s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s += templateData[i];
  }
  return s;
}

let sender = '<script>alert("abc")</script>'; // 1.获得用户输入
const safeSender = SaferHTML`${sender}`; // 2.转义用户输入
console.log('safeSender:::', safeSender);
document.getElementById('p').innerHTML = safeSender; // 3.使用转义后的用户输入
