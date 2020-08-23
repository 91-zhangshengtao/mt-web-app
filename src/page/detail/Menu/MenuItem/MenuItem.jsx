import './MenuItem.scss';

import React from 'react';

import { connect } from 'react-redux';

import { addSelectItem, minusSelectItem } from '../../actions/menuAction';
/**
 * 每个菜品的组件
 * @description <MenuItem />
 */
class MenuItem extends React.Component {
    /**
     * 添加菜品数量
     */
    addSelectItem(){
        this.props.dispatch(addSelectItem({
            index: this.props._index
        }));
    }
    /**
     * 减少菜品数量
     */
    minusSelectItem(){
        this.props.dispatch(minusSelectItem({
            index: this.props._index
        }));
    }
    render(){
        let item = this.props.data;
        return (
            <div className="menu-item">
                <img className="img" src={item.picture || 'http://p1.meituan.net/1440.590/codeman/d2ab674fa0e4c875865e524d82fe15a34372569.png'}/>
                <div className="menu-item-right">
                    <p className="item-title">{item.name}</p>
                    <p className="item-desc two-line">{item.description}</p>
                    <p className="item-zan">{item.praise_content}</p>
                    <p className="item-price">¥{item.min_price}<span className="unit">/{item.unit}</span></p>
                </div>
                <div className="select-content">
                    {item.chooseCount > 0 ? <div onClick={()=>this.minusSelectItem()} className="minus"></div>:null}
                    {item.chooseCount > 0 ? <div className="count">{item.chooseCount}</div> : null}
                    <div onClick={()=>this.addSelectItem()} className="plus"></div>
                </div>
            </div>
        );
    }
}

export default connect()(MenuItem);

