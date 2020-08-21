import './ScrollView.scss';

import React from 'react';

import Loading from 'component/Loading/Loading.jsx';


import { connect } from 'react-redux';

/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */

class ScrollView extends React.Component {
    constructor(props) {
        super(props);
        this._onLoadPage = this.onLoadPage.bind(this);
    }
    onLoadPage(){
        // 滚动加载
        // scrollTop + clientHeight >= scrollHeight
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        let proLoadDis = 30; // 预设值

        if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {

            // 父组件传入的
            if (!this.props.isend) {

                if (!this.props.readyToLoad) {
                    return;
                }
                this.props.loadCallback && this.props.loadCallback();
            }
            
        }
    }

    componentDidMount(){

        window.addEventListener('scroll', this._onLoadPage);
    }
    componentWillUnmount(){
        
        window.removeEventListener('scroll', this._onLoadPage);
    }
    // 初始化滚动条(该项目滚动加载基于html body的)
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
    render(){
        return (
            <div className="scrollview">
                {this.props.children}
                <Loading isend={this.props.isend}/>
            </div>
        );

    }
}


export default connect(
    state =>({
        readyToLoad: state.scrollViewReducer.readyToLoad,
    })
)(ScrollView);
