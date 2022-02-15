```javascript
function throttle(func, delay) {
  let timer = null

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

// 测试
let t1 = Date.now()

const showName = throttle(function (name) {
  const t2 = Date.now()
  console.log(this, name, t2 - t1)
  t1 = Date.now()
}, 1000)

setInterval(() => {
  showName.call({ name: 'yb' }, 'yb')
}, 10)
```
