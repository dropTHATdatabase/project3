import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute } from 'react-router'
import auth from './auth'

const Signup = require('./components/signup.js');
const Login = require('./components/login.js');
const Logout = require('./components/logout.js');
const Homepage = require('./components/homepage.js');
const Nav = require('./components/nav.js');
const Createhunt = require('./components/createhunt.js').Createhunt;
const Gameview = require('./components/gameview.js');


const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn(),
      currentHuntId: parseInt(localStorage.currentHuntId) || 0,
      user: {}
    }
  },
  childContextTypes: {
    currentHuntId: React.PropTypes.number,
    setCurrentHuntId: React.PropTypes.func,
    user: React.PropTypes.object,
    setUser: React.PropTypes.func
  },
  getChildContext: function(){
   return {
     currentHuntId: this.state.currentHuntId,
     setCurrentHuntId: this.setCurrentHuntId,
     user: this.state.user,
     setUser: this.setUser
   }
 },
  setUser: function(user){
   this.setState({user: user});
  },
  setCurrentHuntId: function(id){
   this.setState({currentHuntId: id});
  },
  updateAuth(loggedIn) {
    this.setState({loggedIn: loggedIn});
    if(loggedIn){
      $.ajax({
        url: '/api/v1/users?me=true',
        method: 'GET',
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() )
        }
      })
      .done((result) => {
        this.setUser(result.data);
      })
      .fail((err) => {
        console.log(err);
      })
    }
  },
  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },
  render() {
    if(this.state.loggedIn) {
      return (
        <div>
          <nav className="#303f9f indigo darken-2">
            <div className="nav-wrapper">
             <a href="#" className="brand-logo">CityDipity</a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/homepage">Home Page</Link></li>
                <li><Link to="/createhunt">Create hunt</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </ul>
            </div>
          </nav>
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
        </div>
      )
    } else {
      return (
        <div id="bg-container">
          <div className="box">
            <div className="welcome" >
              <h2>Welcome to CityDipity</h2>
              <ul>
                <li>
                  {this.state.loggedIn ? ( <Link to="/logout">Log out</Link> )
                                       : ( <Link to="/login">Log In</Link> )}
                </li>
                <li><Link to="/signup">Sign Up</Link></li>
              </ul>
              {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
            </div>
          </div>
        </div>
      )
    }
  }
});

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

// 404 Error Page
const Error = React.createClass({
  render(){
    return(<h1>404 Error - You f*cked up somewhere</h1>)
  }
});

// Access Denied without user token
const DenyAccess = React.createClass({
  render(){
    return(<h3>Access Denied - You must log in first if you want a peek!</h3>)
  }
});

// Welcome Page
const Welcome = React.createClass({
  render(){
    return(<h2>Welcome to Citydipity!</h2>)
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/homepage" component={Homepage} />
      <Route path="/gameview" component={Gameview} />
      <Route path="/createhunt" component={Createhunt} />
      <Route path="/deny" component={DenyAccess} />
    </Route>
    <Route path="*" component={Error} />
  </Router>
), document.getElementById('container'));
