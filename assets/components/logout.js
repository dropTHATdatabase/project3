const React = require('react');
const auth = require('../auth');

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return null
  }
})

module.exports = Logout;
