import 'component/common.scss';

import React from 'react';

import { connect } from 'react-redux';

import { Route, withRouter } from 'react-router-dom';
// import Loadable from 'react-loadable';
import BottomBar from '../BottomBar/BottomBar';
import Home from '../Home/Home';


// import Loading from './Loading';

// const Order = Loadable({
//     loader: () => import(/* webpackChunkName: "order" */'../Order/Order'),
//     loading: Loading,
// });

// const My = Loadable({
//     loader: () => import(/* webpackChunkName: "my" */'../My/My'),
//     loading: Loading,
// });

class Main extends React.Component {
    constructor(props) {
        super(props);

    }
    // loadMy(location, cb){
    //     import(/* webpackChunkName: "my" */'../My/My').then((component)=>{
    //         cb(null, component.default);
    //     });
    // }
    render(){

        return (
            <div>
                <Home/>
                {/* <Route exact path="/home" component={Home}/> */}
                {/* <Route path="/order" component={Order}/> */}
                {/* <Route path="/my" component={My}/> */}
                <BottomBar />
            </div>
        );
    }
}

/* connect */
// 当前组件通过 this.props.key 就可以获取
export default connect(
    state =>({
        // key: state.tabReducer.num
    })
)(Main)
// export default withRouter(connect(
//     // state =>({
        
//     // })
// )(Main));