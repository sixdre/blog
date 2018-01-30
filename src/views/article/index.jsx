import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Api from '../../api/api'
import './index.less';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article:{}
        }
        
    }
    componentDidMount(){
        this.getData()
    }
    getData() {
        let id = this.props.match.params.id;
        Api.getArticleDetail(id).then(res => {
             this.setState({
				article : res.data.data
			})
        })
    }
    render() {
		return(
            <div className="container-page">
                <div className="main_left">
                    <article className="article">
                        <div className="article_head">
                            <h1 className="title">{this.state.article.title}</h1>
                            <p>{this.state.article.create_time} - {this.state.article.author}</p>
                        </div>
                        <div className="article_body">
                            <div dangerouslySetInnerHTML={{ __html: this.state.article.tagcontent }}/>
                        </div>
                    </article>
                </div>
                <div className="main_right">
                    right
                </div>
            </div>
		);
	}
}

