import React, { Component } from 'react';
import ArticleList from '../../components/articleList';
import Api from '../../api/api'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
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
    }
    render() {
        return (
            <ArticleList data={this.state.articles} />
        );
    }
}

