'use strict'
import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './auth'

const $   = require('jquery');
const App = require('./app.js');
const Nav = require('./authComponents/nav.js');
// const Hunt = require('./authComponents/hunt.js');
const Createhunt = require('./authComponents/createhunt.js');
// how do we get user info from token in front end??

const Homepage = React.createClass({

  getInitialState() {
    return { hunts: [] }
  },

  // sets context type
  childContextTypes: {
    hunts: React.PropTypes.array
  },

  // gets returned context data
  getChildContext() {
    return {
      hunts: this.state.hunts
    }
  },

  componentDidMount() {       // after component is called
    console.log('homepage componentDidMount activate')
    // var list = auth.getHuntsList()    // needs to be passed from auth.js
    // console.log('homepage hunts list: ', list)
  },

  componentWillMount() {      // before component is called
    $.ajax({
      url: "/api/v1/hunts",
      type: "get",
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
      }
    }).done((data)=>{ 
      console.log('List Success: ', data) 
      // res.data = data
      // next()
      

    }).fail((error)=>{ 
      console.log('Hunt List Error: ', error) 
    })
  },


  render() {
    return (
      <div className="container">
        <h1>Welcome back, {/* Username */}!</h1>

        <section className="twelve columns">

          {/* List of all User hunts + Edit|Delete options per hunt */}
          <section className="eight columns">
            <h5>Your Hunt History</h5>
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Hunt Wager</th>
                  <th>Status</th>
                  <th>Winner</th>
                  <th>Deadline</th>
                  <th>Edit|Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* what does this.props.children look like? */}
                { console.log('homepage children: ', this.props.children) }
                {/* // {Object.keys(this.state.beverages)
                //   .filter(this.remainingBeverage)
                //   .map(this.renderBeverage)} */}
              </tbody>
            </table>
          </section>

          {/* User Hunt Record + Create Hunt btn */}
          <section className="four columns">
            <aside className="card-panel">
              <div className="row">Your Hunt Record:</div>
              <ul>
                <li>Hunts Entered: {/* {this.state.hunts.hunts_entered} */}</li>
                <li>Hunts Completed: {/* {this.state.hunts.hunts_completed} */}</li>
                <li>Hunts Won: {/* {this.state.hunts.hunts_won} */}</li>
              </ul>
              <button className="button-primary">
                <Link to="/createhunt">Create A Hunt!</Link>
              </button>
            </aside>
          </section>

        </section>
      </div>
    )
  }
})


module.exports = Homepage;
