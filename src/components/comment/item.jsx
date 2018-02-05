import React, { Component } from 'react';
import { time } from '../../utils'
export default class CommentItem extends Component {
    handleReply=(item)=> {
        this.props.handleReply(item)
    }
    render() {
        let item = this.props.data;
        return (
            <li className="clearfix comment-item">
                <div className="avatar">
                    <img src="/images/noavatar_default.png" alt="" />
                </div>
                <div className="comment-main">
                    <div className="comment-header">
                        <span className="username">{item.from.username}</span>
                        <div className="comment-time">
                            发表于<em>{time(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                        </div>
                    </div>
                    <div className="comment-body">
                        <div className="comment-content">
                            {item.content}
                        </div>
                    </div>
                    <div className="comment-footer clearfix">
                        <em>
                            <span href="javascript:;" className="zan">
                                顶<span className="nums">{item.likes.length}</span>
                            </span>
                            <span className="pipe">|</span>
                            <span className="reply_a" onClick={this.handleReply.bind(this,item)}>回复
                            </span>
                        </em>
                    </div>
                    <ul>
                        {
                            (item.reply&&item.reply.length > 0) ? item.reply.map((rep, i) => {
                                return (
                                    <CommentItem data={rep} key={i} handleReply={this.handleReply.bind(this,item)}/>
                                )
                            })
                            :''    
                        }
                    </ul>
                </div>
            </li>
        )    
    }
}