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
  react-loadable@5.4.0  // 配合react-router-dom  组件懒加载
  react-router-redux@5.0.0-alpha.9
  history@4.7.2 // router需要
  redux@3.7.2
  redux-thunk@2.2.0
  redux-logger@3.0.6

- 安装babel插件
  babel-core@6.26.0
  babel-loader@7.1.4
  babel-plugin-react-hot-loader@3.0.0-beta.6
  babel-preset-es2015@6.24.1
  babel-preset-react@6.24.1
  babel-preset-stage-0@6.24.1
  babel-plugin-transform-async-to-generator@6.24.1 // async-await
  babel-plugin-transform-runtime@6.23.0 // async-await

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

4. .babelrc文件
```json
{
	"presets": [
		"es2015",
		"react",
		"stage-0"
	],
	"plugins": [
		["transform-runtime", {
			"helpers": false,
			"polyfill": false,
			"regenerator": true,
			"moduleName": "babel-runtime"
		}]
	]
}
```
5. redux-react的基本使用
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
**异步请求写法，引入react-thunk后，写法有所改变**
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
**combineReducers**
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
**connect**
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
**createStore**
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



## 二、项目开发 -首页tab页面(Home、Order、My、BottomBar组件) [/page/index/]
**一般来说组件内最外层div className和组件名一致**
1. BottomBar组件(首页底部tab栏) **[page/index/BottomBar/]**
2. react-router
**github搜react-router-dom**
- 依赖插件
```
- react-router-dom(web)
- react-router-redux
- history
```
- index.js入口文件 **(ConnectedRouter)**
```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Container from './Main/Container.jsx';
// react-router
import { store, history } from './store.js';
import { ConnectedRouter } from 'react-router-redux';
ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Container />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
```
- store.js **(createHistory routerMiddleware)**
```jsx
import { 
    createStore, 
    applyMiddleware 
} from 'redux';
import mainReducer from './reducers/main.js';
import thunk from 'redux-thunk';

/* react-router */
import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'

// 创建基于hash的history
const history = createHistory();
// 创建初始化tab
history.replace('home');
// 创建history的Middleware
const historyMiddl = routerMiddleware(history);
const store = createStore(
    mainReducer, 
    applyMiddleware(thunk,historyMiddl)
);
```
- reducers/Main.js **(routerReducer)** 
```js
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
const reducers = combineReducers({
    scrollViewReducer,
    tabReducer,
    categoryReducer,
    contentListReducer,
    orderReducer,
    router: routerReducer
});
```
- 组件中使用 **(Route, NavLink, withRouter)**
```jsx
import { Route, NavLink, withRouter } from 'react-router-dom';
import Order from '../Order/Order'
class Main extends React.Component {
    constructor(props) {
        super(props);

    }
		render(){
			<div>
			    {/* activeClassName设置当前路由下的类名 */}
			    <NavLink replace={true} to={"/" + item.key} activeClassName="active">
                        <div className="tab-icon"></div>
                        <div className="btn-name">{name}</div>
                </NavLink>
                <Route exact path="/home" component={Home}/>
                <Route path="/order" component={Order}/>
			</div>
		}
}
export default withRouter(connect(
	// state =>({
			
	// })
)(Main))
```
3. Home组件(首页tab) [page/index/Home/]
```jsx
		 <div>
		    /* SearchBar组件包含在Header里面 */
				<Header /> 
				<Category />
				<ContentList />
		</div>
```
- Header组件(顶部banner)  **[page/index/Home/Header/]**
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
- SearchBar组件(顶部搜索框) **[page/index/Home/SearchBar/]**
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
- Category组件(外卖类别) **[page/index/Home/Category/]**
```
- 分类item,使用float width:25%; 记得清除浮动
  .clearfix:after {
    content: " ";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
	}
- 每个，flex布局居中
```
**引入redux-thunk插件**
```js
// page/index/store.js文件
import { 
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
const store = createStore(
    mainReducer, 
    applyMiddleware(thunk)
)
module.exports = {
    store
}

// - actions
// 引入redux-thunk
export const getHeaderData = ()=> async (dispatch, getState) =>{
    let resp = await axios({
        method: 'get',
        url: './json/head.json',
    });

    dispatch({
        type: HEAD_DATA,
        obj: resp.data
    })
//   return {
//         type: HEAD_DATA,
//         obj: resp.data
//    }
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
)(Category)
```

