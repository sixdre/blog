import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Nav from '../nav/';
import './index.less';
import logoSrc from "../../images/logo.png"

export default class headerTop extends Component {
	render() {
		return(
			<header className="PageHeader">
				<div className="container">
					<Link to="/home" className="logo">
						<img src={logoSrc} alt=""/>
					</Link>
					<Nav/>
				</div>	
		    </header>
		);
	}
}

