import { HEAD_DATA } from './actionTypes';
import axios from 'axios';

// 引入redux-thunk
export const getHeaderData = ()=> async (dispatch, getState) =>{
    let resp = await axios({
        method: 'get',
        url: './json/head.json',
    });

    dispatch({
        type: HEAD_DATA,
        obj: resp.data
    });
}
// export const getHeaderData = ()=> async () =>{
//     let resp = await axios({
//         method: 'get',
//         url: './json/head.json',
//     });

//     return {
//         type: HEAD_DATA,
//         obj: resp.data
//     }

// }