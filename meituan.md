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
3. redux-react的基本使用
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



## 二、项目
1.  



