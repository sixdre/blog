import React, { Component } from 'react';
import { Link, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import {Row, Col,message,Tabs,Spin,Button ,Pagination} from 'antd';
import XLayout from '../../components/layout';
import OwnerPage from './children/owner';
import WritePage from './children/write';
import InfoPage from './children/info';

import FollowsPage from './children/follows';
import FansPage from './children/fans';
import * as API from '../../api/api'
import './index.less';
import ArticleList from '../../components/articleList';

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
            fans_num:0,			//粉丝数量
            following_num:0,		//关注数量
            collect_art_num:0,	//收藏文章数量
            like_art_num:0, 		//喜欢文章数量
            like_num:0, 			//收获喜欢
            article_num: 0,			//发布文章数量
            
            article_page:1



        }

    }

    componentDidMount() {
        this.getInfo()
        this.getArticles()
    }

     //获取信息
    getInfo() {
        API.getMeInfo().then(res=>{
            if (res.data.code === 1) {
                this.setState({ ...res.data.data }); 
            }else {
                message.error('获取信息失败');
            }
        })
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
                    articles
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

    render() {
        let { username, avatar } = this.state.userInfo;
        let {following_num,fans_num,article_num,like_num} = this.state;
        return (
            <XLayout>
                <div className="container personal">
                    <Row>
                        <Col span={16} className="personal_left">
                            <div className="personal_top">
                                <Link className="avatar" to="/">
                                    <img src={avatar} alt={username}/>
                                </Link>
                                <div className="title">
                                    <Link className="username" to="/">{username}</Link>
                                </div>
                                <div className="info">
                                    <ul>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{following_num}</p>
                                                    关注 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{fans_num}</p>
                                                    粉丝 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{article_num}</p>
                                                    文章 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{like_num}</p>
                                                    收获喜欢 
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Tabs defaultActiveKey="article" size="small" onChange={this.onTabChange}>
                                <TabPane tab="文章" key="article">
                                    <ArticleList data={this.state.articles} loading={this.state.loading} empty="没有更多的数据"/>
                                    <div className="pagination">
                                        <Pagination current={this.state.article_page} onChange={(val) => { this.onPageChange(val, 'article') } } pageSize={ARTICLE_LIMIT} total={this.state.article_num}></Pagination>
                                    </div>
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
                        </Col>
                        <Col span={8}>8</Col>
                    </Row>    
                </div>
            </XLayout>
        );
    }
}

// <section className="personal_control">
//     <div className="left_aside">
//         <Link to="/">
//             回首页
//         </Link>	
//         <ul>
//             <li><NavLink activeClassName='active' to="/personal/write">写文章</NavLink></li>
//             <li><NavLink activeClassName='active' to="/personal/owner">我的文章</NavLink></li>
//             <li><NavLink activeClassName='active' to="/personal/follows">我关注的用户</NavLink></li>
//             <li><NavLink activeClassName='active' to="/personal/fans">我的粉丝</NavLink></li>
//             <li><NavLink activeClassName='active' to="/personal/info">个人信息</NavLink></li>
//         </ul>
        
//     </div>    
//     <div className="personal_right">
//         <Switch>
//             <Route path='/personal/write' component={WritePage} />    
//             <Route path='/personal/owner' component={OwnerPage} />    
//             <Route path='/personal/follows' component={FollowsPage} />    
//             <Route path='/personal/fans' component={FansPage} />    
//             <Route path='/personal/info' component={InfoPage} /> 
//             <Redirect exact from="/personal" to="/personal/info"/>
//         </Switch>
//     </div>  
// </section>