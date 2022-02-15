```javascript
const debounce = function (func, delay) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 测试
const showName = debounce(() => {
  console.log('lyq')
}, 1000)

document.getElementById('input').addEventListener('input', () => {
  showName()
})
```
