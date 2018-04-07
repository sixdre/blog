import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getMeFans} from '../.././../api/api'

export default class MeFansComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    componentWillMount() {
        document.documentElement.scrollTop = 0;  //ie下
        document.body.scrollTop = 0;  //非ie
        this.getMeFans()
      
    }
    getMeFans(page = 1) {
        this.setState({
            loading:true,
        })
        getMeFans({ limit: 10, page}).then(res => {
            if (res.data.code === 1) {
                let users = res.data.data;
            }
        });
    }
    render() {
        return (
            <section>
               11111
            </section>
        );
    }
}

