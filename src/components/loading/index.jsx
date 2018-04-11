import React, {Component} from 'react';
import './index.less';
import {Spin,Icon} from 'antd';
export default class LoadingComponent extends Component {

	render() {
        const Loading = ()=>{
            let type = this.props.type;
            if(type==='post'){
                return <div className="post_placeholder">
                            <div className="title"></div>
                            <div className="info">
                                <div className="avatar"></div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
            }else if(type==='user'){
                return <div className="users_placeholder">
                            <div className="avatar"></div>
                            <div className="wrap">
                                <div className="btn"></div>
                                <div className="name"></div>
                                <div className="text"></div>
                                <div className="text short-text"></div>
                            </div>
                        </div>
            } else {
                return <div className="spin_placeholder">
                      <Icon type='loading' />
                </div>
                
               
            }
        }
		return(
            <div>
                {
                    this.props.loading?<Loading />:(
                        this.props.children
                    )
                }
            </div>
           
			
		);
	}
}

