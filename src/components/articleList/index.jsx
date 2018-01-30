import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './index.less';
export default class ArticleList extends Component {
    constructor() {
	    super()
	}
    componentDidMount(){
        console.log()
    }
    transClassName(item) {
        let name = '';
        if (!item.img){
            name = 'noimg';
        }
        return 'post_item ' + name;
    }
    checkShowImg(item) {
        if (!item.img) {
            return '';
        } else {
            return (
                <div className="post_img">
                    <img src={item.img} alt=""/>    
                </div>
            )
           
        }
    }
    render() {
		return(
            <ul className="post_list">
                {
                    this.props.data.map((item,index) => {
                        return (
                            <li className={this.transClassName(item)} key={index}>
                                
                               {this.checkShowImg(item)}
                                <div className="post_body">
                                    <h3 className="post_title">
                                        <Link to={'article/' + item._id}>{item.title}</Link>
                                    </h3>    
                                    <div className="post_info">
                                        01.21 - 阅 <span>{item.nums.pv }</span>
                                    </div>
                                    <p className="post_summary">{item.abstract}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
		);
	}
}

