import './Header.scss';


import React from 'react';

import SearchBar from '../SearchBar/SearchBar';

/**
 * @constructor <Header />
 * @description 顶部banner
 */

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="header">
                <SearchBar />
                <img className="banner-img" src="http://p1.meituan.net/1440.590/codeman/d2ab674fa0e4c875865e524d82fe15a34372569.png"/>
            </div>
        );
    }
}

export default Header;