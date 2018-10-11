import React, { Component } from 'react';
import querystring from 'querystring'
import { Row, Col } from 'antd';
import {login} from '../../api/api';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { time } from '../../utils/';
import './login.less'

function mapStateToProps (state) {
    return {
        username: state.user.username
    }
}
function mapDispatchToProps(dispatch) {
  return {
    user_login: (arg) => dispatch({ type: 'LOGIN',...arg })
  }
}
@connect(mapStateToProps,mapDispatchToProps)
export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            focus:''
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
        var redirectUrl = querystring.parse(this.props.location.search)['?redirectUrl'];
        login(username, password).then(res => {
            if (res.data.code === 1) {
                alert('登录成功')
                this.props.user_login({
                    username,
                    token:res.data.token, 
                    avatar:res.data.userInfo.avatar,
                    userId:res.data.userInfo._id
                });
                if (redirectUrl) {
                    this.props.history.push(redirectUrl)
                } else {
                    this.props.history.push('/')
                }
            } else {
                alert(res.data.message)
            }
        })
    }

    changeFocus(name){
        this.setState({
            focus:name
        });
    }

	render() {
		return(
            <div className='modal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-wrapper">
                                <Row>
                                    <Col span={12}>
                                        <div className="form-column-wrap-image">
                                            <div className="form-inner-wrapper">
                                                <h2>登录</h2>
                                                <p>如果你有帐户，然后登录。否则，首先创建您的帐户。</p>
                                                <p>第三方登录</p>
                                                <div className="temp-anchor-wrap ">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="temp-form-column-wrap">
                                            <h2>登录</h2>
                                            <form>
                                                <div className="form-group">
                                                    <span className={["temp-span-wrap temp-span-input-label-wrap", (this.state.focus=='username'||this.state.username)?"input--filled":''].join(' ')}>
                                                        <input className="temp_input_field" onBlur={()=>{this.changeFocus('')}} onFocus={()=>{this.changeFocus('username')}} type="text" name="username" onChange={this.handleChange}/>
                                                        <label className="temp_input_label">
                                                            <span className="temp_input_label-content">用户名</span>
                                                        </label>
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <span className={["temp-span-wrap temp-span-input-label-wrap", (this.state.focus=='password'||this.state.password)?"input--filled":''].join(' ')}>
                                                        <input className="temp_input_field" onBlur={()=>{this.changeFocus('')}} onFocus={()=>{this.changeFocus('password')}} type="text" name="password" onChange={this.handleChange}/>
                                                        <label className="temp_input_label">
                                                            <span className="temp_input_label-content">密码</span>
                                                        </label>
                                                    </span>
                                                </div>
                                                <div className="temp-login-button-wrap">
                                                    <button className="btn btn-info temp-form-button" onClick={this.login} type="button">提交登录</button>
                                                </div>
                                            </form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}


