import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-CN',
  title: 'yb',
  description: 'yb 的个人博客',
  base: '/ybBlog/',
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
        children: [
          { text: 'Github', link: 'https://github.com/mqyqingfeng' },
          { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
        ]
      }
    ],
    sidebar: [
      {
        text: '欢迎学习',
        link: '/',
        collapsible: false,
        children: [{ text: '学前必读', link: '/' }]
      },
      {
        text: '基础学习',
        collapsible: false,
        children: [{ text: 'vue 工具类型', link: '/vue/utils' }]
      }
    ]
  }
})
