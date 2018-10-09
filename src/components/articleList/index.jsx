import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Spin,Tag } from 'antd';
import './index.less';
import { fromNow } from '../../utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function mapStateToProps (state) {
    return {
        
    }
}
function mapDispatchToProps(dispatch) {
  return {
      updatePv: (id) => dispatch({ type: 'UPDATE_PV',id }),
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class ArticleList extends Component {

    static propTypes = {
        data: PropTypes.array,
        showLike:PropTypes.bool,
        showCollect:PropTypes.bool,
        showEdit:PropTypes.bool,
        showDel: PropTypes.bool,
        likeFunc: PropTypes.func,
        collectFunc: PropTypes.func,
        editFunc: PropTypes.func,
        delFunc:PropTypes.func
    }
    static defaultProps = {
        showLike:false,
        showCollect: false,
        showEdit: false,
        showDel:false
    }

    handleFunc=(type,item)=>{
        if (type === 'collect') {
            if (this.props.collectFunc) {
                this.props.collectFunc(item)
            }
        } else if (type === 'like') {
            if (this.props.likeFunc) {
                this.props.likeFunc(item)
            }
        } else if (type === 'edit') {
            if (this.props.editFunc) {
                this.props.editFunc(item)
            }
        } else if (type === 'del') {
            if (this.props.delFunc) {
                this.props.delFunc(item)
            }
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    updatePv=(id)=> {
        this.props.updatePv(id)
    }
    render() {
        function transNum(num){
            return num/1000>1?(num/1000).toFixed(1)+'k':num;
        }

        let loading = this.props.loading?this.props.loading:false;
        let PostList = ()=>{
            if(!loading){
                if(!this.props.data.length||!this.props.data){
                    return <div>{this.props.empty?this.props.empty:'暂无数据'}</div>
                }
            }
            return <div className="post_list">
                {
                this.props.data.map((item, index) => {
                    return (
                        <div className="post_item" key={index}>
                            <div className="post_header">
                                <Link to={'/article/' + item._id} onClick={() => { this.updatePv(item._id) }}>
                                    <h1 className="topic_title">
                                        {item.top ? <i className="post_badges">置顶</i>:''} 
                                        {item.good ? <i className="post_badges">精华</i>:''} 
                                        {item.title}
                                    </h1>
                                </Link>
                            </div>
                            {
                                item.abstract?(
                                    <div className="post_body">
                                        <p className="post_summary">
                                            {item.abstract}
                                        </p>
                                    </div>):''
                            }
                            <div className="post_footer">
                                <div className="topic_info">
                                    <Link to={'/users/'+item.author._id+'/info'}><img className="avatar" width="25" height="25" src={item.author.avatar} title={item.author.username} alt={item.author.username}/></Link>    
                                    <span> 发布于：{fromNow(item.create_time)}</span>
                                    <span> 分类：<Tag>{item.category_name} </Tag></span>
                                    <span> 浏览：{transNum(item.pv_num)}</span>
                                    <span> 评论：{transNum(item.cmt_num)}</span>
                                    {this.props.showLike ? <span className="handle_span" onClick={() => { this.handleFunc('like',item) }}>取消喜欢</span> : null}
                                    {this.props.showCollect ? <span className="handle_span" onClick={() => { this.handleFunc('collect',item) }}>取消收藏</span> : null}
                                    {this.props.showEdit ? <span className="handle_span" onClick={() => { this.handleFunc('edit',item) }} >编辑</span> : null}
                                    {this.props.showDel ? <span className="handle_span" onClick={() => { this.handleFunc('del',item) }}>删除</span>:null}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        }

        return (
            <Spin spinning={loading}>
                <PostList />
            </Spin>
		);
	}
}
