import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import {Row, Col,message } from 'antd';
import XLayout from '../../components/layout';
import * as API from '../../api/api'
import './index.less';

import accountPage from './children/account';



export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }

    }

    render() {
       
        return (
            <XLayout>
                <div className="container setting">
                    <Row>
                        <Col span={6} className="setting_left">
                            <ul className="setting_aside">
                                <li>
                                    <Link to="/setting/account">基础信息</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col span={17} offset={1} className="setting_right">
                            <Switch>
                                <Route path='/setting/account' component={accountPage} />    
                                <Redirect exact from="/setting" to="/setting/account"/>  
                            </Switch>    
                        </Col>
                    </Row>
                </div>    
            </XLayout>    
        );
    }
}
