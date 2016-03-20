import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './auth'


const Homepage = require('./components/homepage.js');
const SignUp = require('./components/signup.js');
const Createhunt = require('./components/createhunt.js').Createhunt;
const Login = require('./components/login.js');
const Logout = require('./components/logout.js');



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
  },

  render() {
  if(this.state.loggedIn) {
    return (
        <div>
          <nav className="#303f9f indigo darken-2">
            <div className="nav=wrapper">
              <ul className="nav nav-justified ">
                <li><Link to="/homepage">Home Page</Link></li>
                <li><Link to="/createhunt">Create hunt</Link></li>
                <li className="right"><Link to="/logout">Logout</Link></li>
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

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="signup" component={SignUp} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="createhunt" component={Createhunt} />
      <Route path="homepage" component={Homepage} />
      {/* homepage, gameview,*/}
    </Route>
  </Router>
), document.getElementById('container'))
