1. 使用 set

```javascript
const uniqueArray1 = array => [...new Set(array)]
```

2. Array.form 去重

```javascript
const uniqueArray2 = array => Array.from(new Set(array))
```

3. includes 去重

```javascript
const uniqueArray3 = arr => {
  let result = []
  arr.forEach(ele => {
    if (!result.includes(ele)) {
      result.push(ele)
    }
  })
  return result
}
```

4. indexOf 去重

```javascript
const uniqueArray4 = arr => arr.filter((item, index, array) => array.indexOf(item) === index)
```
