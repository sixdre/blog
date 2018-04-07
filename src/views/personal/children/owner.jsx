import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../../components/articleList';
import {getMeArticleList} from '../.././../api/api'
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

const ArticleTypes = [{
    name:'我的文章',
    value:'all'
},{
    name:'我收藏的文章',
    value:'collect'
},{
    name:'我喜欢的文章',
    value:'like'
},{
    name:'我评论的文章',
    value:'comment'
}]


export default class OwnerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            type:'all'
        };
    }
    componentWillMount() {
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
        this.getArticles()
      
    }
    getArticles(page = 1,type='all') {
        this.setState({
            loading:true,
        })
        getMeArticleList({ limit: 10, page,type}).then(res => {
            if (res.data.code === 1) {
                let articles = res.data.data;
                this.setState({
                    loading:false,
                    articles
                })
            }
        });
    }

    onTabChange=(type)=>{
        this.getArticles(1,type)
        this.setState({
            type
        })
    }

    render() {
        const ArticleTab = ()=>{
            return (
                <Tabs activeKey={this.state.type} defaultActiveKey='all' onChange={this.onTabChange}>
                    {ArticleTypes.map((item,index)=>{
                        return (
                            <TabPane tab={item.name} key={item.value}>
                            </TabPane>
                        ) 
                    })}
                </Tabs>
            )
        }
        return (
            <section>
                <ArticleTab/>
                <ArticleList data={this.state.articles} loading={this.state.loading} empty="没有更多的数据"/>
            </section>
        );
    }
}

