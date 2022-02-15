instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
所以实现 instanceof 的思路就是判断右边变量的原型是否存在于左边变量的原型链上。

1. instanceof 判断对象的原型链上是否存在构造函数的原型。只能判断引用类型。
2. instanceof 常用来判断 A 是否为 B 的实例

```javascript
function instanceOf(C, D) {
  D = D.prototype
  C = C.__proto__

  while (true) {
    if (C === null) {
      return false
    }
    if (C === D) {
      return true
    }
    C = C.__proto__
  }
}
```
