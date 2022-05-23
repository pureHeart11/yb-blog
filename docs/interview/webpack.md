### 1. webpack 配置中用过哪些 Loader？都有哪些作用

- <font color=#ff502c>style-loader</font>：将处理好的 css 通过 style 标签的形式添加到页面上
- <font color=#ff502c>css-loader</font>：处理 css
- <font color=#ff502c>postcss-loader</font>：自动添加 CSS3 部分属性的浏览器前缀
- <font color=#ff502c>less-loader</font>：识别 less 文件
- <font color=#ff502c>sass-loader</font>：识别 sass 文件（搭配 node-sass 一起使用）
- <font color=#ff502c>file-loader</font>：解决图片引入问题，并将图片 copy 到指定目录，默认为 dist
- <font color=#ff502c>url-loader</font>：依赖 file-loader，当图片小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝
  > webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
- <font color=#ff502c>image-loader</font>：加载并且压缩图片文件
- <font color=#ff502c>babel-loader</font>：ES6 转换成 ES5
- <font color=#ff502c>ts-loader</font>：将 TypeScript 转换成 JavaScript
- <font color=#ff502c>eslint-loader</font>：通过 ESLint 检查 JavaScript 代码
- <font color=#ff502c>cache-loader</font>：可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

### 2. webpack 配置中用过哪些 Plugin？都有哪些作用

- <font color=#ff502c>html-webpack-plugin</font>：生成 html 文件并引入外部资源
- <font color=#ff502c>clean-webpack-plugin</font>：自动清空打包目录
- <font color=#ff502c>mini-css-extract-plugin</font>：css 文件引入
- <font color=#ff502c>webpack-bundle-analyzer</font>：构建结果分析
- <font color=#ff502c>optimize-css-assets-webpack-plugin</font>：压缩 css
- <font color=#ff502c>uglifyjs-webpack-plugin</font>：不支持 ES6 压缩 (Webpack4 以前)
- <font color=#ff502c>terser-webpack-plugin</font>：支持压缩 ES6 (Webpack4)
- <font color=#ff502c>purgecss-webpack-plugin</font>：清除无用 css

### 3. Loader 和 Plugin 有什么区别？

- Loader 直译为"加载器"。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 和 json 文件，如果想将其他文件也打包的话，就会用到 loader。 所以 Loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力。

- Plugin 直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

### 4. 如何编写 Loader ? 如何编写 Plugin

### 5. Webpack 层面如何性能优化？

- externals 从 cdn 引入，而非打包
- include 和 exclude 配置缩小查询范围
- noParse 配置哪些模块文件的内容不需要进行解析，以提高整体的构建速度
- ignorePlugin 将插件中的非中文语音排除掉，可以大大节省打包的体积
- thread-loader 多进程打包，配置在 thread-loader 之后的 loader 都会在一个单独的 worker 池（worker pool）中运行
- happyPack 多进程打包（webpack5 已弃用）
- 利用缓存：
  - babel-loader 开启缓存
  - cache-loader 缓存一些性能开销比较大的 loader 的处理结果
  - hard-source-webpack-plugin 提供了中间缓存 (webpack5 内置了模块缓存)
- webpack-bundle-analyzer 构建结果分析
- optimize-css-assets-webpack-plugin 压缩 css
- terser-webpack-plugin 压缩 js （webpack5 内置，无需安装，直接引用）
- purgecss-webpack-plugin 清除无用 css
- tree-shaking 剔除没有用的代码
  （webpack 默认支持，需要在 .bablerc 里面设置 model：false，即可在生产环境下默认开启）
- splitChunks 公共模块抽取

### 6. Webpack 打包流程是怎样的？

- 初始化参数：解析 webpack 配置参数，合并 shell 传入和 webpack.config.js 文件配置的参数,形成最后的配置结果；

- 开始编译：上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件 监听 webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译；

- 确定入口：从配置的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去；

- 编译模块：递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

- 完成模块编译并输出：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 entry 或分包配置生成代码块 chunk;

- 输出完成：输出所有的 chunk 到文件系统；

### 7. Webpack 热更新（HMR）是如何实现？

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。
HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。
后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

### 8. Webpack 打包中 Babel 插件是如何工作的？

### 9. Webpack5 更新了哪些新特性？
