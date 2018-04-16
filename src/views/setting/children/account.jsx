import React, { Component } from 'react';
import { connect } from 'react-redux'
import {message,Tabs ,Pagination,Modal,Upload,Icon,Radio,Button,Input } from 'antd';
import{getUserInfo,updateAvatar,updateSetting} from '../../../api/api'
import XLoding from '../../../components/loading'
import{getBase64} from '../../../utils'

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('请上传小于2M的图片');
    }
    return isLt2M;
}


function mapStateToProps (state) {
    return {
        
    }
}
function mapDispatchToProps(dispatch) {
  return {
    set_avatar: (avatar) => dispatch({ type: 'SET_AVATAR',avatar })
  }
}
@connect(mapStateToProps,mapDispatchToProps)
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
           userInfo: {},
           setting:{}, 
           loading: false, 
           test:1,
        }
    }
    componentWillMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        getUserInfo().then(res => {
            this.setState({
                userInfo: res.data.userInfo,
                setting: res.data.userInfo.setting
            })
        })
    }
    handleChange = (e) => {
        var file = e.target.files[0]
        if (beforeUpload(file)) {
            var formData = new FormData();
            formData.append('avatar', file);
            this.setState({ loading: true });
            updateAvatar(formData).then(res => {
                if (res.data.code === 1) {
                    let userInfo = { ...this.state.userInfo, avatar: res.data.url };
                    this.props.set_avatar(res.data.url)
                    this.setState({
                        userInfo,
                        loading:false
                    })
                    message.success('头像更新成功');
                } else {
                     message.error(res.data.message);
                }
            })
        }
    }
    triggerClick=()=> {
        this.refs.file.click()
    }
    handleInput = (e) => {
        var newState = {};
        newState[e.target.name] = e.target.value;
        var obj = Object.assign(this.state.userInfo,newState)
        this.setState(obj);
    }
    onChange=(e,name)=> {
        var newState = {};
        newState[name] = e.target.value;
        var obj = Object.assign(this.state.setting,newState)
        this.setState(obj);
    }

    handleSave = () => {
        let data = {
            username:this.state.userInfo.username,
            setting:this.state.setting
            
        }
        updateSetting(data).then((res) => {
            if (res.data.code === 1) {
                message.success('更新成功');
            } else {
                message.error(res.data.message);
            }
        })
    }


    render() {
        const userInfo = this.state.userInfo;
        const { show_main } = this.state.setting;
        return (
            <div>
                <table className="account_setting_table">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td className="setting_title setting_avatar_title">头像</td>
                            <td>
                                <div className="upload_avatar" onClick={this.triggerClick}>
                                    <img src={userInfo.avatar} alt={userInfo.username} />
                                    <input type="file" ref="file" accept="image/*" onChange={(e) => { this.handleChange(e) }} />
                                    {this.state.loading ? (
                                        <div className="upload_loading">
                                            <Icon type='loading' />
                                        </div>
                                    ):null}
                                
                                </div>    
                            </td>
                        </tr>
                        <tr>
                            <td className="setting_title">用户名</td>
                            <td>
                                <input type="text" name="username" onInput={(e) => { this.handleInput(e) }} value={userInfo.username||''}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="setting_title">主页显示</td>
                            <td>
                                <RadioGroup onChange={(e) => { this.onChange(e,'show_main') }} value={show_main}>
                                    <Radio key="a" value={1}>所有用户都可访问</Radio>
                                    <Radio key="b" value={2}>仅限本人</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="primary" className="save_btn" onClick={this.handleSave}>保存</Button>
            </div>    
        );
    }
}
