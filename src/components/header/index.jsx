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
					<div className="header_right">
						<Link to="/regist">注册</Link>		
						<Link to="/login">登录</Link>	
						<Link to="/login">
							<img className="avatar" width="25" height="25" src="https://sfault-avatar.b0.upaiyun.com/161/227/1612276764-55f6bdd353b39_big64" alt=""/>
						</Link>	
					</div>
				</div>	
		    </header>
		);
	}
}

