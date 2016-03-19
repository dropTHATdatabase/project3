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

  // AFTER homepage is rendered
  componentDidMount() {       
    
  },

  // BEFORE homepage is rendered
  componentWillMount() {      
    // gets list of hunts from user token
    $.ajax({
      url: "/api/v1/hunts",
      type: "get",
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
      }
    }).done((data)=>{ 
      // console.log('List Success: ', data.data) 
      this.state.hunts = data.data
      this.setState({ hunts: this.state.hunts })
      // console.log("this.state.hunts: ", this.state.hunts)
    }).fail((error)=>{ 
      console.log('Hunt List Error: ', error) 
    })
  },

  handleView(event) {
    event.preventDefault()
    console.log('view button clicked')
  },

  handleDelete(event) {
    event.preventDefault()
    console.log('delete button clicked')
  },

  renderHunt(hunt) {
    console.log('renderHunt: ', hunt)
    return (
      <tr key={hunt.hunt_id} index={hunt.hunt_id}>
        <td>{hunt.wager}</td>
        <td>{hunt.hunt_id}</td>
        <td>{hunt.winner}</td>
        <td>{hunt.deadline}</td>
        <td id="btn">
          <button id="view" className="button-primary" onClick={this.handleView}>View</button>
          <button id="delete" className="button-primary" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  },

  render() {
    // console.log("this.state.hunts: ", this.state.hunts)
    var hunts = [];

    // if(this.state.hunts.length){
    //   hunts = this.state.hunts.map((el)=> { 
    //     <tr>
    //       <td>{el.wager}</td>
    //       <td>status</td>
    //       <td>{el.winner}</td>
    //       <td>{el.deadline}</td>
    //       <td id="btn">
    //         <button id="view" className="button-primary" onClick={this.handleView}>View</button>
    //         <button id="delete" className="button-primary" onClick={this.handleDelete}>Delete</button>
    //       </td>
    //     </tr>
    //   })
    // } else {
    //   console.log('skipped')
    // }
    return (
      <div className="container">
        <h1>Welcome back, {/* Username */}!</h1>

        <div className="row">
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
                  <th>View|Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.hunts.length ? (this.state.hunts).forEach( (el)=> hunts.push(this.renderHunt(el)) ) 
                                         : console.log('zero') }
                { hunts }
              </tbody>
            </table>
          </section>

          {/* User Hunt Record + Create Hunt btn */}
          <section className="three columns">
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
        </div>
        
      </div>
    )
  }
})


module.exports = Homepage;
