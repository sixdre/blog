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
        getMeArticleList({ limit: 10, page, type:"like" }).then(res => {
            if (res.data.code === 1) {
                if (res.data.data.length > 0) {
                    let articles = res.data.data;
                    this.setState({
                        articles
                    })
                } 
            }
           
        });
    }
    render() {
        return (
            <section>
                <ArticleList data={this.state.articles} />
            </section>
        );
    }
}

