import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, HashRouter, browserHistory } from 'react-router-dom';
import Login from './views/login/login';
import List from './views/list/list';
import Addproduct from './views/list/addproduct';
import Editproduct from './views/list/editproduct';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="wrapper theme-5-active">
            <Route exact path='/' component={Login} />
          <Route exact path='/list' component={List} />
          <Route exact path='/addproduct' component={Addproduct} />
          <Route exact path='/editproduct/:_id' component={Editproduct} />
      </div >
      </HashRouter>
    );
  }
}

export default App;
