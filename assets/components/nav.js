const React = require('react');
const auth = require('../auth');
import { browserHistory, Router, Route, Link } from 'react-router'

const Createhunt = require('./createhunt.js');
const Logout = require('./logout.js');
const Login = require('./login.js');
const Homepage = require('./homepage.js');
const App = require('./../app.js');

const Nav = React.createClass({

  render() {
    return(
      <div id="nav">
        <div className="nav"><Link to="/app">Citydipity</Link></div>
        <div className="nav"><Link to="/homepage">Home</Link></div>
        <div className="nav"><Link to="/createhunt">Create New Hunt</Link></div>
        <div className="nav">
          {auth.loggedIn() ? (<Link to="/logout">Log out</Link>) 
                           : (<Link to="/login">Log in</Link>  ) }
        </div>
        {/* // {auth.loggedIn ? (<Link to="/logout">Log out</Link>) 
        //                      : (<Link to="/login">Log in</Link> )} */}
      </div>
    )
  }
})

module.exports = Nav;

// needs styling
// needs to be displayed horizontally