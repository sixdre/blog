import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './404.less'
export default class NotFoundPage extends Component {
	render() {
		return(
			<div className="notfoud-container">
				<div className="img-404">
				</div>
				<p className="notfound-p">哎呀迷路了...</p>
				<div className="notfound-reason">
					<p>可能的原因：</p>
					<ul>
						<li>原来的页面不存在了</li>
						<li>我们的服务器被外星人劫持了</li>
					</ul>
				</div>
				<div className="notfound-btn-container">
					<Link className="notfound-btn" to="/">返回首页</Link>
				</div>
			</div>
		);
	}
}




