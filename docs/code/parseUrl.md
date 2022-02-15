```javascript
function parseUrl(url) {
  const params = url.split('?')[1].split('&')

  return params.reduce((pre, cur) => {
    const [key, val] = cur.split('=')
    pre[key] = !!val ? decodeURIComponent(val) : true
    return pre
  }, {})
}

// 测试
const url = 'http://baidu.com?a=1&b=2&c=3&city=%E5%8C%97%E4%BA%AC&enabled'
console.log(parseUrl(url))
```
