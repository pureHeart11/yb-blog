---
lang: zh-CN
title: 引导页
description: 这是引导页
---

## guide

[Home](/) <!-- 跳转到根部的 README.md -->

::: details 点击查看代码
这是一个详情块，在 IE / Edge 中不生效
:::

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

```less
body {
  div {
    padding: 0;
  }
}
```

<Demo />

## test

```js
const arr = [1, 2, 3, 4]
const a = arr.map(item => ({ ...item }))
```
