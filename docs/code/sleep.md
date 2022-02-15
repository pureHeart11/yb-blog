```javascript
const sleep = (func, delay) => {
  return new Promise(resolve => setTimeout(() => resolve(func()), delay))
}

// 测试
async function test() {
  console.log(11)
  await sleep(() => {
    console.log(2)
  }, 2000)
  console.log(33)
}

test()
```
