import React, { Component } from 'react';
import { fromNow} from '../../utils'
import { Badge,Icon,Tooltip} from 'antd';
export default class CommentItem extends Component {
    handleReply = (item, event) => {
        var id = this.props.did;
        this.props.handleReply(item,id,event)
    }
    handleLike = (item, event)=>{
        this.props.handleLike(item)
    }
    handleRemove = (id) => {
        this.props.handleRemove(id)
    }
    render() {
        let item = this.props.data;
        let current_userId = this.props.current_userId;
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
                                   <em>{fromNow(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                                </div>
                            </div> 
                        ) : (
                            <div className="comment-header">
                                <span className="username">{item.from.username}</span>
                                <div className="comment-time">
                                    <em>{fromNow(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
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
                            {current_userId === item.from._id ? (<a className="del" onClick={(e) => { this.handleRemove(item._id) }}>删除</a>):null}    
                            <Badge count={item.like_num}>
                                <a onClick={(event) => this.handleLike(item,event)}>
                                {item.isLike?<Tooltip title="您已点赞"><Icon type="like" style={{fontSize: 20,color:'red'}}/></Tooltip>:<Icon type="like-o" style={{fontSize: 20,color:'red'}}/>}
                            </a>  
                            </Badge>
                            <span className="pipe">|</span>
                            <a className="reply_a" onClick={(event) => this.handleReply(item,event)}>回复
                            </a>
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
                                        current_userId={current_userId}
                                        handleReply={(event) => this.handleReply(rep, event)}
                                        handleLike={(event) => this.handleLike(rep, event)}
                                        handleRemove={(event) => this.handleRemove(rep, event)}
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