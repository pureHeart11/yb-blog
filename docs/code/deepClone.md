```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;
  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();

  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

// 测试
let add = curry(dynamicAdd);
document.write(add(1, 2, 3)(9)(5, 2));
```
