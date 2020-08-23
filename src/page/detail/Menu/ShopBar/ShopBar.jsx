import './ShopBar.scss';

import React from 'react';

import { connect } from 'react-redux';

import { showChoose,addSelectItem,minusSelectItem, clearCar } from '../../actions/menuAction';

class ShopBar extends React.Component {
    /**
     * 获取总价
     */
    // 类似计算属性 --返回 {dotNum,totalPrice,chooseList} 
    // 同时原引用对象中添加_outIndex，_index两个属性
    getTotalPrice(){
        let listData = this.props.listData.food_spu_tags || [];
        let totalPrice = 0;
        let dotNum = 0; // 购物车图标上的数字
        let chooseList = [];

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
    /**
     * 添加菜品数量
     */
    addSelectItem(item){
        console.log('item._index,item._outIndex：',item._index,item._outIndex);
        
        this.props.dispatch(addSelectItem({
            index: item._index, // 关联 rightList item index索引
            outIndex: item._outIndex // 关联购物车里的 对应leftList index
        }));
    }
    /**
     * 减少菜品数量
     */
    minusSelectItem(item){
        this.props.dispatch(minusSelectItem({
            index: item._index,
            outIndex: item._outIndex
        }));
    }
    // 购物车 里选择的list
    renderChooseItem(data){
        let array = data.chooseList || [];
        return array.map((item, index)=>{
            return (
                <div key={index} className="choose-item">
                    <div className="item-name">{item.name}</div>
                    <div className="price">¥{item.min_price * item.chooseCount}</div>
                    <div className="select-content">
                        <div onClick={()=>this.minusSelectItem(item)} className="minus"></div>
                        <div className="count">{item.chooseCount}</div>
                        <div onClick={()=>this.addSelectItem(item)} className="plus"></div>
                    </div>
                    <span>{item._outIndex}-{item._index}</span>
                </div>
            )
        })
    }
    /**
     *  打开或隐藏购物车已选择列表
     */
    openChooseContent(){
        let flag = this.props.showChooseContent;
        this.props.dispatch(showChoose({
            flag: !flag
        }));
    }/**
     *  清空购物车(chooseCount = 0)
     */
    clearCar(){
        this.props.dispatch(clearCar());
        this.props.dispatch(showChoose({
            flag: false
        }));
    }
    render(){
        let shipping_fee = this.props.listData.poi_info ? this.props.listData.poi_info.shipping_fee : 0;
        let data = this.getTotalPrice();
        // let { dotNum, totalPrice, chooseList } = data
        return (
            <div className="shop-bar">
                {this.props.showChooseContent ? 
                    <div className="choose-content">
                        <div className="content-top">
                            <div onClick={()=>this.clearCar()} className="clear-car">清空购物车</div>
                        </div>
                        {this.renderChooseItem(data)}
                    </div>  : null  
                }
                <div className="bottom-content">
                    <div onClick={()=>this.openChooseContent()} className="shop-icon">
                        {data.dotNum > 0 ? <div className="dot-num">{data.dotNum}</div> : null}
                    </div>
                    <div className="price-content">
                        <p className="total-price">¥{data.totalPrice}</p>
                        <p className="other-price">另需配送&nbsp;¥{shipping_fee}</p>
                    </div>
                    <div className="submit-btn">去结算</div>
                </div>
            </div>
        );
    }
}

export default connect(
    state =>({
        listData: state.menuReducer.listData,
        showChooseContent: state.menuReducer.showChooseContent,
    })
)(ShopBar);

