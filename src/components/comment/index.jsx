import React, { Component } from 'react';
import { Spin, Pagination, message, Icon ,Modal} from 'antd';
import './index.css'
import * as API from '../../api/api';
import CommentItem from './item'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
let fcontnet;
const confirm = Modal.confirm;
function mapStateToProps (state) {
    return {
        
    }
}
function mapDispatchToProps(dispatch) {
  return {
      updateCmtNum: (id) => dispatch({ type: 'UPDATE_CMTNUM',id }),
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            user_num:0,     //评论该文章的用户数量
            cId: '',
            toId: '',
            page:1,
            limit:8,
            total:0,
            order_by: 'timeRev',
            showControl: false,      //是否显示评论框
            current_userId:null   //当前用户的id
        }
    }
    static propTypes = {
        articleId: PropTypes.string.isRequired
    }
    componentDidMount() {
        this.getComments()
    }

    //获取评论列表
    getComments() {
        this.setState({
            loading:true
        })
        let id = this.props.articleId;
        let params = {
            limit:this.state.limit,
            page:this.state.page,
            order_by:this.state.order_by,
        }
        API.getComments(id,params).then(res => {
            if (res.data.code === 1) {
                this.setState({
                    dataList: res.data.data,
                    user_num:res.data.user_num,
                    loading:false,
                    total: res.data.total,
                    current_userId:res.data.current_userId
                })
            }
        })
    }
    onPageChange=(val)=>{
        this.setState({     //setState 可以被认为异步，
            page:val
        },()=>{
            this.getComments()
        })
    }
    openControl=()=> {
        this.setState({
            showControl:true
        })
    }
    closeControl = () => {
        this.setState({
            showControl:false
        })
    }
    //评论回复
    handleReply = (item, cId) => {
        fcontnet = this.refs.content.value = '回复@' + item.from.username + ' ';
        this.setState({
            showControl:true,
            cId: cId,
            toId:item.from._id
        })
    }

    //发表评论
    handleSubmit = (type) => {
        var content = this.refs.content.value;
        if (type === 'reply') {
            content = content.replace(fcontnet,'');
        }
        if (!content || !content.trim().length) {
             return message.error('您忘记输入内容了');
        }
        let id = this.props.articleId;
        let data = {
            cId:  this.state.cId,
            toId: this.state.toId,
            content
        }
        API.submitComment(id, data).then(res => {
            if (res.data.code === 1) {
                message.success('发表成功');
                this.getComments();
                this.refs.content.value = '';
                this.setState({
                    cId: '',
                    toId: ''
                })
                this.props.updateCmtNum(id);
                this.closeControl()
            } else {
                message.error(res.data.message);
            }
        })
    }

    //点赞
    handleLike = (item) => {
        let id = item._id;
        API.addCommentLike(id).then(res => {
            if (res.data.code === 1) {
                if(res.data.isLike){
                    message.success('成功点赞');
                }else{
                    message.success('您已取消点赞');
                }
                var d = this.state.dataList.map((item)=>{
                    if(item._id === id){
                        item.like_num = res.data.count
                        item.isLike = res.data.isLike;
                    }
                    return item;
                })
                this.setState({
                    dataList:d
                })
            } else {
                message.error(res.data.message);
            }
        })
    }

    //删除评论
    handleRemove = (id) => {
        var ctx = this;
        if (!id) {
            return;
        }
        confirm({
            title:'确定删除吗',
            okText:'确定',
            cancelText:'取消',
            onOk(){
                 API.removeMeComment(id).then(res => {
                    if (res.data.code === 1) {
                        message.success('删除成功');
                        ctx.getComments()
                    } else {
                        message.error(res.data.message);
                    }
                })
            },
            onCancel(){}
        })
       
    }

    //取消回复
    cancleReply = () => {
        this.refs.content.value =' ';
        this.setState({
            cId: '',
            toId:''
        })
    }

    render() {
        var ToggleBtn=()=>{
            if (this.state.cId.length) {
                return (
                    <div>
                        <input type="button"  value="取消" onClick={this.cancleReply}/>
                        <input type="button" onClick={this.handleSubmit.bind(this,'reply')} value="回复" />
                    </div>
                )
            } else {
                return (
                    <input type="button" onClick={this.handleSubmit} value="提交" />
                )     
            }
        }
        let loading = this.state.loading ? this.state.loading : false;
        const pv = this.props.pv||0;
        const cmt_num = this.state.total;
        const user_num = this.state.user_num;

        return (
            <div className="comment-wrapper">
                <div className="comment_info">
                    <ul className="clearfix">
                        <li>
                            <span>{pv}</span>
                            <h5>浏览</h5>
                        </li>
                        <li>
                            <span>{cmt_num}</span>
                            <h5>回复</h5>
                        </li>
                        <li>
                            <span>{user_num}</span>
                            <h5>用户</h5>
                        </li>
                    </ul>    
                    <a style={{'float':'right'}} onClick={this.openControl}>回复作者</a>
                </div>    
                
                <div className={["comment_form_fixed", !this.state.showControl?"closed":'open'].join(' ')} >    
                    <div className="comment_control">
                        <a className="toggle_control" onClick={this.closeControl}>
                            <Icon type="down-circle-o" />
                        </a>    
                        <form id="comment_form" className="comment_form">
                            <div className="form-ceil form-user-avatar">
                                <img src="/images/noavatar_default.png" alt="" />
                            </div>
                            <div className="form-ceil form-content">
                                <div className="form-textarea">
                                    <textarea ref="content" name="content" placeholder="来发表一下你的看法吧"></textarea>
                                </div>
                                <div className="form-toolbars clearfix">
                                    <div className="form-action">
                                    <ToggleBtn />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>    
                </div>
                <Spin spinning={loading}>
                    <div className="comment-area">
                        <ul className="list-unstyled">
                            {
                                this.state.dataList.map((item, index) => {
                                    return (
                                        <CommentItem
                                            data={item}
                                            current_userId={this.state.current_userId}
                                            did={item._id}
                                            key={index}
                                            handleReply={this.handleReply}
                                            handleLike={this.handleLike}
                                            handleRemove={this.handleRemove}
                                        />
                                    )
                                })
                            }    
                        </ul>    
                    </div>
                </Spin>
                <div className="pagination">
                    <Pagination current={this.state.page} size="small" onChange={this.onPageChange} pageSize={this.state.limit} total={this.state.total}></Pagination>
                </div>
             </div>
           
        );
    }
}