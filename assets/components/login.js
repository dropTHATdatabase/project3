const React = require('react');
import { browserHistory, Router, Route, Link, Redirect, Navigation, RouteHandler } from 'react-router'
const auth = require('../auth');
const Homepage = require('./homepage.js');
const Signup = require('./signup.js');


const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()
    const username = this.refs.username.value
    const password = this.refs.password.value

    auth.login(username, password, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props
      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/homepage')      // redirect to member homepage
      }
    })
  },

  render() {
    return (
      <div>
        <h3>Please Log In!</h3>
        <form onSubmit={this.handleSubmit}>
          <input ref="username" placeholder="Enter Username" required />
          <input ref="password" placeholder="Password" required /><br/>
          <button type="submit">Login</button>
          {this.state.error && (
            <p id="invalid">Invalid login information!</p>
          )}
        </form>
        <Link to="/signup">Sign Up here</Link>
      </div>
    )
  }
})

module.exports = Login;