- ContentList组件(附近商家列表) **[page/index/Home/ContentList/]**
```
- —— 附近商家——
  <h4 className="list-title">
			<span className="title-line"></span>
			<span>附近商家</span>
			<span className="title-line"></span>
	</h4>
	.list-title {
			text-align: center;
			font-size:px2rem(16px);
			.title-line {
				display: inline-block;
				border-bottom: 1px solid #949494;
				height: px2rem(1px);
				width: px2rem(30px);
			}
  }
  
```

- ListItem组件(列表单个组件) **[src/component/ListItem/]**
```
- 移动端实现1px像素 直接写1px会粗点
  用伪类
- 左边固定右边自适应
  父: display:flex;
	左子:width:100px;  右子:flex:1;
- 右边内容区域
  content:上下padding,左右margin
	里面其他地方(star count time distance)都是用float布局
- vertical-align 可调整上下位置
```
```css
/* 移动端实现0.5px像素 */
/* 直接写1px会粗点 */
/* ios8 以后 支持直接写 */
.scale-1px {
    position: relative;
    border: none;
}

.scale-1px:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
```
- ScrollView组件(滚动加载组件) **[src/component/ScrollView/]**
**(该项目滚动加载基于html body的  不用设置overflow)**
```
- 滚动加载
  scrollTop scrollHeight clientHeight
	scrollTop + clientHeight >= scrollHeight
```

- Loading组件 **[src/component/Loading/]**

