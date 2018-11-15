import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown,Icon } from 'antd';
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
								<div className="user" onClick={(e) => { this.toggleUserMenu(e) }}>
									<div className="dropdown">
										<span className="avatar">
											<img src={this.props.avatar} alt={this.props.username} />
										</span>	
									</div>
									{this.state.showMenu ? (
										<ul className="dropdown_menu">
											<li><Link to={'/users/'+userId+'/info'}><Icon type="user" /> 主页</Link></li>	
											<li><Link to="/setting"><Icon type="setting" /> 设置</Link></li>
											<li><a onClick={this.logout}><Icon type="logout" /> 退出</a></li>
										</ul>
									):null}

									<Link className="btn write_btn" to="/write">
										写文章
									</Link>	
								</div>
							) : (
								<div className="userNoLogin">
									<Link className="btn log_in" to="/login">登录</Link>	
									<Link className="btn sign_up" to="/regist">注册</Link>		
								</div>	
							)
						}	
					</div>
				</div>	
		    </header>
		);
	}
}

