方法 1

```javascript
function fib(n) {
  if (n === 0) {
    return 0
  }

  if (n === 1 || n === 2) {
    return 1
  }
  return fib(n - 2) + fib(n - 1)
}
```

方法 2

```javascript
function fib2(n) {
  if (typeof fib2[n] !== 'undefined') {
    return fib2[n]
  }

  if (n === 0) {
    return 0
  }

  if (n === 1 || n === 2) {
    return 1
  }

  const res = fib2(n - 2) + fib2(n - 1)

  fib2[n] = res

  return res
}

// 测试
const t1 = Date.now()
console.log(fib2(40))
console.log(Date.now() - t1)
```
