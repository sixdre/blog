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
            categoryId:''
        };
    }
    getArticles(page = 1,categoryId) {
        this.setState({
            loading:true
        })
        var timer;
        if (timer) {
            clearTimeout(timer)
        }
        API.getArticleList({ limit: 10, page,categoryId }).then(res => {
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

    handleChangeCategory(id){
        this.setState({
            nomore: false,
            loading: false,
            categoryId:id
        },()=>{
            this.getArticles(1,id)
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
        const {categories,categoryId} = this.state;
        function checkCateActive(cateId){
            return String(categoryId)==String(cateId)?'tab_item active':'tab_item'
        }
        return (
            <XLayout>
                <div className="container">
                    <div className="home">
                        <Row>
                            <Col span={16}>
                                <div className="cate_tab">
                                    <span onClick={()=>{this.handleChangeCategory('')}} className={checkCateActive('')}>全部</span>
                                    {
                                        categories.map((item, index) => {
                                            return (
                                                <span onClick={()=>{this.handleChangeCategory(item._id)}} className={checkCateActive(item._id)} key={item._id}>{item.name}</span>
                                            )
                                        })
                                    }
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

