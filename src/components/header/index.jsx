import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import Nav from '../nav/';
import './index.less';
// import logoSrc from "../../images/logo.png"
import { connect } from 'react-redux'

function mapStateToProps (state) {
	return {
		username:state.user.username,
		avatar: state.user.avatar,
		userId: state.user.userId,
    }
}
function mapDispatchToProps(dispatch) {
  return {
    user_logout: () => dispatch({ type: 'LOGOUT'})
  }
}
@connect(mapStateToProps,mapDispatchToProps)
export default class headerTop extends Component {
	constructor(props) {
        super(props);
        this.state = {
            showMenu:false
        }
    }
	logout=()=>{
		this.props.user_logout()
	}
	// componentDidMount() {
	// 	window.document.body.onclick = (e) => {
	// 		this.setState({
	// 			showMenu:false
	// 		})
	// 	}
    // }
	toggleUserMenu = (e) => {
		let showMenu = this.state.showMenu;
		this.setState({
			showMenu:!showMenu
		})
		e.stopPropagation()
	}
	render() {
		const userId = this.props.userId;
		const dropdownMenu = (
			<div>
				<span>111</span>
			</div>
		)
		return(
			<header className="PageHeader">
				<div className="container">
					<Link to="/home" className="logo">
						<img  alt=""/>
					</Link>
					<Nav />
					<div className="header_right">
						{
							this.props.username ? (
								<div>
									<div className="user" onClick={(e) => { this.toggleUserMenu(e) }}>
										<div className="dropdown">
											<span className="user_avatar">
												<img className="avatar" width="25" height="25" src={this.props.avatar} alt={this.props.username} />
											</span>	
										</div>
										{this.state.showMenu ? (
											<ul className="dropdown_menu">
												<li><Link to={'/users/'+userId+'/info'}>主页</Link></li>	
												<li><Link to="/">设置</Link></li>
												<li><a onClick={this.logout}>退出</a></li>
											</ul>
										):null}
									</div>
									<Link to="/write">
										写文章
									</Link>	
								</div>	
							) : (
								<div>
									<Link to="/regist">注册</Link>		
									<Link to="/login">登录</Link>	
								</div>	
							)
						}	
					</div>
				</div>	
		    </header>
		);
	}
}

