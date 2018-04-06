import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import './index.less';
import { fromNow } from '../../utils'
import { connect } from 'react-redux'


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
    componentDidMount(){

    }
    updatePv=(id)=> {
        this.props.updatePv(id)
    }
    render() {
        let loading = this.props.loading?this.props.loading:false;
        let PostList = ()=>{
            if(!loading){
                if(!this.props.data.length||!this.props.data){
                    return <p>{this.props.empty?this.props.empty:'暂无数据'}</p>
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
                                        {item.title}
                                        {item.good ? <i className="post_badges">精华</i>:''} 
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
                                    <img className="avatar" width="25" height="25" src={item.author.avatar} title={item.author.username} alt={item.author.username}/>
                                    <span> 发布于：{fromNow(item.create_time)}</span>
                                    <span> 分类：{item.category_name} </span>
                                    <span> 浏览：{item.pv_num}</span>
                                    <span> 评论：{item.cmt_num }</span>
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
