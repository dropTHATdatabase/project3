const React = require('react');
const auth = require('../auth');
// const App = require('../app.js');    // redirect to App

const Logout = React.createClass({
  contextTypes: {
    setUser: React.PropTypes.func
  },
  componentDidMount() {
    auth.logout(this.context.setUser({}))
  },
  removeUser() {

  },
  render() {
    return (
      <div>
        <h1> Goodbye, friend! </h1>
      </div>
    )
  }
})

module.exports = Logout;
