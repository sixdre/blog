import React, { Component } from 'react';
import { connect } from 'react-redux'
import {message,Tabs ,Pagination,Modal,Upload,Icon} from 'antd';
import{getUserInfo,updateAvatar} from '../../../api/api'
import XLoding from '../../../components/loading'
import{getBase64} from '../../../utils'

const confirm = Modal.confirm;

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
           loading: false, 
        }
    }
    componentWillMount() {
        this.getUserInfo()
    }

    getUserInfo() {
        getUserInfo().then(res => {
            this.setState({
                userInfo:res.data.userInfo
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
                } else {
                     message.error((res.data.message));
                }
            })
        }
    }
    render() {
        const userInfo = this.state.userInfo;
        return (
            <div>
                <div>
                    <div className="upload_avatar">
                        <img src={userInfo.avatar} alt="" />
                        <input type="file" accept="image/*" onChange={(e) => { this.handleChange(e) }} />
                        {this.state.loading ? (
                            <div className="upload_loading">
                                <Icon type='loading' />
                            </div>
                        ):null}
                      
                    </div>    
                </div>
            </div>    
        );
    }
}
