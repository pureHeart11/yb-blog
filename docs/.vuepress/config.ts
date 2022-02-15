import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-CN',
  title: 'yb 的个人博客',
  description: 'yb 的个人博客',
  base: '/yb-blog/',
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  // theme: '@org/vuepress-theme-bar',
  themeConfig: {
    // search: true,
    // logo: '/assets/img/logo.png',
    navbar: [
      { text: '首页', link: '/' },
      {
        text: 'yb的 个人博客',
        children: [{ text: 'Github', link: 'https://github.com/pureHeart11/yb-blog' }]
      }
    ],
    sidebar: [
      {
        text: '欢迎',
        link: '/'
      },
      {
        text: '设计模式',
        collapsible: true,
        children: [{ text: '观察者模式和订阅-发布模式的区别', link: '/designPatterns/observer' }]
      },
      {
        text: '手撕代码',
        collapsible: true,
        children: [
          { text: '深拷贝', link: '/code/deepClone' },
          { text: '实现new操作符', link: '/code/new' },
          { text: '实现instanceOf', link: '/code/instanceOf' },
          { text: '数组扁平', link: '/code/flatten' },
          { text: '数组去重', link: '/code/uniqArr' },
          { text: '防抖', link: '/code/debounce' },
          { text: '节流', link: '/code/throttle' },
          { text: 'sleep函数', link: '/code/sleep' },
          { text: '斐波那契', link: '/code/fib' },
          { text: '冒泡', link: '/code/bubble' },
          { text: 'promise', link: '/code/promise' },
          { text: '解析url', link: '/code/parseUrl' },
          { text: '千分位分隔符', link: '/code/thousandthSplit' }
        ]
      }
    ]
  },
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        // 将 docs/.vuepress/components 下的vue文件自动注册为 Vue 组件
        componentsDir: path.resolve(__dirname, './components')
      }
    ]
  ]
})
