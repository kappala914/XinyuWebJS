/* 
	JS可以执行的环境
		+ 浏览器 【浏览器的内核：JS渲染引擎】
		+ Hybrid混合APP 【webview 基于 webkit内核】
		+ Node
		+ ...
*/

/* 
	浏览器会在计算机内存中（内存条）开辟一块内存，专门用来执行JS代码
		=>栈内存：执行环境栈 ECStack => Execution Context Stack
*/

/* 
	EC(G) -> Execution Context(Global)
	全局执行上下文，用来供全局代码执行
	形成上下文目的： 区分不同区域的代码执行
*/

/* 
	VO(G) -> Varible Object(Global)
	全局变量对象：存储全局上下文中声明的变量
*/

/* 
	当前区域的执行上下文形成后会进栈执行
	有的执行上下文在代码执行完成后，会出栈
*/

/* 
	var a = 12的过程
		第一步：创建值
			+ 基本类型值直接存储到栈内存中
			+ 引用类型值是单独开辟一块新的内存来存储
		第二步：声明变量declare
		第三步：变量和值关联到一起
*/

/* 
	创建值
		+ 基本数据类型直接存储到栈
		+ 引用数据类型
			+ 单独开辟一个块内存 Heap堆内存
			+ 每一个堆内存都有一个16进制地址
			+ 把键值对分别存储到堆中
			+ 把16进制地址放到栈中存储，方便后期变量的关联
*/

/* 
  栈内存 和 堆内存，都是浏览器从计算机中分配出来的内存，‘开辟的越多，电脑性能越慢’
  ==> 性能优化：内存优化
    + 栈内存：代码执行 & 存储基本类型值
    + 堆内存：存储引用数据类型值
*/

/* 
  如果运算优先级相同，正常运算是从右到左：
  a = b = xxx;（执行顺序是：1. b=xxx; 2. a=xxx）
  但是a.x属于成员访问，成员访问的优先级是20，运算优先级很高，：
  无论是a.x = b = xxx ，还是b = a.x = xxx；都要先处理a.x， 执行顺序都是1. a.x = xxx; 2. b = xxx;
  
*/

/* 
  GO全局对象 => 不是VO(G)
  浏览器一加载页面就默认开辟的堆内存
  浏览器在这里提供了一些供JS调用的全局API
  浏览器把这个全局对象赋值给了window这个变量
*/

/* 
  创建函数 和 创建变量 区别不是很大 => 函数名其实就是变量
    1. 单独开辟一个堆内存：16进制地址，函数堆内存中存储的是函数体中的 “代码字符串” ；
    2. 创建函数的时候，就声明了他的作用域[scope]，作用域就是所在的上下文环境，在哪创建的函数，它的作用域就是谁；
    3. 把16进制地址存放到栈中，供变量（函数名等）关联引用即可；
  函数执行：
    目的：把创建函数的时候在堆内存中存储的字符串变为代码执行，导致了函数执行会形成一个全新的私有的执行上下文；
          多次函数执行，会形成多个私有上下文，这些私有上下文之间也没有直接的关系
          在私有上下文中，也有存放自己变量的对象：AO（Active Object），他是VO的一种
    步骤：
      1. 形成一个全新的、私有的上下文 EC(...)；
      2. 当前私有的上下文中，有一个存放本上下文内声明的变量的地方 AO(...) => 这里的变量都是当前上下文内的私有变量 [当前上下文中声明的变量、形参变量]；
      3. 进栈执行；
      4. 代码执行之前还要处理很多的事情
        1) 初始化作用域链 [scope-chain]：<当前自己的上下文，上级上下文(创建函数时候形成的作用域)> => 当前函数的上级上下文是创建函数坐在的上下文（作用域），
            后期函数内代码执行，遇到一个变量，我们首先看是否为自己上下文中的私有变量（看AO中有没有），
              如果是私有变量，则当前变量的操作和外界环境中的变量互不干扰（没有直接关系）；
              如果不是自己的私有变量，则按照作用域链，查找是否为其上级上下文中的私有变量...直到找到EC(G)全局上下文为止，即作用域查找机制
        2) 初始化THIS...
        3) 初始化arguments...
        4) 形参赋值： 形参都是私有变量（放在AO中的）；
                      如果不传递实参值，默认值是undefined；
                      ....
        5) 变量提升
      5. 代码自上而下执行
      6. 一般情况下，函数执行所形成的上下文，进栈执行完后，会默认出栈释放掉 [私有上下文中存储的私有变量和一些值都会被释放掉]，
          目的：为了优化内存空间，减少栈内存的消耗，提高页面或者计算机的处理速度...
*/
