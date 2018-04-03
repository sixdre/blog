import React, { Component } from 'react';
import { message,Form, Input, Select, Switch , Button} from 'antd';
import './index.less';
import XEditor from '../../components/editor'
import { connect } from 'react-redux'
import Api from '../../api/api'
const FormItem = Form.Item;
const Option = Select.Option;


function mapStateToProps (state) {
    return {
        categories: state.article.categories,
        tags:state.article.tags
    }
}
function mapDispatchToProps(dispatch) {
  return {
      storeArticles: (data) => dispatch({ type: 'STORE_ARTICLES',data }),

  }
}
@connect(mapStateToProps,mapDispatchToProps)
class WriteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:''
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log(values)
                values.content = this.refs['editor'].getEditorValue();
                if (!values.content){
                    message.error('亲，您忘记输入内容了呢^_^');
                    return;
                }
                let res = await Api.createArticle(values);
                if (res.data.code == 1) {
                    message.success('发布成功');
                    this.props.form.resetFields()
                } else {
                     message.error('发布失败');
                }
            }
        });
    }

    tagChange = (val) => {
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
                sm: { span: 2 },
            },
            wrapperCol: {
                sm: { span: 10 },
            },
        };
        return (
            <section className="write_control">
                <div className="left_aside">
                
                </div>    
                <div className="write_main">
                    <Form onSubmit={this.handleSubmit}>    
                        <FormItem label="标题" {...formItemLayout}>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入文章标题!' }],
                            })(
                                <Input  placeholder="标题" />
                            )}
                        </FormItem>
                        <FormItem label="分类" {...formItemLayout}>
                            {getFieldDecorator('categoryName', {
                                rules: [{ required: true, message: '请选择文章类型!' }],
                            })(
                            <Select style={{ width: 220 }}>
                                <Option value="分享">分享</Option>
                                <Option value="交流">交流</Option>
                            </Select>
                            )}
                        </FormItem>
                         <FormItem label="标签" {...formItemLayout}>
                            {getFieldDecorator('tagNames')(
                                <Select style={{ width: 220 }} mode="tags" onChange={this.tagChange} >
                                <Option value="分享">分享</Option>
                                <Option value="交流">交流</Option>
                                <Option value="22">22</Option>
                                <Option value="11">11</Option>   
                            </Select>
                            )}
                         </FormItem>
                        <div className="editor">
                            <XEditor ref="editor" content={this.state.content}/>
                        </div>
                        <FormItem {...formItemLayout} label="允许评论">
                           {getFieldDecorator('allow_comment',{ initialValue: true })(
                                <Switch defaultChecked />
                            )}
                        </FormItem>   
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                发表
                            </Button>
                        </FormItem>   
                    </Form>    

                </div>
            </section>
        );
    }
}

const Write = Form.create()(WriteComponent);
export default Write;