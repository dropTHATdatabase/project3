const React = require('react');
const auth = require('../auth');
import { browserHistory, Router, Route, Link } from 'react-router'

const Createhunt = require('./createhunt.js');
const Logout = require('./logout.js');
const Homepage = require('./../homepage.js');

const Nav = React.createClass({

  render() {
    return(
      <div id="nav">
        <Router history={browserHistory}> {/*do we need Router?*/}
        <div className="nav">Citydipity</div>
        <div className="nav"><Link to="/homepage">Home</Link></div>
        <div className="nav"><Link to="/createhunt">Create New Hunt</Link></div>
        <div className="nav"><Link to="/logout">Log Out</Link></div>
        </Router>
      </div>
    )
  }

})

module.exports = Nav;
