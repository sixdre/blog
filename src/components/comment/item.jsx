import React, { Component } from 'react';
import { time } from '../../utils'
export default class CommentItem extends Component {
    handleReply = (item, event) => {
        var id = this.props.did;
        this.props.handleReply(item,id,event)
    }
    handleLike = (item, event)=>{
        this.props.handleLike(item)
    }
    render() {
        let item = this.props.data;
        return (
            <li className="clearfix comment-item">
                <div className="avatar">
                    <img src={item.from.avatar} alt="" />
                </div>
                <div className="comment-main">
                    {
                        this.props.status === 'reply' ? (
                            <div className="comment-header">
                                <span className="username">{item.from.username}</span>
                                <span>@</span>
                                <span className="username">{item.to.username}</span> 
                                <div className="comment-time">
                                   <em>{time(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                                </div>
                            </div> 
                        ) : (
                            <div className="comment-header">
                                <span className="username">{item.from.username}</span>
                                <div className="comment-time">
                                    <em>{time(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                                </div>
                            </div>
                        )
                    }
                    <div className="comment-body">
                        <div className="comment-content">
                            {item.content}
                        </div>
                    </div>
                    <div className="comment-footer clearfix">
                        <em>
                            <span className="zan" onClick={(event) => this.handleLike(item,event)}>
                                赞 {item.like_num===0?'':( <span className="nums">{item.like_num}</span>)}
                            </span>
                            <span className="pipe">|</span>
                            <span className="reply_a" onClick={(event) => this.handleReply(item,event)}>回复
                            </span>
                        </em>
                    </div>
                    <ul className="reply_list">
                        {
                            (item.reply && item.reply.length > 0) ? item.reply.map((rep, i) => {
                                return (
                                    <CommentItem
                                        data={rep}
                                        key={i}
                                        did={item._id}
                                        status={'reply'}
                                        handleReply={(event) => this.handleReply(rep, event)}
                                        handleLike={(event) => this.handleLike(rep, event)}
                                    />
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