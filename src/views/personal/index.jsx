import React, { Component } from 'react';
import {Link, NavLink ,Switch,Route,Redirect} from 'react-router-dom';
import XLayout from '../../components/layout';
import OwnerPage from './children/owner';
import CmtPage from './children/cmt';
import CollectPage from './children/collect';
import LikePage from './children/like';
import WritePage from './children/write';
import InfoPage from './children/info';

import LikeUsersPage from './children/likeuser';
import FansPage from './children/fans';



import './index.less';

export default class PersonalComponent extends Component {
    
    render() {
        return (
            <XLayout>
                <section className="personal_control">
                    <div className="left_aside">
                        <Link to="/">
                            回首页
                        </Link>	
                        <ul>
                            <li><NavLink activeClassName='active' to="/personal/write">写文章</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/owner">我的文章</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/collect">我收藏的文章</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/likes">我喜欢的文章</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/cmt">我评论的文章</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/likeusers">我关注的用户</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/fans">我的粉丝</NavLink></li>
                            <li><NavLink activeClassName='active' to="/personal/info">个人信息</NavLink></li>
                        </ul>
                        
                    </div>    
                    <div className="personal_right">
                        <Switch>
                            <Route path='/personal/write' component={WritePage} />    
                            <Route path='/personal/owner' component={OwnerPage} />    
                            <Route path='/personal/collect' component={CollectPage} />    
                            <Route path='/personal/likes' component={LikePage} />    
                            <Route path='/personal/cmt' component={CmtPage} />    
                            <Route path='/personal/likeusers' component={LikeUsersPage} />    
                            <Route path='/personal/fans' component={FansPage} />    
                            <Route path='/personal/info' component={InfoPage} /> 
                            <Redirect exact from="/personal" to="/personal/info"/>
                        </Switch>
                    </div>  
                </section>
            </XLayout>
        );
    }
}

