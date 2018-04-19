import React, { Component } from 'react';
import {message,Tabs ,Pagination,Modal} from 'antd';
import * as API from '../../../api/api'
import ArticleList from '../../../components/articleList';
import XLoding from '../../../components/loading'
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const ARTICLE_LIMIT = 5;

export default class PersonalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            isMe:false,
            articles: [],
            article_page: 1,
            article_total: 0,
            type:this.props.match.params.type
        }
    }
    componentWillReceiveProps(nextProps) {
        const type = nextProps.match.params.type;
        const userId = nextProps.match.params.id;
        if (userId !==this.state.userId||type !==this.state.type){
            this.setState({
                userId,
                type
            },()=>{
                this.getArticles();
            });
        }
    }
    componentDidMount() {
        this.getArticles()
    }

    getArticles() {
        let userId = this.state.userId;
        this.setState({
            loading:true,
        })
        let params = {
            limit: ARTICLE_LIMIT,
            page:this.state.article_page,
            type:this.state.type
        }
        API.getArticlesByUserId(userId,params).then(res => {
            if (res.data.code === 1) {
                let articles = res.data.data;
                this.setState({
                    isMe:res.data.isMe,
                    loading:false,
                    articles,
                    article_total:res.data.total
                })
                
            }
        });
    }

    onTabChange = (type) => {
        let userId = this.state.userId;
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
        this.props.history.push({
            pathname: `/users/${userId}/${type}`
        })
    }


    onPageChange = (val,type) => {
        this.setState({    
            article_page:val
        },()=>{
            this.getArticles()
        })
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
    }

    toggleCollect=(item)=> {
        let id = item._id;
        var ctx = this;
        if (!id) {
            return;
        }
        confirm({
            title:'确定取消收藏吗',
            okText:'确定',
            cancelText:'取消',
            onOk(){
                API.toggleCollect(id).then(res => {
                    if (res.data.code === 1) {
                        ctx.getArticles()
                        message.success('已取消收藏');
                    } else {
                        message.success('取消收藏失败');
                    }
                })
            },
            onCancel(){}
        })
        
    }

    toggleLike=(item)=> {
        let id = item._id;
        var ctx = this;
        if (!id) {
            return;
        }
        confirm({
            title:'确定删除?',
            okText:'确定',
            cancelText:'取消',
            onOk(){
                API.toggleLike(id).then(res => {
                    if (res.data.code === 1) {
                        ctx.getArticles()
                        message.success('操作成功');
                    } else {
                        message.success('失败');
                    }
                })
            },
            onCancel(){}
        })
        
    }

    render() {
        let isMe = this.state.isMe;
        return (
            <div>
                <Tabs activeKey={this.state.type} defaultActiveKey={this.state.type} size="small" onChange={this.onTabChange}>
                    <TabPane tab="收藏的文章" key="collect">
                    </TabPane>
                    <TabPane tab="喜欢的文章" key="like">
                    </TabPane>
                    <TabPane tab="评论的文章" key="comment">
                    </TabPane>
                </Tabs>
                <XLoding type="post" loading={this.state.loading}>
                    <ArticleList showLike={this.state.type==='like'&&isMe}  showCollect={this.state.type==='collect'&&isMe} collectFunc={this.toggleCollect} likeFunc={this.toggleLike} data={this.state.articles} empty="没有更多的数据"/>
                </XLoding>
                <div className="pagination">
                    <Pagination current={this.state.article_page} onChange={ this.onPageChange } pageSize={ARTICLE_LIMIT} total={this.state.article_total}></Pagination>
                </div>
            </div>    
        );
    }
}
