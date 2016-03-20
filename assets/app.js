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
// const Gameview = require('./components/gameview.js');

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
    return (
      <div className="container">
        <Nav />
        {this.props.children}
      </div>
    )
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
      <IndexRoute component={Welcome} />
      <Route path="/signup" component={Signup} /> 
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} /> 
      <Route path="/nav" component={Nav} />
      <Route path="/homepage" component={Homepage} /> 
      <Route path="/createhunt" component={Createhunt} />
      <Route path="/deny" component={DenyAccess} />
    </Route>
    <Route path="*" component={Error} />
  </Router>
), document.getElementById('container'))





// all nested components 

// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <Route path="signup" component={Signup} />
//       <Route path="login" component={Login} />
//       <Route path="logout" component={Logout} /> 
//       <Route path="homepage" component={Homepage}> 
//         <Route path="nav" component={Nav} />
//         <Route path="createhunt" component={Createhunt}>
//           <Route path="nav" component={Nav} />
//         </Route>
//         <Route path="gameview" component={Gameview}>
//           <Route path="nav" component={Nav} />
//         </Route>
//       </Route>
//       <Route path="*" component={Error} />
//     </Route>
//   </Router>
// ), document.getElementById('container'))

