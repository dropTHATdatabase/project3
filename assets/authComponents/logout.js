const React = require('react');
const auth = require('../auth');
const App = require('../app.js');
import { browserHistory, Router, Route } from 'react-router'

const Redirect = Router.Redirect;

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <div>
        Goodbye, friend!
        <Redirect from="logout" to="/" />
      </div>
    )
  }
})


const Error = React.createClass({     // 404 Error Page
  render(){
    return(<h1>404 Error - You f*cked up somewhere</h1>)    
  }
});

// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App} />
//     <Route path="*" component={Error} />
//     <Redirect from="logout" to="/" />
//   </Router>
// ), document.getElementById('container'))

module.exports = Logout;
