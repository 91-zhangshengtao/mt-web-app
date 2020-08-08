# 仿美团外卖移动webApp
<!-- ![Image text](./img/vuex.jpg) -->

## 一、项目介绍
1.  项目技术栈 
```
- webpack4
- sass
- react redux
- rem
- Jsbridge ios
```
2. 搭建项目
```
- 新建项目名 再npm init -y
- 安装webpack@4.3.0 webpack-cli@2.0.12
  npm i webpack@4.3.0 --save
  npm i webpack-cli@2.0.12 --save
- 新建src文件夹 目录
  
- 新建webpack配置文件 (linux touch新建文件)
  webpack.config.dev.js
  webpack.config.build.js

- 安装 webpack配置 插件
  html-webpack-plugin@3.2.0
  html-webpack-inline-source-plugin@0.0.10

- react相关的插件
  react@16.2.0
  react-dom@16.2.0
  react-redux@5.0.7
  react-router-dom@4.2.2
  react-router-redux@5.0.0-alpha.9
  redux@3.7.2
  redux-thunk@2.2.0

- 安装babel插件
  babel-core@6.26.0
  babel-eslint@8.2.3
  babel-loader@7.1.4
  babel-plugin-react-hot-loader@3.0.0-beta.6
  babel-preset-es2015@6.24.1
  babel-preset-react@6.24.1
  babel-preset-stage-0@6.24.1
  babel-plugin-transform-async-to-generator@6.24.1
  babel-plugin-transform-runtime@6.23.0

- 其他loader
  css-loader@0.28.11
  style-loader@0.20.3
  sass-loader@6.0.7
  sass-resources-loader@1.3.3
  node-sass@4.9.0
  url-loader@1.0.1
  file-loader@1.1.11
```
```json
"scripts": {
    "build-dev": "./node_modules/.bin/webpack --config webpack.config.dev.js",
    "dev": "./node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "build": "./node_modules/.bin/webpack --config webpack.config.build.js --progress",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
react-family/
    |
    |──dist/                                    * 发布版本构建输出路径
    |
    |──dev/                                     * 调试版本构建输出路径
    |
    |──src/                                     * 工具函数
    |     |
    |     |—— component/                        * 各页面公用组件
    |     |
    |     |—— page/                             * 页面代码
    |     |      |—— index/                     * 页面代码
    |     |      |        |—— Main/             * 组件代码
    |     |      |        |       |—— Main.jsx  * 组件jsx
    |     |      |        |       |—— Main.scss * 组件css
    |     |      |
    |     |      |—— detail/                    * 页面代码
    |     |
    |     |—— static/                           * 静态文件js，css
    |
    |
    |──webpack.config.build.js                  * 发布版本使用的webpack配置文件
    |──webpack.config.dev.js                    * 调试版本使用的webpack配置文件
    |──.eslint                                  * eslint配置文件
    |__.babelrc                                 * babel配置文件
```



