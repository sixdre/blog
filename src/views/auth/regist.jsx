import React, { Component } from 'react';

import {regist} from '../../api/api';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:'',
            password:''
        }
    }
    handleChange=(e)=>{
        var newState = {};
        newState[e.target.name]=e.target.value;
        this.setState(newState);
    }
    regist=() =>{
        var { username, email , password } = this.state;
        regist(username,email, password).then(res => {
            if (res.data.code === 1) {
                alert('注册成功')
                this.props.history.push('/login')
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
                        邮箱 <input type="email" name="email" onChange={this.handleChange}/>
                    </div>
                    <div>
                        密码 <input type="text" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="button" onClick={this.regist}>注册</button>
                    </div>
                </form>
            </div>
		);
	}
}

