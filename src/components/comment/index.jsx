import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css'
import API from '../../api/api';
import { time } from '../../utils'
import CommentItem from './item'
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            cId: '',
            toId: ''
        }

        // this.handleChange = this.handleChange.bind(this)
        this.handleReply = this.handleReply.bind(this)
    }

    componentDidMount() {
        this.getComments()
    }

    // handleChange(e) {
    //     var newState = {};
    //     newState[e.target.name] = e.target.value;
    //     this.setState(newState);
    // }

    
    //评论回复
    handleReply=(item)=>{
        let id = this.props.articleId;
        let data = {
            cId: item._id,
            toId:item.from._id,
            content: this.refs.content.value,
        }
        API.submitComment(id, data).then(res => {
            if (res.data.code === 1) {
                alert('发表成功');
                this.getComments();
                this.refs.content.value = '';
            } else {
                alert(res.data.message);
            }
        })
    }

    //发表评论
    handleSubmit=()=> {
        let id = this.props.articleId;
        let data = {
            content: this.refs.content.value,
        }
        API.submitComment(id, data).then(res => {
            if (res.data.code === 1) {
                alert('发表成功');
                this.getComments();
                this.refs.content.value = '';
            } else {
                alert(res.data.message);
            }
        })
    }

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

    render() {
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
                                <input type="button" onClick={this.handleSubmit} value="提交" id="comment_submit" />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="comment-area">
                    <ul className="list-unstyled">
                        {
                            this.state.dataList.map((item, index) => {
                                return (
                                    <CommentItem data={item} key={index} handleReply={this.handleReply.bind(this,item)}/>
                                )
                            })
                        }    
                    </ul>    
                </div>
            </div>
        );
    }
}