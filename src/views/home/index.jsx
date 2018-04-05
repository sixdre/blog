import React, { Component } from 'react';
import { Spin } from 'antd';
import './index.less';
import ArticleList from '../../components/articleList';
import * as API from '../../api/api'
import Layout from '../../components/layout';
import { loadMore } from '../../utils/';


import { connect } from 'react-redux'

function mapStateToProps (state) {
    return {
        articles: state.article.articles,
        page:state.article.page
    }
}
function mapDispatchToProps(dispatch) {
  return {
      storeArticles: (data) => dispatch({ type: 'STORE_ARTICLES',data })
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomore: false,
            loading: false
        };
    }
    getArticles(page = 1) {
        this.setState({
            loading:true
        })
        var timer;
        if (timer) {
            clearTimeout(timer)
        }
        API.getArticleList({ limit: 10, page }).then(res => {
            if (res.data.code === 1) {
                if (res.data.data.length > 0) {
                    let articles = res.data.data;
                    if (page === 1) {
                        this.props.storeArticles({
                            articles,
                            page
                        })
                        this.setState({
                            nomore: false,
                            loading:false
                        })
                    } else {
                        timer = setTimeout(() => {
                            this.props.storeArticles({
                                articles,
                                page
                            })
                            this.setState({
                                nomore: false,
                                loading:false
                            })
                        },200)
                    }
                  
                } else {
                    timer = setTimeout(() => {
                        this.setState({
                            nomore: true,
                            loading:false
                        })
                    },200)
                }
                
            }
           
        });
    }

    loadMore=()=> {
        let page = this.props.page;
        if (!this.state.nomore&&!this.state.loading) {
            loadMore(()=> {
                page++;
                this.getArticles(page)
            })
        }
    }
    componentWillMount() {
        window.onbeforeunload = function(){
            //刷新后页面自动回到顶部
            document.documentElement.scrollTop = 0;  //ie下
            document.body.scrollTop = 0;  //非ie
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMore)
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
    }
    componentDidMount() {
        if (!this.props.articles.length){
             this.getArticles();
        }
        window.addEventListener('scroll', this.loadMore);
    }

    render() {
        return (
            <Layout>
                <div className="home">
                    <ArticleList data={this.props.articles} />
                    <div style={{textAlign: 'center',height:'30px' }}><Spin spinning={this.state.loading}/></div>
                    <p className="nomore" >{this.state.nomore?'小站没有很多文章了^_^':''}</p>
                </div>    
            </Layout>
        );
    }
}

