import React, { Component } from 'react';

import Api from '../../api/api';
export default class Login extends Component {
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
        Api.login(username, password).then(res => {
            if (res.data.code == 1) {
                alert('登录成功')
                localStorage.setItem('token', res.data.token);
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

