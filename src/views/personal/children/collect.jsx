import React, { Component } from 'react';
import { Link, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import {Row, Col,message,Tabs,Spin,Button ,Pagination} from 'antd';
import XLayout from '../../../components/layout';
import * as API from '../../../api/api'

import ArticleList from '../../../components/articleList';

const TabPane = Tabs.TabPane;
const ARTICLE_LIMIT = 5;

export default class PersonalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            article_page: 1,
            article_total: 0,
            type:'collect'
        }
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles() {
        this.setState({
            loading:true,
        })
        let params = {
            limit: ARTICLE_LIMIT,
            page:this.state.article_page,
            type:this.state.type
        }
        API.getMeArticleList(params).then(res => {
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

    onTabChange = (type) => {
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
        this.setState({    
            type: type,
            page:1
        },()=>{
            this.getArticles()
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

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={this.state.type} size="small" onChange={this.onTabChange}>
                    <TabPane tab="收藏的文章" key="collect">
                    </TabPane>
                    <TabPane tab="喜欢的文章" key="like">
                    </TabPane>
                </Tabs>
                <ArticleList data={this.state.articles} loading={this.state.loading} empty="没有更多的数据"/>
                <div className="pagination">
                    <Pagination current={this.state.article_page} onChange={ this.onPageChange } pageSize={ARTICLE_LIMIT} total={this.state.article_total}></Pagination>
                </div>
            </div>    
        );
    }
}
