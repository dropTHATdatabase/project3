const React = require('react');
const auth = require('../auth');
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

      console.log('this.props? ', this.props)
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="username" placeholder="Enter Username"/></label>
        <label><input ref="password" placeholder="Password" /></label><br />
        <button type="submit">Login</button>
        {this.state.error && (
          <p>Invalid login information!</p>
        )}
      </form>
    )
  }
})

module.exports = Login;
