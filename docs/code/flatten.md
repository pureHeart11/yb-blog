1. 递归实现

```javascript
const flat1 = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat1(cur) : cur)
  }, [])
}
```

2. 遍历实现

```javascript
const flat2 = arr => {
  let result = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flat2(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
```

3. es6 实现

```javascript
let arr = [1, [2, 3, 4], [5, [6, [7, [8]]]]]
const flat3 = arr => {
  return arr.flat(Infinity)
}
console.log(flat3(arr))
```
