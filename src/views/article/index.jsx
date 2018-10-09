import React, { Component } from 'react';
import { message,Tag,Badge,Icon,Tooltip} from 'antd';
import Highlight from 'react-highlight'
import QueueAnim from 'rc-queue-anim'
import * as API from '../../api/api'

import Comment from '../../components/comment';
import XLayout from '../../components/layout';
import { time } from '../../utils'

import './index.less';
import 'highlight.js/styles/atom-one-dark.css';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            isFollow:false,
            isLike:false,
            isCollect:false
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
                    isFollow: res.data.isFollow,
                    isLike: res.data.isLike,
                    isCollect: res.data.isCollect
                })
                document.title = res.data.data.title
            } 
        })
    }
    toggleLike = () => {
        let id = this.props.match.params.id;
        API.toggleLike(id).then(res => {
            if (res.data.code === 1) {
                this.setState({
                    isLike:res.data.isLike
                })
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
                this.setState({
                    isCollect:res.data.isCollect
                })
                var d = this.state.article;
                d.collect_num = res.data.count;
                this.setState( Object.assign({},this.state.article, d) )
            } else {
               
            }
        })
    }
    toggleFollow=()=>{
        let userId = this.state.article.author._id;
        API.toggleFollow(userId).then(res => {
            if (res.data.code === 1) {
                if(res.data.isFollow){
                    message.success('已关注');
                    this.setState({
                        isFollow: true
                    })
                }else{
                    message.warning('取消关注');
                    this.setState({
                        isFollow: false
                    })
                }
            } else {
                message.error(res.data.message);
            }
        })
    }



    render() {
        const pv = this.state.article.pv_num;
        
        return (
            <XLayout>
                <div className="container">
                    <div className="article_wrapper">
                        <QueueAnim >    
                            <article className="article" key="a">
                                <div className="article_head">
                                    <h1 className="title">{this.state.article.title}</h1>
                                    <div className="article_info">
                                        <Tooltip title={'最后编辑于'+time(this.state.article.update_time,'YYYY-MM-DD HH:mm:ss')}><span>发布于 {time(this.state.article.create_time)}</span> </Tooltip>
                                        <span> 作者：</span>
                                        <span>{this.state.article.author_name}</span>
                                        <span> {this.state.isFollow?(<Tag onClick={this.toggleFollow}>已关注</Tag>):(<Tooltip title="关注作者可以查看更多的文章"><Tag onClick={this.toggleFollow} color="red">关注</Tag></Tooltip>)}</span>
                                    </div>
                                </div>
                                <div className="article_body">
                                    <div className="markdown-body">
                                        <Highlight innerHTML={true}>
                                            {this.state.article.content}
                                        </Highlight>
                                    </div>
                                    {/* <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.state.article.content }} /> */}
                                </div>
                                <div className="like_collect">
                                    <Badge count={this.state.article.like_num}>
                                        <a onClick={this.toggleLike}>{this.state.isLike? <Tooltip title="已赞"><Icon type="heart" style={{fontSize: 20,color:'red'}}/></Tooltip>:<Tooltip title="喜欢就点赞把"><Icon type="heart-o" style={{fontSize: 20,color:'red'}}/></Tooltip>}</a>  
                                    </Badge>
                                    <Badge count={this.state.article.collect_num}>
                                        <a onClick={this.toggleCollect}>{this.state.isCollect?<Tooltip title="已收藏"><Icon type="star" style={{fontSize: 20,color:'red'}}/></Tooltip>:<Tooltip title="点击收藏"><Icon type="star-o" style={{fontSize: 20,color:'red'}}/></Tooltip>}</a>  
                                    </Badge>
                                </div>
                            </article>
                        </QueueAnim>
                        <div  >
                            {
                                this.state.article.allow_comment === true ?
                                    (<Comment pv={pv} articleId={this.props.match.params.id} />) : <div className="not_allow_cmt">该文章暂时无法评论</div>
                            }
                        </div>
                    </div>    
                </div>
            </XLayout>
        );
    }
}

