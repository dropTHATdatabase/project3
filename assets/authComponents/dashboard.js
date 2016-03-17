const React = require('react');
const auth = require('../auth');


const Dashboard = React.createClass({

  render() {
    const token = auth.getToken()
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

module.exports = Dashboard;
