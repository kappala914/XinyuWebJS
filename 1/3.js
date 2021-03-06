/* 
  代码执行完不能出栈释放：
    当前上下文中的某些内容[一般指的都是堆空间]，被上下文以外的事物占用了，则无法出栈释放，
    假设一旦被释放，后期外部事物就无法找到对应的内容了
*/

/* 
  闭包：函数执行形成一个私有的上下文，此上下文中的私有变量和上下文以外的变量互不干扰，也就是当前上下文把这些变量保护起来了，我们把函数的这种保护机制称为闭包 [闭包不是具体的代码，而是一种机制]
  市面上很多人认为，形成的私有上下文很容易被释放，这种保护的机制存在时间太短了，不是严谨意义上的闭包，他们认为只有形成的上下文不被释放，才是闭包，
  而此时，不仅保护了私有变量，而且这些变量和存储的值也不会被释放掉，保存起来了！
    + 保护
    + 保存
    利用这两种机制，可以实现高阶编程技巧
*/
/* 
  闭包： 函数运行的一种机制（不是某种代码形式）
    + 函数执行会形成一个私有上下文，如果上下文中的某些内容（一般指的堆内存地址）被上下文以外的一些事物（例如：变量/事件绑定等）所占用，
      则当前上下文不能被出栈释放[浏览器的垃圾惠州机制GC所决定的] => "闭包"的机制：形成一个不被释放的上下文
      + 保护：保护私有上下文中的"私有变量"和外界互不影响
      + 保存：上下文不被释放，那么上下文中的 变量 和 值 都会被保存起来，可以供其下级上下文中使用
    + 弊端：如果大量使用闭包，会导致栈内存太大，页面渲染变慢，性能受到影响，所以真实项目中需要“合理应用闭包”；某些代码会导致栈溢出或者内存泄漏，这些操作都是我们需要注意的
*/

/* 
  递归：函数执行中再次调用自己执行
  下面这个案例是‘死递归’ ，内存溢出
  function fn(x){
    console.log(x);
    fn(x+1);
  }
  fn(1);
*/