- StarScore组件(评分star) **[src/component/StarScore/]**
```
- background-size 与 background-image配合用
  background-size: cover;
	background-image: url('./img/fullstar.png');
  
```
```jsx
/**
 * StarScore组件
 * @description <StarScore score={num}/> 
 */

class StarScore extends React.Component {
    /**
     * 渲染5颗星得分方法
     *  @param {*} data 
     */
    renderScore(){
        // Mock wm_poi_score = 4.2
        let wm_poi_score = this.props.score || '';
        let score = wm_poi_score.toString(); // 转字符串
        let scoreArray = score.split('.');
        // 满星个数
        let fullstar = parseInt(scoreArray[0]);
        // 半星个数
        let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
        // 0星个数
        let nullstar = 5 - fullstar - halfstar;
        let starjsx = [];

        // 渲染满星jsx
        for (let i = 0 ; i < fullstar ; i++) {
            starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
        }
        // 渲染满星jsx
        if (halfstar) {
            for (let j = 0 ; j < halfstar ; j++) {
                starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
            }
        }
        // 渲染0星jsx
        if (nullstar) {
            for (let k = 0 ; k < nullstar ; k++) {
                starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
            }
        }
        return starjsx;
    }
    render(){
        return <div className="star-score">{this.renderScore()}</div>;
    }
}
export default StarScore;
```
4. Order组件(订单tab) [page/index/Order/]
```
- 异步请求
    异步请求，没有setState()  建议在constructor里
    异步请求，有setState()    建议在componentDidMount里
```
- ListItem组件(订单列表单个组件) ** [page/index/Order/ListItem/]**
```
- 技巧:上下li connent盒子有间距 且区分颜色 
  border-top:10px;
- 盒子 一般上下padding 左右margin

- 圆形
  .item-img {
        width: px2rem(40px);
        height: px2rem(40px);
        margin-top: px2rem(8px);
        margin-left: px2rem(16px);
        border-radius: 50%;
   }
- 箭头 >(下面还有一种实现的方法)
  .arrow {
        width: px2rem(8px);
        height: px2rem(8px);
        border: 1px solid #999;
        border-width:  1px 1px 0 0;
        transform: rotate(45deg);
        -webkit-transform: 45deg;
    }

		

- 文字省略号
  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .two-line {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}
```
5. My组件(我的) ** [page/index/Order/ListItem/]**
```
- overflow: hidden; 解决header 子元素 margin-top穿透问题
- img 设置  display: block;
- 垂直居中
   	position: absolute;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
- 箭头 >(上面还有一种实现的方法)
  	li:after {
				content: '>';
				display: block;
				width: px2rem(16px);
				height: px2rem(16px);
				position: absolute;
				top: 0;
				right: px2rem(9px);
				color: #aaa;
		}
```
```scss
/*
	<ul className="items">
			<li className="address">
					收货地址管理
			</li>
			<li className="money">
					商家代金券
			</li>
	</ul>
	<ul className="items">
			<li className="email">
					意见反馈
			</li>
			<li className="question">
					常见问题
			</li>
	</ul>
*/
 li {
		height: px2rem(45px);
		font-size: px2rem(14px);
		line-height: px2rem(45px);
		position: relative;
		padding-left: px2rem(26px);
		margin-left: px2rem(15px);
		border-bottom: 1px solid #e4e4e4;
		&:last-child {
				border: none; // 最后一个元素
		}
		&:before {
				content: '';
				display: block;
				width: px2rem(16px);
				height: px2rem(16px);
				position: absolute;
				top: 50%;
				left: 1px;
				-webkit-transform: translateY(-50%);
				transform: translateY(-50%); // 垂直居中
				background-size: cover;
		}
		&:after {
				content: '>';
				display: block;
				width: px2rem(16px);
				height: px2rem(16px);
				position: absolute;
				top: 0;
				right: px2rem(9px);
				color: #aaa;
		}
}
.address {
		&:before {
				background-image: url('./img/address.png');
		}
}
.money {
		&:before {
				background-image: url('./img/money.png');
		}
}
.email {
		&:before {
				background-image: url('./img/email.png');
		}
}
.question {
		&:before {
				background-image: url('./img/question.png');
		}
}
```
## 三、项目开发 -分类页面(NavHeader、Header、ContentList组件) [/page/category/]
- redux-logger中间件(跟踪redux状态)
```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; // redux-logger
import mainReducer from './reducers/main.js';

const store = createStore(mainReducer, applyMiddleware(logger, thunk));
export default store
```
1. NavHeader组件(导航栏) **[/component/NavHeader/]**
```
- 左变back箭头 中间文字居中
  可以左absolute
```
2. Header组件(头部过滤) **[/page/category/Header/]**
```
- n个元素间用 | 等分
    .item {
        color: #2f2f2f;
        border-right: 1px solid #ddd; // 边框
        flex: 1; // flex
        &:last-child {
            border: none;
        }
    }

- 伪类 下箭头
    &.cate:after, &.type:after {
        content: '';
        display: inline-block; // inline-block
        width: px2rem(5px);
        height: px2rem(5px);
        margin-bottom: px2rem(2px);
        margin-left: px2rem(6px);
        border: 1px solid #666;
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -webkit-transition: .3s;
        transition: .3s;
    }
    // :not(.filter) 不包含
    &.current:not(.filter)::after {
        transform: rotate(225deg);
        -webkit-transform: rotate(225deg);
    }

- 伪类 加图标 background
    &.filter:after {
        content: '';
        display: inline-block;
        width: px2rem(12px);
        height: px2rem(12px);
        transform: rotate(0);
        background-image: url('./img/filter.png');
        background-size: cover;
    }

- 伪类 实现倒三角
    &:before {
        display: none; // none
        content: '';
        position: absolute; // 定位
        top: px2rem(23px);
        left: 49%;
        width: px2rem(7px);
        height: px2rem(7px);
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-width: 0 1px 1px 0;
        transform: rotate(225deg);
        -webkit-transform: rotate(225deg);
    }
    &.current:before {
        display: block; // block
    }

- 遮罩层
    // panel(bottom) ---遮罩层
    .panel {
        position: absolute;
        z-index: 1;
        left: 0;
        top: px2rem(105px);
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,0.7); 
        display: none; // none
        &.show {
            display: block; // block
        }
    }

- 盒子带文字 有边框 三等分(不用flex)
    // map
    <div key={index} className="cate-box"  onClick={} >
        <div className="cate-box-inner active">
            奶茶果汁 (166)
        </div>
    </div>
        .cate-box {
            float: left; // float
            width: 33.33%;
            padding: px2rem(10px); // padding
            box-sizing: border-box;
        }
        // 这里设置边框(宽度有父padding控制)
        .cate-box-inner {
            border: 1px solid #c4c4c4;
            text-align: center;
            height: px2rem(37px);
            line-height: px2rem(37px);
            position: relative;
            &.active {
            }
        }

- img设置 block+absolute,可方便布局
```
2. ContentList组件(附近商家列表)  **[/page/category/ContentList/]**

