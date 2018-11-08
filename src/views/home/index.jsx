import React, { Component } from 'react';
import { Spin,Row,Col,Icon } from 'antd';
import './index.less';
import ArticleList from '../../components/articleList';
import * as API from '../../api/api'
import XLayout from '../../components/layout';
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
            loading: false,
            categories:[],
            activeTab:''
        };
    }
    getArticles(page = 1,categoryId,type) {
        this.setState({
            loading:true
        })
        var timer;
        if (timer) {
            clearTimeout(timer)
        }
        API.getArticleList({ limit: 10, page,categoryId,type }).then(res => {
            if (res.data.code === 1) {
                // if (res.data.data.length > 0) {
                    let articles = res.data.data;
                    if (page === 1) {
                        let nomore = !res.data.data.length;
                        this.props.storeArticles({
                            articles,
                            page
                        })
                        this.setState({
                            nomore,
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
                  
                // } 
                // else {
                //     timer = setTimeout(() => {
                //         this.setState({
                //             nomore: true,
                //             loading:false
                //         })
                //     },200)
                // }
                
            }
           
        });
    }

    getCategories(){
        API.getCateAndTag().then(res => {
            if (res.data.code === 1) {
                let categories = res.data.data.categories;
                this.setState({
                    categories
                })
            }
        })
    }

    handleChangeTab(type){
        this.setState({
            nomore: false,
            loading: false,
            activeTab:type
        },()=>{
            if(type=='good'){
                this.getArticles(1,'','good')
                return ;
            }
            this.getArticles(1,type)
        })
    }

    handleGoodArticle(){
        this.setState({
            nomore: false,
            loading: false,
            categoryId:''
        },()=>{
            this.getArticles(1,'','good')
        })
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
        this.getCategories()
        if (!this.props.articles.length){
             this.getArticles();
        }
        window.addEventListener('scroll', this.loadMore);
    }

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const {categories,activeTab} = this.state;
        function checkTabActive(type){
            return activeTab == type?'tabLink active':'tabLink'
        }
        return (
            <XLayout>
                <div className="container">
                    <div className="view home">
                        <Row>
                            <Col span={16}>
                                <div className="tabCard">
                                    <ul className="tabList">
                                        <li className="tabItem">
                                            <a onClick={()=>{this.handleChangeTab('')}} className={checkTabActive('')}>推荐</a>
                                        </li>
                                        <li className="tabItem">
                                            <a onClick={()=>{this.handleChangeTab('good')}} className={checkTabActive('good')}>精华</a>
                                        </li>
                                        {
                                            categories.map((item, index) => {
                                                return (
                                                    <li className="tabItem" key={item._id}>
                                                        <a onClick={()=>{this.handleChangeTab(item._id)}} className={checkTabActive(item._id)} >{item.name}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                              
                                <ArticleList data={this.props.articles} empty=' '/>
                                <div style={{textAlign: 'center',height:'30px',marginTop:'30px' }}><Spin indicator={antIcon} tip="卖力的加载中..." spinning={this.state.loading} size="large"/></div>
                                <p className="nomore" >{this.state.nomore?'小站没有更多文章了^_^':''}</p>
                            </Col>
                            <Col span={7} offset={1}>aside</Col>
                        </Row>    
                    </div>    
                </div>
            </XLayout>
        );
    }
}

