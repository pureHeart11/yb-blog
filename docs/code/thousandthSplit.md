1. 正则

```javascript
function format1(str) {
  return str.replace(/\B(?=(\d{3})+\b)/g, ',');
  // return str.replace(/(?=\B((\d{3})+)$)/g,',')
}

// function format1(str) {
//   const reg = /\d{1,3}(?=(\d{3})+$)/g;
//   // match 为匹配之后的内容
//   return str.replace(reg, function (match) {
//     return match + ',';
//   });
// }

// 测试
const str = '100000000000';
console.log(format1(str));
```

2. api

```javascript
const format2 = num => num.toLocaleString();

// 测试
const num = 100000000000;
console.log(format2(num));
```