## 四、项目开发 -评论页面  [/page/evaluation/]
```
- star
    对齐 inline-block
    
- 监听输入法事件(compositionstart compositionend)
    <textarea 
        ref={(ref)=>{this.commentInput = ref}} 
        onChange={(e)=>this.onIuput(e.target.value)} 
        minLength="140" placeholder="" 
        className="comment-input">
    </textarea>

    componentDidMount(){
        this.commentInput.addEventListener('compositionstart', ()=>{
            this.chineseInputing = true;
        });
        this.commentInput.addEventListener('compositionend', (e)=>{
            this.chineseInputing = false;
            this.onIuput(e.target.value);
        });
    }
- 初始化滚动条
    // 初始化滚动条(该项目滚动加载基于html body的 不用设置overflow)
    componentDidUpdate(){
        console.log('scroll-componentDidUpdate')
        const top = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条的位置
        console.log('top:',top)
        if(document.documentElement.scrollTop){
            document.documentElement.scrollTop = 0
        }{
            document.body.scrollTop = 0
        }
    }
```

## 五、项目开发 -店铺详情页面  [/page/detail/]
1. NavHeader(导航栏) **[/component/NavHeader/]**
2. tab组件(头部tab) **[/page/detail/Main.Main.jsx]**
- tab(用伪类 实现active黄色横线)
```scss
// tab
.tab-bar {
    font-size: px2rem(16px);
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    margin-top: px2rem(64px); // navHeader fixed  64
    .tab-item {
        flex: 1; // flex:1
        height: px2rem(45px);
        line-height: px2rem(45px);
        position: relative;
        color: #666;
        text-align: center;
        text-decoration: none;
        &.active {
            &:after {
                content: '';
                display: block;
                height: 4px;
                width: 60px;
                position: absolute; // 用伪类 实现active黄色横线
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                background-color: #ffd161;
            }
        }
    }
}
```
2. Menu组件(点菜tab页面) 【MenuItem组件、shopBar组件】 **[/page/detail/Menu]**
```
- n行加省略号
    .one-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .two-line {
        display: -webkit-box;
        -webkit-line-clamp: 2;                    // 超过n行
        overflow: hidden; 
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
-  background-size  image   100% 100%;
    .plus {
        width: px2rem(25px);
        height: px2rem(25px);
        background-size: 100% 100%;               // size(100% 100%)
        background-image: url('./img/plus.png');
    }
```
- **chrome dev-tools插件(React Developer Tools、 Redux DevTools)**
**Redux DevTools需要配置**
```js
/* store.js */
// 创建history的Middleware
const historyMiddl = routerMiddleware(history)
const store = createStore(mainReducer,
     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk,
        historyMiddl
    )
)
```
- ShopBar组件(购物车) **[/page/detail/Menu/ShopBar/]**
```
- 把页面展示的内容都放在一个list里
  -/+ 及清空 数量，都改变list里的值，每次用替换的方式更新
  let _listData = JSON.parse(JSON.stringify(listData));

- 获取购物车信息
    render(){
        let data = this.getTotalPrice()
        // let { dotNum, totalPrice, chooseList } = data
        return (
            <div></div>
        )
    }

    // 类似计算属性 --返回 {dotNum,totalPrice,chooseList} 
    // 同时原引用对象中添加_outIndex，_index两个属性
    getTotalPrice(){
        let listData = this.props.listData.food_spu_tags || [];
        let totalPrice = 0;
        let dotNum = 0; // 购物车图标上的数字
        let chooseList = [];
        // 遍历
        for (let i = 0 ; i< listData.length ; i++) { // 总list
            let spus = listData[i].spus || [];
            for (let j = 0 ; j < spus.length ; j++) { // 对应left菜单的 rightList
                let chooseCount = spus[j].chooseCount;
                if (chooseCount > 0) {
                    dotNum += chooseCount; // 购物车total
                    spus[j]._index = j; // _index 关联 rightList item index索引
                    spus[j]._outIndex = i; // _outIndex 关联购物车里的 对应leftList index
                    chooseList.push(spus[j]); // 动态变化的购物车list
                    totalPrice += spus[j].min_price * chooseCount; // 计算属性
                }
            }
        }
        return {
            dotNum,
            totalPrice,
            chooseList
        }
    }
- 遍历(上述例子有 for.Each也行)
  
```
3. Comment组件(评价tab) **[/page/detail/Comment]**
```
- flex：1;自适应
    左右 没写with(靠内容撑起) ，middle flex:1; 也可以实现
    .left,right { display: flex;flex-direction: column; }
    .middle{ flex:1; }

- map中写逻辑(动态添加style属性 background)
    {imgs.map((item, index)=>{
        let src = item.url;
        let style = {
            backgroundImage: 'url(' + src + ')'
        }
        return <div key={index} className={'img-item'} style={style}></div>
    })}

- 处理时间(以秒为单位时间戳 == 2020.8.15)
    formatTime(time){
        // time   1529078400(以秒为单位)
        let date = new Date(Number(time + '000')); // 以毫秒

        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
        // 2020.8.15
    }
- 不使用伪类 加图片icon  background
    .like-info {
        margin-top: px2rem(4px);
        color: #576b95;
        font-size: px2rem(12px);
        line-height: px2rem(18px);
        background-image: url('./img/favor.png');  // url
        background-repeat: no-repeat;              // repeat(no-repeat)
        background-position: left 1px;             // position(left 1px)
        background-size: px2rem(12px) px2rem(12px);// size(12px 12px)
        padding-left: px2rem(20px);
    }
```

