 
import { CHANGE_TAB,GET_FILTER_DATA,CHANGE_FILTER } from '../actions/actionTypes';
import { TABKEY } from '../config';


let tabs = {};

tabs[TABKEY.cate] = {
    key: TABKEY.cate,
    text: '全部分类',
    obj: {}
};
tabs[TABKEY.type] = {
    key: TABKEY.type,
    text: '综合排序',
    obj: {}
};
tabs[TABKEY.filter] = {
    key: TABKEY.filter,
    text: '筛选',
    obj: {}
};

// 初始化state
const initState = {
    tabs: tabs,
    activeKey: TABKEY.cate,
    filterData: {},
    closePanel: true
}

// 改变头部tab
const changeTab = (state, action) => {
    return { ...state, activeKey: action.obj.activeKey, closePanel:action.obj.closePanel };
}
// header过滤-list
const getFilterData = (state, action) => {
    return { ...state, filterData: action.obj.data };
}
// 改变过滤条件
const changeFilter = (state, action) => {
    let _tabs = JSON.parse(JSON.stringify(state.tabs)); // 深拷贝(适合简单key value)
    _tabs[action.obj.key] = {
        key: action.obj.key,
        text: action.obj.item.name,
        obj: action.obj.item
    };
    return {...state, tabs: _tabs};
}

const headerReducer = (state = initState, action) => {
    switch(action.type) {
        case CHANGE_TAB: return changeTab(state, action);
        case GET_FILTER_DATA: return getFilterData(state, action);
        case CHANGE_FILTER: return changeFilter(state, action);
        
        default: return state;
    }
}

export default headerReducer;