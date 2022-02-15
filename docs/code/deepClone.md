```javascript
function deepClone(target, cache = new Map()) {
  const isObject = v => typeof v === 'object' && v != null

  if (isObject(target)) {
    // 解决循环引用
    const cacheTarget = cache.get(target)
    // 已经存在直接返回，无需再次解析
    if (cacheTarget) {
      return cacheTarget
    }

    let cloneTarget = Array.isArray(target) ? [] : {}

    cache.set(target, cloneTarget)

    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        const value = target[key]
        cloneTarget[key] = isObject(value) ? deepClone(value) : value
      }
    }

    return cloneTarget
  }

  return target
}
```
