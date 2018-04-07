import React, { Component } from 'react';
import { Spin ,message,Tag} from 'antd';
import * as API from '../../api/api'
import './index.less';
import Comment from '../../components/comment';
import XLayout from '../../components/layout';
import { time } from '../../utils'

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {

            },
            isLikeAuthor:false
        }

    }
    componentDidMount () {
        this.getData()
    }
    getData() {
        let id = this.props.match.params.id;
        API.getArticleDetail(id).then(res => {
            if (res.data.code === 1) {
                this.setState({
                    article: res.data.data,
                    isLikeAuthor: res.data.isLikeAuthor
                })
                document.title = res.data.data.title
            } else {
               this.props.history.push('/404')
            }
        })
    }
    toggleLike = () => {
        let id = this.props.match.params.id;
        API.toggleLike(id).then(res => {
            if (res.data.code === 1) {
                var d = this.state.article;
                d.like_num = res.data.count;
                this.setState( Object.assign({},this.state.article, d) )
            } else {
               
            }
        })
    }
    toggleCollect = () => {
        let id = this.props.match.params.id;
        API.toggleCollect(id).then(res => {
            if (res.data.code === 1) {
                var d = this.state.article;
                d.collect_num = res.data.count;
                this.setState( Object.assign({},this.state.article, d) )
            } else {
               
            }
        })
    }
    toggleLikeUser=()=>{
        let userId = this.state.article.author._id;
        API.toggleLikeUser(userId).then(res => {
            if (res.data.code === 1) {
                if(res.data.isLike){
                    message.success('已关注');
                    this.setState({
                        isLikeAuthor: true
                    })
                }else{
                    message.warning('取消关注');
                    this.setState({
                        isLikeAuthor: false
                    })
                }
            } else {
                message.error(res.data.message);
            }
        })
    }



    render() {
        
        return (
            <XLayout>
                <div className="container">
                    <div className="article_wrapper">
                        <article className="article">
                            <div className="article_head">
                                <h1 className="title">{this.state.article.title}</h1>
                                <div className="article_info">
                                    <span>{time(this.state.article.create_time)}</span> 
                                    <span> 作者 </span>
                                    <span>{this.state.article.author_name}</span>
                                    <span>{this.state.isLikeAuthor?(<Tag onClick={this.toggleLikeUser}>已关注</Tag>):(<Tag onClick={this.toggleLikeUser} color="red">关注</Tag>)}</span>
                                </div>
                            </div>
                            <div className="article_body">
                                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.state.article.content }} />
                            </div>
                            <div className="like_collect">
                                <a onClick={this.toggleLike}>点赞 {this.state.article.like_num}</a>  
                                <a onClick={this.toggleCollect}>收藏 {this.state.article.collect_num}</a>
                            </div>
                        </article>
                        {this.state.article.allow_comment === true ? <Comment  articleId={this.props.match.params.id} /> : null}
                    </div>    
                </div>
            </XLayout>
        );
    }
}

