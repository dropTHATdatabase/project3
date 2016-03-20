const React = require('react');
import { browserHistory, Router, Route, Link, Redirect } from 'react-router'
const auth = require('../auth');
const Login = require('./login.js');

const Signup = React.createClass({
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

    $.post('/api/v1/users', {username: username, password:password})
     .done((data) => {
        console.log('user created');
     })
     .fail((data) => {
        console.log('error in creating an user');
        return this.setState({ error: true })
     })

    const{ location } = this.props
    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/login')      // redirects to login
    }
  },

  render() {
    return (
      <div>
        <h3>Sign Up Now!</h3>
        <form onSubmit={this.handleSubmit}>
          <input ref="username" placeholder="Create a Username" required />
          <input ref="password" placeholder="Create a Password" required /><br/>
          <button type="submit">Sign Me Up!</button>
          {this.state.error && (
            <p id="invalid">Oops! Something went wrong, please try again!</p>
          )}
        </form>
        <Link to="/login">Log In here</Link>
      </div>
    )
  }
})

module.exports = Signup;
