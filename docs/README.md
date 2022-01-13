---
lang: zh-CN
title: 首页
description: 这是首页
---

<!-- 相对路径 -->

[首页](../README.md)
[配置参考](./guide/start.md)
[快速上手](./getting-started.md)

<!-- 绝对路径 -->

[指南](/guide/start.md)
[配置参考 > markdown.links](/zh/reference/config.md#links)

<!-- URL -->

[baidu](https://www.baidu.com)
[guide 页](./guide/start.md)

VuePress 2 已经发布 :tada: ！

```ts
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: '你好， VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png'
  }
}
```

1 + 2 + 3 = {{ 1 + 2 + 3 }}

```md
<!-- 默认情况下，这里会被保持原样 -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

@[code{1-3}](./test/index.js)

<Badge text="演示" />

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>
