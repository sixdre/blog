import React, { Component } from 'react';
import Api from '../../api/api'
import './index.less';
import Comment from '../../components/comment';
import { time } from '../../utils'

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        }

    }
    componentDidMount () {
        this.getData()
    }
    getData() {
        let id = this.props.match.params.id;
        Api.getArticleDetail(id).then(res => {
            if (res.data.code == 1) {
                this.setState({
                    article: res.data.data
                })
                document.title = res.data.data.title
            } else {
               this.props.history.push('/404')
            }
        })
    }
    render() {
        return (
            <div>
                <article className="article">
                    <div className="article_head">
                        <h1 className="title">{this.state.article.title}</h1>
                        <p>{time(this.state.article.create_time)} By {this.state.article.author}</p>
                    </div>
                    <div className="ql-snow article_body">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: this.state.article.tagcontent }} />
                    </div>


                    <Comment articleId={this.props.match.params.id} />


                </article>
            </div>
        );
    }
}

