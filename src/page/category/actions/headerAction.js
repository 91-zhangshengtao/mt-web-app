import { CHANGE_TAB,GET_FILTER_DATA,CHANGE_FILTER } from './actionTypes';
import axios from 'axios';
// 改变头部tab
export const changeTab = (obj)=> (dispatch) =>{
    dispatch({
        type: CHANGE_TAB,
        obj: obj
    })
}
// header过滤-list
export const getFilterData = ()=> async (dispatch) =>{
    let resp = await axios({
        url: './json/filter.json',
        method: 'get'
    });
    dispatch({
        type: GET_FILTER_DATA,
        obj: resp.data
    })
}
// 改变过滤条件
export const changeFilter = (obj)=> (dispatch) =>{

    dispatch({
        type: CHANGE_FILTER,
        obj: obj
    })
    // 关闭遮罩层
    dispatch({
        type: CHANGE_TAB,
        obj: {
            closePanel: true
        }
    })
}
