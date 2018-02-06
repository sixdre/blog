import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/';
import './index.less';
// import logoSrc from "../../images/logo.png"

export default class headerTop extends Component {
	render() {
		return(
			<header className="PageHeader">
				<div className="container">
					<Link to="/home" className="logo">
						<img  alt=""/>
					</Link>
					<Nav />
					<div style={{ float: "right" }}>
						<Link to="/regist">注册</Link>		
						<Link to="/login">登录</Link>	
					</div>
				</div>	
		    </header>
		);
	}
}

