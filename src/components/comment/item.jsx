import React, { Component } from 'react';
import { fromNow} from '../../utils'
import { Badge,Icon,Tooltip} from 'antd';
export default class Commentdata extends Component {
    handleReply = (data, event) => {
        var cId = this.props.data._id;
        this.props.handleReply(data,cId,event)
    }
    handleLike = (id, event)=>{
        this.props.handleLike(id)
    }
    handleRemove = (id) => {
        this.props.handleRemove(id)
    }
    render() {
        let data = this.props.data;
        let current_userId = this.props.current_userId;
        return (
            <li className="clearfix comment-item">
                <div className="avatar">
                    <img src={data.from.avatar} alt="" />
                </div>
                <div className="comment-main">
                    <div className="comment-header">
                        <span className="username">{data.from.username}</span>
                        <div className="comment-actions">
                            {current_userId === data.from._id ? (<a className="del" onClick={() => { this.handleRemove(data._id) }}>删除</a>):null}    
                            <Badge count={data.like_num}>
                                <a onClick={(event) => this.handleLike(data._id,event)}>
                                {data.isLike?<Tooltip title="您已点赞"><Icon type="like" style={{fontSize: 20,color:'red'}}/></Tooltip>:<Icon type="like-o" style={{fontSize: 20,color:'red'}}/>}
                            </a>  
                            </Badge>
                            <span className="pipe">|</span>
                            <a className="reply_a" onClick={(event) => this.handleReply(data,event)}>回复
                            </a>
                        </div>
                        <div className="comment-time">
                            <em>{fromNow(data.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                        </div>
                    </div>
                    <div className="comment-body">
                        <div className="comment-content">
                            {data.content}
                        </div>
                    </div>
                   
                    {
                        (data.reply && data.reply.length > 0) ? (
                            <ul className="reply_list">
                                {
                                    data.reply.map((item, i) => {
                                        return (
                                            <li className="clearfix comment-item" key={item._id}>
                                                <div className="avatar">
                                                    <img src={item.from.avatar} alt="" />
                                                </div>
                                                <div className="comment-main">
                                                    <div className="comment-header">
                                                        <span className="username">{item.from.username}</span>
                                                         <div className="comment-actions">
                                                            {current_userId === item.from._id ? (<a className="del" onClick={() => { this.handleRemove(item._id) }}>删除</a>):null}    
                                                            <Badge count={item.like_num}>
                                                                <a onClick={(event) => this.handleLike(item._id,event)}>
                                                                {item.isLike?<Tooltip title="您已点赞"><Icon type="like" style={{fontSize: 20,color:'red'}}/></Tooltip>:<Icon type="like-o" style={{fontSize: 20,color:'red'}}/>}
                                                            </a>  
                                                            </Badge>
                                                            <span className="pipe">|</span>
                                                            <a className="reply_a" onClick={(event) => this.handleReply(item,event)}>回复
                                                            </a>
                                                        </div>
                                                        <div className="comment-time">
                                                            <em>{fromNow(item.create_time, 'YYYY-MM-DD HH:mm:ss')}</em>
                                                        </div>
                                                    </div>
                                                    <div className="comment-body">
                                                        <div className="comment-content">
                                                           <span className="reply_user">{`@${data.from.username}`}</span> {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })  
                                }
                            </ul>
                        ): null
                    }
                </div>
            </li>
        )    
    }
}