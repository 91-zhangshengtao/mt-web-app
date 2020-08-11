import { CHANGE_TAB } from '../actions/actionTypes.js';
import { TABKEY } from '../config.js';
// 初始值
const initState = {
    tabs: [
        {
            name: '首页',
            key: TABKEY.home
        },
        {
            name: '订单',
            key: TABKEY.order
        },
        {
            name: '我的',
            key: TABKEY.my
        }
    ],
    activeKey: TABKEY.my
};

// 切换底部tab栏
const changeTab = (state, action)=>{
    let activeKey = action.obj.activeKey;

    return { ...state, activeKey: activeKey };

};

/* reducer */
const tabReducer = (state = initState, action) => {

    switch(action.type) {
        case CHANGE_TAB: return changeTab(state, action);
        default: return state;
    }
};

export default tabReducer;