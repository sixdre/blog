import React, { Component } from 'react';
import { Spin } from 'antd';
import * as API from '../../api/api'
import './index.less';
import Comment from '../../components/comment';
import Layout from '../../components/layout';
import { time } from '../../utils'

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                author: {},
                nums:{}
            }
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
                d.nums.likeNum = res.data.count;
                this.setState( Object.assign({},this.state.article, d) )
            } else {
               
            }
        })
    }
    toggleCollect = () => {
        let id = this.props.match.params.id;
        API.toggleLike(id).then(res => {
            if (res.data.code === 1) {
                var d = this.state.article;
                d.nums.collectNum = res.data.count;
                this.setState( Object.assign({},this.state.article, d) )
            } else {
               
            }
        })
    }
    render() {
        return (
            <Layout>
                <div className="article_wrapper">
                    <article className="article">
                        <div className="article_head">
                            <h1 className="title">{this.state.article.title}</h1>
                            <p>
                                {time(this.state.article.create_time)} <span> 作者 </span>
                                {this.state.article.author.username}
                            </p>
                        </div>
                        <div className="article_body">
                            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.state.article.content }} />
                        </div>
                        <div>
                            <a onClick={this.toggleLike}>点赞 {this.state.article.nums.likeNum}</a>  
                            <a onClick={this.toggleCollect}>收藏 {this.state.article.nums.collectNum}</a>
                        </div>
                    </article>
                    {this.state.article.allow_comment === true ? <Comment articleId={this.props.match.params.id} /> : null}
                </div>    
            </Layout>
        );
    }
}

