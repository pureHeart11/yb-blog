> 单例模式的核心是确保只有一个实例，并提供全局访问

```javascript
var cache = {}

export default function loadScript(url) {
  if (cache[url]) return cache[url]
  else {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = url
    document.body.appendChild(script)
    return (cache[url] = new Promise(function (resolve, reject) {
      script.onload = function () {
        resolve()
      }
      script.onerror = function () {
        reject()
      }
    }))
  }
}
```

```javascript
import loadScript from 'public/helper/loadScript'

// 不管调用几次加载，都是返回同一个Promise对象
loadScript('http://gos-prod.goschainccap.com/h5_activity/libs/echarts-en.common.min.js')
loadScript('http://gos-prod.goschainccap.com/h5_activity/libs/echarts-en.common.min.js')
loadScript('http://gos-prod.goschainccap.com/h5_activity/libs/echarts-en.common.min.js')
loadScript('http://gos-prod.goschainccap.com/h5_activity/libs/echarts-en.common.min.js')
```
