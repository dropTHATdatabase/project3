import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './auth'

const Nav = require('./authComponents/nav.js');
// const Hunt = require('./authComponents/hunt.js');
const Createhunt = require('./authComponents/createhunt.js');
// how do we get user info from token in front end??

const Homepage = React.createClass({

  render() {
    return (
      <div className="container">
        <Nav />
        <h1>Welcome back, {/* Username */}</h1>
        <section>
          <Hunt /> {/* Edit & Delete buttons for each Hunt */}
        </section>
        <aside>
          <div>{/* hunts completed, hunted entered, hunts won */}</div>
          <button><Link to="/createhunt">Create hunt</Link></button>
        </aside>
      </div>
    )
  }
})

const Error = React.createClass({
  render(){
    return(<h1>401 Error - You f*cked up somewhere</h1>)    
  }
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={Homepage}>
      <Route path="nav" component={Nav} />
      {/* <Route path="hunt" component={Hunt} /> */}
      <Route path="createhunt" component={Createhunt} />
      <Route path="userinfo" component={UserInfo} />      {/* is this a component? */}
      <Route path="*" component={Error} />
    </Route>
  </Router>
), document.getElementById('container'))

// module.exports = Homepage;
