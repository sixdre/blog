import React, { Component } from 'react';
import ArticleList from '../../components/articleList';
import Api from '../../api/api'
import Layout from '../../components/layout';
import { loadMore } from '../../utils/';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            categories: [],
            tags: [],
            nomore:false
        };
    }
    getCategoryList() {
        Api.getCategoryList({ type: 'group' }).then(res => {
            this.setState({
                categories: res.data.data
            })
        });
    }
    getTagList() {
        Api.getTagList({ type: 'group' }).then(res => {
            this.setState({
                tags: res.data.data
            })
        });
    }
    getArticles(page=1) {
        Api.getArticleList({ limit: 10, page }).then(res => {
            if (res.data.code == 1) {
                if (res.data.data.length > 0) {
                    let articles = this.state.articles.concat(res.data.data);
                    this.setState({
                        articles: articles,
                        nomore:false
                    })
                } else {
                    this.setState({
                        nomore: true
                    })
                }
                
            }
           
        });
    }
    componentDidMount() {
        let page = 1;
        this.getArticles();
        loadMore(() => {
            if (!this.state.nomore) {
                page++;
                this.getArticles(page)
            }
        })
        // this.getCategoryList();
        // this.getTagList()
    }
    render() {
        return (
            <Layout>
                <ArticleList data={this.state.articles} />
                <p className="nomore">{this.state.nomore?'没有更多数据了':''}</p>
            </Layout>
        );
    }
}

