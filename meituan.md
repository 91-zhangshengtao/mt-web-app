# 仿美团外卖移动webApp

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
  npm i webpack-dev-server@3.1.4 --save     // dev环境运行 在内存中生成打包后的文件夹

- 新建src文件夹 目录
  
- 新建webpack配置文件 (linux touch新建文件)
  webpack.config.dev.js
  webpack.config.build.js

- 安装 webpack配置 插件
  html-webpack-plugin@3.2.0      // html模板
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
  sass-resources-loader@1.3.3 // 打包时加载进去
  node-sass@4.9.0
  url-loader@1.0.1
  file-loader@1.1.11

- eslint
  eslint@4.19.1
  eslint-loader@2.0.0
  eslint-plugin-react@7.7.0
  babel-eslint@8.2.3

- webpack热加载
  react-hot-loader@4.0.0
  babel-plugin-react-hot-loader@3.0.0-beta.6
```
```json
"scripts": {
    "build-dev": "./node_modules/.bin/webpack --config webpack.config.dev.js",
    "dev": "./node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "build": "./node_modules/.bin/webpack --config webpack.config.build.js --progress",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
```
react-family/
    |
    |──dist/                                            * 发布版本构建输出路径
    |
    |──dev/                                             * 调试版本构建输出路径
    | 
    |──src/                                             * 工具函数
    |     |
    |     |—— component/                                * 各页面公用组件
    |     |
    |     |—— page/                                     * 页面代码
    |     |      |—— index/                             * 页面代码
                          index.js                      * 入口文件
                          store.js                      
                          |——actions/                   * react-redux actions
                                  |——tabAction.js       
                                  |——actionTypes.js     * action-type
                          |——reducers/                  * react-redux reducers
                                  |——main.js            
                                  |——tabReducer.js      
    |     |      |        |—— Main/                     * 组件代码
    |     |      |        |       |—— Main.jsx          * 组件jsx
    |     |      |        |       |—— Main.scss         * 组件css
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
3. 构建完善
```
- 使用rem
  新建page/index/static/rem.js文件
  在入口index.html引入

- 使用热模块替换(HMR)/热更新
- 加入eslint(越早越好)
```
- rem
```js
(function(){
    var docEl = document.documentElement;

    function setRemUint(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUint();

    window.addEventListener('resize', setRemUint);
})();
```
- 封装转rem的全局函数
**在webpack中结合插件sass-resources-loader@1.3.3打包时可加载进去**
**结合vscode插件 Px to rem with scss, 操作:选中alt+c**
**去~/.vscode/文件夹 `rem(${parseInt(val)})`改为`px2rem(${parseInt(val)}px)` 可自定义**
```scss
@function px2rem($px){
    $rem: 37.5px; // 基于iphone6
    @return ($px / $rem) + rem;
}
```
- eslint(新建src/.eslint文件)
```json
{   
    // eslint:recommended 官方推荐    plugin:react/recommended  基于react
    "extends": ["eslint:recommended" ,"plugin:react/recommended"],
    "parser" : "babel-eslint", // babel-eslint解析文件

    "globals": { // 全局变量 eslint不识别
        "window": true,
        "document": true,
        "module": true,
        "require": true,
        "console": true
    },
    "rules": { // off 干掉哪些
        "react/prop-types": "off",
        "no-console": "off",
        "no-debugger": "off"
    }
}
```
- eslint(webpack.config.js中) 
```js
{ test: /\.(js|jsx)$/, use: [
        {loader: 'babel-loader'},
        {loader: 'eslint-loader'} // 加eslint-loader
    ],
    include: srcRoot
}
```
- wepack 模块热更新
**官网有参考配置**
```js
module.exports ={
    devServer: {
        contentBase: devPath,
        hot: true // 热更新
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 热更新
        new webpack.HotModuleReplacementPlugin(), //热更新
    ].concat(htmlArray) // htmlArray:template 配置
}
```
- page/index/Main/Container.jsx组件 热更新
```jsx
import React from 'react';

import Main from './Main.jsx';
import { hot } from 'react-hot-loader';


class Container extends React.Component {
    render() {
        return <Main />
    }
}

export default hot(module)(Container)
// export default Container
```
- redux热更新 page/index/store,js
```js
// redux热更新
if (module.hot) {
    module.hot.accept('./reducers/main', ()=>{
        const nextRootReducer = require('./reducers/main.js').default;
        store.replaceReducer(nextRootReducer)
    })
}
```


4. redux-react的基本使用
```
- action
  dispatch
- reducer
- store
  subscribe
```
- actions/actionTypes.js

```js
export const ADD_TODO = 'ADD_TODO';
export const CHANGE_TAB = 'CHANGE_TAB';
export const HEAD_DATA = 'HEAD_DATA';
export const LIST_DATA = 'LIST_DATA';
export const ORDER_DATA = 'ORDER_DATA';
```
- actions/tabAction.js

```js
import { ADD_TODO, CHANGE_TAB } from './actionTypes.js'
export const addTodo = (obj) => {
    return {
        type: ADD_TODO,
        obj: obj
    }
}
export const changeTab = (obj) => {
    return {
        type: CHANGE_TAB,
        obj: obj
    }
}
```
- reducers/Main.js

```js
import tabReducer from './tabReducer.js'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    tabReducer
})
export default reducers
```
- reducers/tabReducer.js

```js
import { CHANGE_TAB } from '../actions/actionTypes.js';
const initState = {
    tabs: [
        {
            name: '首页',
            key: 'home'
        },
        {
            name: '我的',
            key: 'my'
        }
    ],
    activeKey:'my'
};