4. Restanurant组件(商家tab) **[/page/detail/Restanurant]**
```
- 使用伪类 写图片icon background
    &:before { // 伪类 写图片icon
        display: block; // display(block)
        content: ''; // content('')
        margin-right: px2rem(20px);
        width: px2rem(16px);
        height: px2rem(16px);
        background-size: cover; 
        
        width: px2rem(19px); // 这个可以单独设置
        background-image: url('./img/tel.png'); // 这个可以单独设置
    }
- 初始化滚动位置
    <div className="right-content">
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>  
    
    itemClick(index){
        document.querySelector('.right-content').scrollTop = 0
        

        /* 只有基于html body 滚动 才能这么写 */
        console.log('document.documentElement.scrollTop：',document.documentElement.scrollTop);
        if(document.documentElement.scrollTop){
            document.documentElement.scrollTop = 0
        }{
            document.body.scrollTop = 0
        }
    }
```

## 六、性能优化 
1. 组件懒加载(结合router)
**方式一 需要依赖包react-loadable**
```jsx
import React, { Suspense, lazy } from 'react'
import {  
    // BrowserRouter as Router, // 外层有ConnectedRouter
    Route, 
    withRouter, 
    Switch 
} from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

/** 组件懒加载方式1 */
import Loading from './Loading';
const Order1 = Loadable({
    loader: () => import(/* webpackChunkName: "order" */'../Order/Order'), // webpackChunkName: 加载出来js文件名
    loading: Loading, // 占位组件
});

const My1 = Loadable({
    loader: () => import(/* webpackChunkName: "my" */'../My/My'),
    loading: Loading,
});
/** 组件懒加载方式2 */
// 需要react16.6 以上版本
const Order2 = React.lazy(() => import(/* webpackChunkName: "order" */'../Order/Order') )
const My2 = React.lazy( () => import(/* webpackChunkName: "my" */'../My/My') )
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            // // 组件懒加载方式1 react16.6以前 
            // <div>
            //     <Switch>
            //         <Route exact path="/home" component={Home}/>
            //         <Route path="/order" component={Order1}/>
            //         <Route path="/my" component={My1}/>
            //         {/* <Route path="/my" getComponent={loadMy}/> */} {/* 早些写法 在react-router-dom 4之前的写法 */}
            //     </Switch>
            //     <BottomBar />

            // </div>
            // // 组件懒加载方式2   react 16.6以后才能用(当前16.2 ==> 16.6.3)
            <div>
                <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <Route exact path="/home" component={Home}/>
                        {/* bug --就是props需要通过函数返回而不是对象 */}
                        <Route path="/order" component={(props) => <Order2 {...props}/>}/>
                        <Route path="/my" component={(props)=><My2 {...props}/>}/>
                    </Switch>
                </Suspense> 
                <BottomBar />
            </div>
        )
    }
}
// export default connect(
//     state =>({
//         // key: state.tabReducer.num
//     })
// )(Main)
export default withRouter(connect(
    // state =>({
        
    // })
)(Main));
```
