import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {notification , message,Form, Input, Select, Switch , Button,Row, Col} from 'antd';
import XEditor from '../../../components/editor'
import { connect } from 'react-redux'
import * as API from '../../../api/api'
const FormItem = Form.Item;
const Option = Select.Option;
var timer;

function mapStateToProps (state) {
    return {
        categories: state.article.categories,
        tags:state.article.tags
    }
}
function mapDispatchToProps(dispatch) {
  return {
      saveCategories: (categories) => dispatch({ type: 'SAVE_CATEGORIES', categories }),
      saveTags: (tags) => dispatch({ type: 'SAVE_TAGS',tags }),

  }
}
@connect(mapStateToProps,mapDispatchToProps)
class WriteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            articleId: '',
            title:'',
        }

    }
    componentDidMount() {
        this.getCateAndTag();
        this.getDraft()
    }
    getCateAndTag() {
        API.getCateAndTag().then(res => {
            if (res.data.code === 1) {
                this.props.saveCategories(res.data.data.categories);
                this.props.saveTags(res.data.data.tags);
            }
        })
    }
    //获取草稿
    getDraft() {
        API.getDraft().then(res=>{
            if (res.data.code === 1) {
                if (res.data.has_draft) {
                    let data = res.data.data[0]
                    this.setState({
                        articleId: data._id,
                        title: data.title,
                        content:data.content,
                    })
                    notification['warning']({
                        // title:'警告',
                        message: '您上次还有未编辑的文章',
                        duration:2.5
                    });
                }
            }
        })
    }
    //保存草稿
    saveDraft() {
        let article={
            id:this.state.articleId,
            title:this.props.form.getFieldValue('title'),
            content:this.refs['editor'].getEditorValue()
        }
        if(article.content||article.title){
            API.createDraft(article).then(res => {
                if (res.data.code === 1) {
                    this.setState({
                        articleId:res.data.id,
                    })
                    notification['success']({
                        message: '保存成功',
                        description:`保存于 ${res.data.time}`,
                        duration:2.5
                    });
                } else {
                   
                }
            })
        }
    }

    //发布
    handlePublish=()=>{
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                values.content = this.refs['editor'].getEditorValue();
                if (!values.content){
                    message.error('亲，您忘记输入内容了呢^_^');
                    return;
                }
                if (this.state.articleId){    //说明文章可能是草稿或者需要修改的文章
                    let res = await API.updateArticle(this.state.articleId,values);
                    if (res.data.code === 1) {
                        message.success('发布成功');
                        // this.props.form.resetFields()
                        window.location.reload();
                    } else {
                        message.error('发布失败');
                    }
                } else {
                    let res = await API.createArticle(values);
                    if (res.data.code === 1) {
                        message.success('发布成功');
                        // this.props.form.resetFields()
                        window.location.reload()
                    } else {
                        message.error('发布失败');
                    }
                }
                
            }
        });
    }
    //表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.handlePublish()
    }
    
    //监听标题和内容的变化，如有改动触发保存请求
    watchDraftChange=()=>{
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            this.saveDraft()
        },5000)
    }
    //选择标签
    selectTag = (val) => {
        if(val.length){
            if(val.length<4){
                var lastTag = val[val.length-1];
                if (lastTag.length > 10) {
                    message.error('请输入不得超过10个字符');
                    val.pop()
                }
            } else {
                message.error('最多只能选择3个标签');
                val.pop()
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: { span:6 },
            },
            wrapperCol: {
                sm: { span: 10 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>    
                <FormItem style={{marginBottom:'10px'}}>
                    {getFieldDecorator('title', {
                        initialValue: this.state.title,
                        rules: [{ required: true, message: '请输入文章标题!' }],
                    })(
                        <Input placeholder="标题(必填)" onChange={this.watchDraftChange}/>
                    )}
                </FormItem>
                <Row>
                    <Col span={6}> 
                        <FormItem style={{marginBottom:'10px'}}>
                            {getFieldDecorator('categoryName', {
                                rules: [{ required: true, message: '请选择文章类型!' }],
                            })(
                            <Select style={{ width: 220 }} placeholder="选择文章的分类(必填)">
                                {
                                    this.props.categories.map((item, index) => {
                                        return (
                                            <Option key={item.name}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem style={{marginBottom:'10px'}}>
                            {getFieldDecorator('tagNames')(
                                <Select style={{ width: 350 }} placeholder="选择文章的标签" mode="tags" onChange={this.selectTag} >
                                    {
                                        this.props.tags.map((item, index) => {
                                            return (
                                                <Option key={item.name}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem {...formItemLayout} label="允许评论">
                        {getFieldDecorator('allow_comment',{ initialValue: true })(
                                <Switch defaultChecked />
                            )}
                        </FormItem>   
                    </Col>
                    <Col span={2}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                发表
                            </Button>
                        </FormItem>   
                    </Col>
                </Row>
                
                <div className="editor">
                    <XEditor ref="editor" onPublish={this.handlePublish} onEditorValueChange={this.watchDraftChange} content={this.state.content}/>
                </div>
            </Form>    
        );
    }
}

const Write = Form.create()(WriteComponent);
export default Write;