```javascript
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    throw new Error('Type error');
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断 context 是否传入，如果没有传就设置为 window
  context = context || window;
  // 将被调用的方法设置为 context 的属性
  // this 即为我们要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  result = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 将执行结果返回
  return result;
};
```

```javascript
// call和apply实现方式类似，只是传参的区别
// 基本思想是把fn.call(obj,args)中的fn赋值为obj的属性，然后调用obj.fn即可实现fn中this指向的改变
Function.prototype.myCall = function (context = window) {
  //myCall函数的参数，没有传参默认是指向window
  context.fn = this; //为对象添加方法（this指向调用myCall的函数）
  let args = [...arguments].slice(1); // 剩余的参数
  let res = context.fn(...args); // 调用该方法，该方法this指向context
  delete context.fn; //删除添加的方法
  return res;
};

Function.prototype.myApply = function (context = window) {
  //myCall函数的参数，没有传参默认是指向window
  context.fn = this; //为对象添加方法（this指向调用myCall的函数）
  let res;
  if (arguments[1]) {
    //判断是否有第二个参数
    res = context.fn(...arguments[1]); // 调用该方法，该方法this指向context
  } else {
    res = context.fn(); // 调用该方法，该方法this指向context
  }
  delete context.fn; //删除添加的方法
  return res;
};

Function.prototype.myBind = function (context = window) {
  const _this = this; // 当前函数
  let args = [...arguments].slice(1); // 将参数列表转化为数组,除去第一个参数外
  // 返回新函数
  return function () {
    // context 是传进来的this
    _this.apply(context, args.concat(Array.from(arguments))); // 利用apply将this指向context，参数进行拼接
  };
};

// 验证
function sayName(name = 'wwx', age = 18) {
  this.name = name;
  this.age = age;
  console.log(this.name);
  return this.age;
}
var obj = {
  name: 'zcf',
  age: 24
};
var age = sayName.myCall(obj, 'wxxka', 19); // 19
var age1 = sayName.myApply(obj, ['wwxSSS', 20]); //20
```
