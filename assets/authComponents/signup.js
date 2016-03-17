const React = require('react');
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
    // console.log('user: ', username, 'pass: ', password)

    // AJAX post to db here
    $.post('/users', {username: username, password: password})
     .done((data)=>{
        console.log('user created', data)
     })
     .fail((error)=>{
      console.log('error', error)
      return this.setState({ error: true })
     })

    const{ location } = this.props

    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/')      // redirects to login
    }

  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="username" placeholder="Create a Username" /></label>
        <label><input ref="password" placeholder="Create a Password" /></label><br />
        <button type="submit">Sign Me Up!</button>
        {this.state.error && (
          <p>Oops! Something went wrong, please try again!</p>
        )}
      </form>
    )
  }
})

module.exports = Signup;