const changeTab = (state, action)=>{
    let activeKey = action.obj.activeKey;
    return { ...state, activeKey: activeKey };

};

// reducer
const tabReducer = (state = initState, action) => {

    switch(action.type) {
        case CHANGE_TAB: return changeTab(state, action);
        default: return state;
    }
};

export default tabReducer;
```
- 组件中使用 Main.jsx
```js
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/tabAction' // actions
class Main extends React.Component {
    constructor(props) {
        super(props);

    }
    handleCLick(){
      // this.props dispatch 调用
      this.props.dispatch(
        changeTab({
          activeKey: 'home'
        })
      )
    }
    render(){
        let {activeKey} = this.props // this.props取
        return (
            <div>
               <p onClick={()=>this.handleCLick}>{activeKey}</p>
            </div>
        );
    }
}
/* connect连接 */
export default connect(
    state =>({
        activeKey: state.tabReducer.activeKey
    })
)(Main)
```
- store.js
```js
import { 
    createStore
} from 'redux';
import mainReducer from './reducers/main.js';
const store = createStore(
    mainReducer
)
module.exports = {
    store
}
```
- 入口文件index.js
```js
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Main from './Main/Main.jsx';
import { store } from './store.js' // store注入

ReactDom.render(
    <Provider store={store}>
        <Main /> /* 使用的组件 */
    </Provider>,
    document.getElementById('root')
);
```
![Image text](./img/react-redux02.jpg)
![Image text](./img/react-redux01.jpg)



## 二、项目开发
**一般来说组件内最外层div className和组件名一致**
1. BottomBar组件(首页底部tab栏) page/index/BottomBar/

2. Home组件(首页tab) page/index/Home/

- Header组件(顶部banner)  page/index/Home/Header/
```
- 图片img,如果依赖后台数据变化的用<img src=""/>,如果一成不变的用background
  	地址http/https简写
		<img src="//xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg"/>

- SearchBar设置了absolute定位
  	<div className="header">
        <SearchBar />
        <img className="banner-img" src="//xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg"/>
    </div>
```
- SearchBar组件(顶部搜索框) page/index/Home/SearchBar/
```
- icon和文字横向对齐 这里通过display:inline-block;
- 使用伪类 加icon
  &:before {
		content: '';
		display: block;
		position: absolute;
		width: px2rem(14px);
		height: px2rem(14px);
		background-image: url('./img/searchIcon.png');
		background-size: cover;
		top: px2rem(7px);
		left: px2rem(10px);
  }
- 背景图
  background-image: url('./img/arrowIcon.png'); 
  background-size: cover; 
```
- Category组件(外卖类别) page/index/Home/Category/
```js
// - actions
  export const getHeaderData = ()=> async () =>{
    let resp = await axios({
        method: 'get',
        url: './json/head.json',
    });

    return {
        type: HEAD_DATA,
        obj: resp.data
    }

	}

// - reducers
  const getCategory = (state, action) =>{
    return { ...state, items: action.obj.data.primary_filter};
  }
	const categoryReducer = (state = initState, action) => {
			switch(action.type) {
					case HEAD_DATA: return getCategory(state, action);
					default: return state;
			}
	}

// - 组件中使用
	this.props.dispatch(getHeaderData())
	export default connect(
    state =>({
        items: state.categoryReducer.items
    })
	)(Category);
```


