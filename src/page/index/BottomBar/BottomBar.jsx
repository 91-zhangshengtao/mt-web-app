import './BottomBar.scss';

import React from 'react';

import { connect } from 'react-redux';

import { NavLink, withRouter } from 'react-router-dom';

import { changeTab } from '../actions/tabAction';


/**
 * @constructor <BottomBar>
 * @description 首页底部tab栏
 */

class BottomBar extends React.Component {
    constructor(props) {
        super(props)
    }
    changeTab(item){
        // 路由push
        this.props.history.replace(item.key); // 'home'

        // // redux(dispatch)
        // this.props.dispatch(changeTab({
        //     activeKey: item.key
        // }));
    }
    renderItems(){
        // redux(reducer)
        let tabs = this.props.tabs

        // // mock
        // let tabs = [
        //     {
        //         name: '首页',
        //         key: 'home'
        //     },
        //     {
        //         name: '订单',
        //         key: 'order'
        //     },
        //     {
        //         name: '我的',
        //         key: 'my'
        //     }
        // ]
        // let activeKey = 'my'

        return tabs.map((item, index)=>{
            let cls = item.key + ' btn-item'
            let name = item.name

            return (
                // activeClassName设置当前路由下的类名
                <NavLink 
                    key={index} className={cls} replace={true} to={"/" + item.key} 
                    activeClassName="active" onClick={()=>this.changeTab(item)}
                >
                        <div className="tab-icon"></div>
                        <div className="btn-name">{name}</div>
                </NavLink>
                // <a
                //     key={index} className={cls} onClick={()=>this.changeTab(item)}
                // >
                //         <div className="tab-icon"></div>
                //         <div className="btn-name">{name}</div>
                // </a>

            )
        });
    }
    render(){
        return (
            <div className="bottom-bar">
                {this.renderItems()}
            </div>
        )
    }
}

export default withRouter(connect(
    state =>({
        tabs: state.tabReducer.tabs,
        activeKey: state.tabReducer.activeKey,
    })
)(BottomBar));
// export default connect(
//     state =>({
//         tabs: state.tabReducer.tabs,
//         activeKey: state.tabReducer.activeKey,
//     })
// )(BottomBar)