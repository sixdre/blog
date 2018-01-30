import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './index.less';

export default class Nav extends Component {
	render() {
		return(
			<nav className="header-nav" id="navbar">
              	<div className="menu-container">
                  	<ul>
                  		<li>
                  			<Link to="/home">首页</Link>
                  		</li>
                  		<li>
                  			<Link to="/tags">标签</Link>
                  		</li>
                  	</ul>
              	</div>
            </nav>
		);
	}
}
