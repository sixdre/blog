import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Home from './views/home';
import Article from './views/article';
import Api from './api/api'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tags:[]
    };
  }

  getCategoryList() {
    Api.getCategoryList({ type: 'group' }).then(res => {
        this.setState({
            categories: res.data.data
        })
    });
  }
  getTagList() {
    Api.getTagList({ type: 'group' }).then(res => {
        this.setState({
            tags: res.data.data
        })
    });
  }
  componentDidMount() {
    this.getCategoryList();
    this.getTagList()
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-page">
          <div className="main_left">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/app/article/:id" component={Article} />
            </Switch>
          </div>
          <div className="main_right">
            <div className="tagcloud">
              {
                  this.state.categories.map((item,index) => {
                      return (
                        <div key={index}>{item.name} ({item.count})</div>
                      )
                  })
                }  
            </div>
            <hr/>
             <div className="tagcloud">
              {
                  this.state.tags.map((item,index) => {
                      return (
                        <div key={index}>{item.name} ({item.count})</div>
                      )
                  })
                }  
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
