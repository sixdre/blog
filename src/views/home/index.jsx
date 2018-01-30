import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import ArticleList from '../../components/articleList';
import Api from '../../api/api'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {articles: []};
    }
   
    getArticles() {
        Api.getArticleList({limit:20}).then(res => {
            this.setState({
				articles : res.data.data
			})
        });
    }
    componentDidMount(){
		this.getArticles()
	}
    render() {
		return(
            <div className="container-page">
                <div className="main_left">
                    <section className="banner_container">
                        <img width="100%" src="" alt=""/>
                    </section>
                    <ArticleList data={this.state.articles}/>
                </div>
                <div className="main_right">
                    right
                </div>
            </div>
		);
	}
}

