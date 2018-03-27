import React, { Component } from 'react';
import ArticleList from '../../components/articleList';
import Api from '../../api/api'
import Layout from '../../components/layout';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            categories: [],
            tags:[]
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
    getArticles() {
        Api.getArticleList({ limit: 20 }).then(res => {
            this.setState({
                articles: res.data.data
            })
        });
    }
    componentDidMount() {
        this.getArticles();
        // this.getCategoryList();
        // this.getTagList()
    }
    render() {
        return (
            <Layout>
                 <ArticleList data={this.state.articles} />
            </Layout>
        );
    }
}

