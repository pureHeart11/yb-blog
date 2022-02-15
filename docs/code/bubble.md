```javascript
const bubble = arr => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// 测试
const arr = [8, 5, 1, 0, 2, 12, 45, 36, 7, 3, 89]
console.log(bubble(arr))
```
