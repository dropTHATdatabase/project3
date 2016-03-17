import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
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

    if(this.state.loggedIn) {
      // show homepage
      console.log('you are already logged in!')
    } else {
      // show sign up page
      console.log('you need to sign up or log in!')
    }

  },

  render() {
    return (
      <div className="container">
        <h1>Welcome to Citydipity!</h1>
        
        <ul>
          <li>
            {this.state.loggedIn ? ( <Link to="/logout">Log out</Link> ) 
                                 : ( <Link to="/login">Log In</Link> )}
          </li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/createhunt">Create hunt</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({                               // replace? is this a JS thing?
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Error = React.createClass({
  render(){
    return(<h1>401 Error - You f*cked up somewhere</h1>)    
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="signup" component={SignUp} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} /> 
      <Route path="createhunt" component={Createhunt} />
      {/* <Route path="homepage" component={Homepage} /> */}
      
      <Route path="*" component={Error} />
    </Route>
  </Router>
), document.getElementById('container'))
