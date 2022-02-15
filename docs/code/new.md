`new`关键字会进行如下操作：

1. 创建一个空的简单 JavaScript 对象（即 {} ）；
2. 为步骤 1 新创建的对象添加属性 proto ，将该属性链接至构造函数的原型对象
3. 将步骤 1 新创建的对象作为 this 的上下文,执行该函数 ；
4. 如果该函数没有返回对象，则返回 this。

```javascript
function _new(fn, ...args) {
  const obj = {}

  obj.__proto__ = fn.prototype

  fn.apply(obj, args)

  return obj
}

// 测试
let Person = function (name, sex) {
  this.name = name
  this.sex = sex
}

Person.prototype.showInfo = function () {
  console.log(this.name, this.sex)
}

let p1 = _new(Person, 'qianlongo', 'sex')

console.log(p1)
p1.showInfo()
```
