import React, { Component } from 'react';

import {login} from '../../api/api';
import { connect } from 'react-redux'

function mapStateToProps (state) {
    return {
        username: state.user.username
    }
}
function mapDispatchToProps(dispatch) {
  return {
    user_login: (username,token,avatar) => dispatch({ type: 'LOGIN',username,token,avatar })
  }
}
@connect(mapStateToProps,mapDispatchToProps)
export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
    }
    handleChange(e){
        var newState = {};
        newState[e.target.name]=e.target.value;
        this.setState(newState);
    }
    login() {
        var { username, password } = this.state;
        login(username, password).then(res => {
            if (res.data.code === 1) {
                alert('登录成功')
                this.props.user_login(username, res.data.token, res.data.userInfo.avatar);
                this.props.history.push('/')
            } else {
                alert(res.data.message)
            }
        })
    }

	render() {
		return(
            <div>
                <form>
                    <div>
                        用户名 <input type="text" name="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        密码 <input type="text" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="button" onClick={this.login}>登录</button>
                    </div>
                </form>
            </div>
		);
	}
}


