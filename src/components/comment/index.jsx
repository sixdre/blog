import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDom from 'react-dom';
import './index.css'
import API from '../../api/api';
import { time } from '../../utils'
import CommentItem from './item'
let fcontnet;
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            cId: '',
            toId: ''
        }
        this.handleReply = this.handleReply.bind(this)
    }
    //获取评论列表
    getComments() {
        let id = this.props.articleId;
        API.getComments(id).then(res => {
            if (res.data.code === 1) {
                this.setState({
                    dataList: res.data.data
                })
            }
        })
    }
    componentDidMount() {
        this.getComments()
    }
    //评论回复
    handleReply = (item, cId,event) => {
        fcontnet = this.refs.content.value = '回复@' + item.from.username + ' ';
        this.setState({
            cId: cId,
            toId:item.from._id
        })
    }

    //发表评论
    handleSubmit = (type) => {
        var content = this.refs.content.value;
        if (type === 'reply') {
            content = content.replace(fcontnet,'');
        }
        let id = this.props.articleId;
        let data = {
            cId:  this.state.cId,
            toId: this.state.toId,
            content
        }
        API.submitComment(id, data).then(res => {
            if (res.data.code === 1) {
                alert('发表成功');
                this.getComments();
                this.refs.content.value = '';
                this.setState({
                    cId: '',
                    toId: ''
                })
            } else {
                alert(res.data.message);
            }
        })
    }

    cancleReply = () => {
        this.refs.content.value =' ';
        this.setState({
            cId: '',
            toId:''
        })
    }

    render() {
        var ToggleBtn=()=>{
            if (this.state.cId.length) {
                return (
                    <div>
                        <input type="button"  value="取消" onClick={this.cancleReply}/>
                        <input type="button" onClick={this.handleSubmit.bind(this,'reply')} value="回复" />
                    </div>
                )
            } else {
                return (
                    <input type="button" onClick={this.handleSubmit} value="提交" />
                )     
            }
        }
        return (
            <div className="comment-wrapper">
                <form id="comment_form" className="comment_form">
                    <div className="form-ceil form-user-avatar">
                        <img src="/images/noavatar_default.png" alt="" />
                    </div>
                    <div className="form-ceil form-content">
                        <div className="form-textarea">
                            <textarea ref="content" name="content" placeholder="说您想说"></textarea>
                        </div>
                        <div className="form-toolbars clearfix">
                            <div className="form-action">
                               {<ToggleBtn />}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="comment-area">
                    <ul className="list-unstyled">
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <CommentItem
                                        data={item}
                                        did={item._id}
                                        key={index}
                                        handleReply={this.handleReply}
                                    />
                                )
                            })
                        }    
                    </ul>    
                </div>
            </div>
        );
    }
}