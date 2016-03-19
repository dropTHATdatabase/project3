'use strict'
import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './../auth'

const $   = require('jquery');
const App = require('./../app.js');
const Nav = require('./nav.js');
const Createhunt = require('./createhunt.js');
// const Gameview = require('./gameview.js');
// how do we get user info from token in front end?? currently stored in user:{} 

const Homepage = React.createClass({
  getInitialState() {
    return { 
      hunts: [],
      user:  {}         // bad practice? ill advised?
    }
  },
  // sets context type to be passed to child component
  childContextTypes: {
    hunts: React.PropTypes.array,
    user: React.PropTypes.object
  },
  // gets returned context data from child component
  getChildContext() {
    return {
      hunts: this.state.hunts
    }
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
      this.state.user = data.user
      this.setState({ hunts: this.state.hunts, user: this.state.user })
      // console.log("this.state.hunts: ", this.state.hunts)
    }).fail((error)=>{ 
      console.log('Hunt List Error: ', error) 
    })
  },
  // AFTER homepage is rendered - when new hunt is added?
  componentDidMount() {       

  },
  // Edit button - edits hunts/:id info (for owner_id ONLY)
  handleEdit(event) {
    event.preventDefault()
    console.log('edit button clicked')
  },
  // View button - redirect to gameview component of hunts/:id
  handleView(event) {
    event.preventDefault()
    console.log('view button clicked')
  },
  // Delete button - deletes /hunts/:id from user's hunts 
  handleDelete(event) {
    event.preventDefault()
    console.log('delete button clicked')
  },
  // creates new row in table with hunt info
  renderHunt(hunt) {
    // console.log('renderHunt: ', hunt)
    return (
      <tr key={hunt.hunt_id} index={hunt.hunt_id}>
        <td>{hunt.wager}</td>
        <td>??</td>
        <td>??</td>
        <td>{hunt.deadline}</td>
        <td id="btn">
          <button id="view" className="button-primary" onClick={this.handleView}>View</button>
          <button id="delete" className="button-primary" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  },

  render() {
    var hunts = [];
    // console.log('user info: ', this.state.user)
    return (
      <div>
        <Nav />
        <h1>Welcome back, {this.state.user.username}!</h1>

        <div className="row">
          {/* List of all User hunts + Edit|View|Delete options per hunt */}
          <section className="eight columns">
            <h5>Hunt History:</h5>
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Hunt Wager</th>
                  <th>Status</th>
                  <th>Winner</th>
                  <th>Deadline</th>
                  <th>Edit|View|Delete</th>
                </tr>
              </thead>
              <tbody>
                { this.state.hunts.length 
                  ? (this.state.hunts).forEach( (el)=> hunts.push(this.renderHunt(el)) ) 
                  : console.log('zero') }
                { hunts }
              </tbody>
            </table>
          </section>

          {/* User Hunt Record + Create Hunt btn */}
          <section className="three columns">
            <div className="row">
              <h5>Hunt Record:</h5>
              <ul>
                <li>Hunts Entered: {this.state.user.hunts_entered} </li>
                <li>Hunts Completed: {this.state.user.hunts_completed} </li>
                <li>Hunts Won: {this.state.user.hunts_won} </li>
              </ul>
              <button className="button-primary">
                <Link to="/createhunt">Create A Hunt!</Link>
              </button>
            </div>
          </section>
        </div>

      </div>
    )
  }
})


module.exports = Homepage;
