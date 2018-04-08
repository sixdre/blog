import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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

	logout=()=>{
		this.props.user_logout()
	}
	render() {
		const userId = this.props.userId;
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
									<Link to={'/users/'+userId+'/info'}>
										<img className="avatar" width="25" height="25" src={this.props.avatar} alt={this.props.username} />
									</Link>	
									<Link to="/write">
										写文章
									</Link>	
									<span onClick={this.logout}>退出</span>		
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

