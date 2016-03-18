import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, Redirect } from 'react-router'
import auth from './auth'

const SignUp = require('./authComponents/signup.js');
const Createhunt = require('./authComponents/createhunt.js');
const Login = require('./authComponents/login.js');
const Logout = require('./authComponents/logout.js');
// const Homepage = require('./homepage.js');

const App = React.createClass({

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()

    // {this.state.loggedIn ? (<Link to="/logout">Log out</Link>) 
    //                      : (<Link to="/login">Log in</Link> ) }
    // {this.state.loggedIn ? (<Createhunt />) : (<Signup />) }
  },

  render() {
    return (
      <div className="container">
        <h1><Link to="/">Welcome to Citydipity!</Link></h1>
        <div>
          {this.state.loggedIn ? (<Createhunt />) : (<Link to="/signup">Sign Up Now</Link>) }  {/* need to point to homepage, not createhunt */}
          {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in. 
            <Link to="/login">Log In Here</Link></p>}
        </div>
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({                              
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Error = React.createClass({     // 404 Error Page
  render(){
    return(<h1>404 Error - You f*cked up somewhere</h1>)    
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} /> 
      <Route path="createhunt" component={Createhunt} />
      {/* <Route path="homepage" component={Homepage} /> */}
      <Route path="*" component={Error} />
    </Route>
  </Router>
), document.getElementById('container'))
