import 'component/common.scss';
import React from 'react';

import { connect } from 'react-redux';


import NavHeader from 'component/NavHeader/NavHeader';
import Header from '../Header/Header';
import ContentList from '../ContentList/ContentList';


class Main extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){

        return (
            <div className="category">
                <NavHeader title="分类"/> {/* fixed   40*/} 
                <Header /> {/* header为了占位置 header-top/panel fixed  64 */}
                <ContentList /> {/* 45 + 15 */}
            </div>
        );
    }
}

export default connect(
    // state =>({
        
    // })
)(Main);