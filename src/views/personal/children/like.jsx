import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../../../components/articleList';
import {getMeArticleList} from '../.././../api/api'

export default class LikeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }
    componentWillMount() {
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
        this.getArticles()
      
    }
    getArticles(page = 1) {
        this.setState({
            loading:true,
        })
        getMeArticleList({ limit: 10, page, type:"like" }).then(res => {
            if (res.data.code === 1) {
                let articles = res.data.data;
                this.setState({
                    loading:false,
                    articles
                })
            }
        });
    }
    render() {
        return (
            <section>
                <ArticleList data={this.state.articles} loading={this.state.loading} empty="没有更多的数据"/>
            </section>
        );
    }
}

