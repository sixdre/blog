import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import {message,Tabs,Spin,Button ,Pagination,Modal} from 'antd';
import * as API from '../../../api/api'

import ArticleList from '../../../components/articleList';

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

const ARTICLE_LIMIT = 5;
const FOLLOW_LIMIT = 5;
const FANS_LIMIT = 5;

export default class PersonalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            follows: [],
            fans:[],
            userInfo: {},
            article_num: 0,			//发布文章数量
            article_page: 1,
            article_total:0

        }

    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles(page = 1) {
        this.setState({
            loading:true,
        })
        API.getMeArticleList({ limit: ARTICLE_LIMIT, page}).then(res => {
            if (res.data.code === 1) {
                let articles = res.data.data;
                this.setState({
                    loading:false,
                    articles,
                    article_total:res.data.total
                })
            }
        });
    }

    getFollows(page = 1) {
        this.setState({
            loading:true,
        })
        API.getMeFollows({ limit:FOLLOW_LIMIT, page}).then(res => {
            if (res.data.code === 1) {
                let follows = res.data.data;
                this.setState({
                    loading:false,
                    follows
                })
            }
        });
    }

    getFans(page = 1) {
        this.setState({
            loading:true,
        })
        API.getMeFans({ limit: FANS_LIMIT, page}).then(res => {
            if (res.data.code === 1) {
                let fans = res.data.data;
                this.setState({
                    loading:false,
                    fans
                })
            }
        });
    }


    onTabChange = (type) => {
        if (type === 'article') {
            this.getArticles(1)
        } else if (type === 'following') {
            this.getFollows(1);
        } else if (type === 'fans') {
            this.getFans(1);
        } else {
            this.getArticles(1)
        }
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
    }

    onToggleFollow = (id) => {
        API.toggleFollow(id).then(res => {
            if (res.data.code === 1) {
                let data = this.state.follows.map(item => {
                    item.isFollow = res.data.isFollow;
                    return item;
                })
                 this.setState({
                    follows:data
                })
            } else {
                message.error(res.data.message);
            }
        })
    }

    onPageChange = (val,type) => {
        if (type === 'article') {
            this.setState({    
                article_page:val
            },()=>{
                this.getArticles(val)
            })
        } 
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
    }

    handleDel = (item) => {
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
                API.removeMeArticle(id).then(res => {
                    if (res.data.code === 1) {
                        ctx.getArticles()
                        message.success('删除成功,可在回收站中查看');
                    } else {
                        message.success('删除失败');
                    }
                })
            },
            onCancel(){}
        })
    }


    render() {
        const ArticleEmpty = (
            <div>您还没有发布文章 <Link to="/write">去发布</Link></div>
        )
        return (
            <div>
                <Tabs defaultActiveKey="article" size="small" onChange={this.onTabChange}>
                    <TabPane tab="文章" key="article">
                        <ArticleList showDel delFunc={this.handleDel} data={this.state.articles} loading={this.state.loading} empty={ArticleEmpty} />
                        {this.state.article_total>0?(<div className="pagination">
                            <Pagination current={this.state.article_page} onChange={(val) => { this.onPageChange(val, 'article') } } pageSize={ARTICLE_LIMIT} total={this.state.article_total}></Pagination>
                        </div>):null}
                    </TabPane>
                    <TabPane tab="我的关注" key="following">
                        <Spin spinning={this.state.loading}>  
                            <div className="user_list">
                                <ul>
                                    {
                                        this.state.follows.map((item, index) => { 
                                            return (
                                                <li key={index}>
                                                    <a className="avatar"><img src={item.avatar} alt={item.username} /></a>
                                                    <div className="info">
                                                        <a className="username">{item.username}</a>
                                                        <p className="signature">{item.email}</p>
                                                    </div>
                                                    <div className="following">
                                                        {
                                                            item.isFollow===false?(<Button className="not_following" icon="plus" onClick={(e) => { this.onToggleFollow(item._id) }}>
                                                                关注
                                                            </Button>):(<Button onClick={(e) => { this.onToggleFollow(item._id) }}>
                                                                已关注
                                                            </Button>)
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }    
                                </ul>
                            </div>
                        </Spin>
                        
                    </TabPane>
                    <TabPane tab="我的粉丝" key="fans">
                        <Spin spinning={this.state.loading}>    
                            <div className="user_list">
                                <ul>
                                    {
                                        this.state.fans.map((item, index) => { 
                                            return (
                                                <li key={index}>
                                                    <a className="avatar"><img src={item.avatar} alt={item.username} /></a>
                                                    <div className="info">
                                                        <a className="username">{item.username}</a>
                                                        <p className="signature">{item.email}</p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }    
                                </ul>
                            </div>
                        </Spin>
                    </TabPane>
                </Tabs>
            </div>    
        );
    }
}
