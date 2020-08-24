import 'component/common.scss';

import React, { Suspense, lazy } from 'react'
import {  
    // BrowserRouter as Router, // 外层有ConnectedRouter
    Route, 
    withRouter, 
    Switch 
} from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import BottomBar from '../BottomBar/BottomBar';
import Home from '../Home/Home';

/* react-router loading */
// // 早些写法 在react-router-dom 4之前的写法 
// loadMy(location, cb){
//     import(/* webpackChunkName: "my" */'../My/My').then((component)=>{
//         cb(null, component.default);
//     });
// }

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

/* connect */
// // 当前组件通过 this.props.key 就可以获取
// export default connect(
//     state =>({
//         // key: state.tabReducer.num
//     })
// )(Main)
export default withRouter(connect(
    // state =>({
        
    // })
)(Main));