import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import {Row, Col,message } from 'antd';
import XLayout from '../../components/layout';
import * as API from '../../api/api'
import './index.less';
import infoPage from './children/info';
import collectPage from './children/collect';
import { time } from '../../utils'
import my_collect_png from '../../images/my_collect.png'


export default class PersonalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.id,
            userInfo: {},
            fans_num:0,			//粉丝数量
            following_num:0,		//关注数量
            collect_art_num:0,	//收藏文章数量
            like_art_num:0, 		//喜欢文章数量
            like_num:0, 			//收获喜欢
            article_num: 0,			//发布文章数量

        }

    }

    componentWillReceiveProps(nextProps){
        const userId = nextProps.match.params.id;
        if (userId !==this.state.userId){
            this.setState({
                userId
            },()=>{
                this.getInfo();
            });
        }
    }

    componentDidMount() {
        this.getInfo()
    }

     //获取信息
    getInfo() {
        let userId = this.state.userId;
        API.getInfoByUserId(userId).then(res=>{
            if (res.data.code === 1) {
                this.setState({ ...res.data.data }); 
            }else {
                message.error('获取信息失败');
            }
        })
    }
  
    
    render() {
        const userId = this.state.userId;
        let { username, avatar,create_time } = this.state.userInfo;
        let {following_num,fans_num,article_num,like_num} = this.state;
        return (
            <XLayout>
                <div className="container personal">
                    <Row>
                        <Col span={16} className="personal_left">
                            <div className="personal_top">
                                <Link className="avatar" to={'/users/'+userId+'/info'}>
                                    <img src={avatar} alt={username}/>
                                </Link>
                                <div className="title">
                                    <Link className="username" to={'/users/'+userId+'/info'}>{username}</Link>
                                </div>
                                <div className="info">
                                    <ul>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{following_num}</p>
                                                    关注 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{fans_num}</p>
                                                    粉丝 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{article_num}</p>
                                                    文章 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="meta-block">
                                                <a>
                                                    <p>{like_num}</p>
                                                    收获喜欢 
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            加入于     {time(create_time)}
                                        
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <Switch>
                                <Route path='/users/:id/info' component={infoPage} />    
                                <Route path='/users/:id/collect' component={collectPage} />  
                                <Redirect exact from="/users/:id/" to="/users/:id/info"/>  
                            </Switch>    
                        </Col>
                        <Col span={8} className="personal_right">
                            <div>
                                <Link to={'/users/'+userId+'/collect'} className="my_collect">
                                    <img src={my_collect_png} alt=""/>    
                                </Link>
                            </div>    
                        </Col>
                    </Row>    
                </div>
            </XLayout>
        );
    }
}
