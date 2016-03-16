import React from 'react'
const auth = require('../auth');

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

    // AJAX post to db here

    const{ location } = this.props

    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/')
    }

  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="username" placeholder="Create a Username" /></label>
        <label><input ref="password" placeholder="Create a Password" /></label><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad Sign Up Information!</p>
        )}
      </form>
    )
  }
})

module.exports = Signup;


