import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import { fromNow } from '../../utils'
export default class ArticleList extends Component {
    componentDidMount(){

    }
    render() {
        return (
            <div className="post_list">
            {
                this.props.data.map((item, index) => {
                    return (
                        <div className="post_item" key={index}>
                            <div className="post_header">
                                <Link to={'/article/'+ item._id}>
                                    <h1 className="topic_title">{item.title}</h1>
                                </Link>
                                <div className="topic_info">
                                    <img className="avatar" width="25" height="25" src={item.author.avatar} alt={item.author.username}/>
                                    <span> 发布于：{fromNow(item.create_time)}</span>
                                    <span> 分类：{item.category ? item.category.name : ''} </span>
                                    <span> 浏览：{item.nums.pv}</span>
                                    <span> 评论：{item.nums.cmtNum }</span>
                                </div>
                            </div>
                            <div className="post_body">
                                <p className="post_summary">
                                    {item.abstract}
                                </p>
                            </div>
                        </div>
                    )
                })
            }    
            </div>
		);
	}
}
