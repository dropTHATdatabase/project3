import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './auth'


const Nav = require('./components/nav.js');
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

  componentDidMount() {
  // console.log('test',$('#hidden').text());

  },

  render() {
    return (
      <div>
        <h1>CityDipity</h1>
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

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="signup" component={SignUp} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="createhunt" component={Createhunt} />
      {/* homepage, nav, gameview, form, map*/}
    </Route>
  </Router>
), document.getElementById('container'))
