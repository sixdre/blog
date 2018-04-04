import React, { Component } from 'react';
import './index.css'
import * as API from '../../api/api';
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
    }
    componentDidMount() {
        this.getComments()
    }

    //获取评论列表
    getComments() {
        let id = this.props.articleId;
        API.getComments(id,{order_by:'timeRev'}).then(res => {
            if (res.data.code === 1) {
                this.setState({
                    dataList: res.data.data
                })
            }
        })
    }

    //评论回复
    handleReply = (item, cId) => {
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

    //点赞
    handleLike = (item) => {
        let id = item._id;
        API.addCommentLike(id).then(res => {
            if (res.data.code === 1) {
                alert(res.data.message)
                this.getComments();
            } else {
                alert(res.data.message)
            }
        })
    }

    //取消回复
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
                               <ToggleBtn />
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
                                        handleLike={this.handleLike}
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