const React = require('react');
const auth = require('../auth');

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <div>Goodbye, friend!</div>
    )
  }
})

module.exports = Logout;
