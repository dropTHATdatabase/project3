'use strict'
import React from 'react'
import { render, ReactDOM } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from './../auth'

const $   = require('jquery');
const App = require('./../app.js');
const Nav = require('./nav.js');
const Createhunt = require('./createhunt.js').Createhunt;
const Gameview = require('./gameview.js');
// how do we get user info from token in front end?? currently stored in user:{} 

const Homepage = React.createClass({
  // set context from parent component  
  contextTypes: {
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    setCurrentHuntId: React.PropTypes.func
  },
  getInitialState() {
    return { 
      hunts: [{}]
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
      // console.log('Homepage hunts: ', data) 
      this.state.hunts = data.data
      this.setState({ hunts: this.state.hunts })
    }).fail((error)=>{ 
      console.log('Hunt List Error: ', error) 
    })
  },
  // AFTER homepage is rendered - when new hunt is added?
  componentDidMount() {},
  // Edit button - edits hunts/:id info (for owner_id ONLY)
  editHunt(hunt) {
    console.log('making AJAX request to edit hunt')
    // AJAX PUT request here
  },
  // Delete button - deletes /hunts/:id from user's hunts 
  deleteHunt(hunt) {
    console.log('making AJAX request to delete hunt')
    // AJAX DELETE request here
  },
  handleGameview(event) {
    event.preventDefault();
    console.log('here: ', this.props.index)
    // this.context.setCurrentHuntId()
    this.context.router.replace('/gameview')
  },
  // creates new row in table with hunt info
  renderHunt(hunt) {
    return (
      <Hunt key={hunt.hunt_id} details={hunt} />
    )
  },

  render() {
    var hunts = [];
    // console.log('user info: ', this.context.user)
    return (
      <div>
        <h1>Welcome back, {this.context.user.username}!</h1>

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
                {hunts }
              </tbody>
            </table>
          </section>

          {/* User Hunt Record + Create Hunt btn */}
          <section className="three columns">
            <div className="row">
              <h5>Hunt Record:</h5>
              <ul>
                <li>Hunts Entered: {this.context.user.hunts_entered} </li>
                <li>Hunts Completed: {this.context.user.hunts_completed} </li>
                <li>Hunts Won: {this.context.user.hunts_won} </li>
              </ul>
            </div>
            <button className="button-primary">
              <Link to='createhunt'>Create A Hunt!</Link>
            </button>
          </section>
        </div>
        {/* {this.props.children} */}
      </div>
    )
  }
});

const Hunt = React.createClass({
  contextTypes: {
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    setCurrentHuntId: React.PropTypes.func
  },
  handleGameview(event) {
    event.preventDefault();
    // console.log('here: ', this.props.details.hunt_id)
    this.context.setCurrentHuntId(this.props.details.hunt_id)
    this.context.router.replace('/gameview')
  },
  render() {
    return (
      <tr key={this.props.details.hunt_id}>
        <td>{this.props.details.wager}</td>
        <td>??</td>
        <td>??</td>
        <td>{this.props.details.deadline}</td>
        <td id="btn">
          {/* if({this.props.details.isOwner}) {
              (<button id="edit" className="button-primary" onClick={this.handleEdit}>Edit</button>)
            } */}
          <button id="view" className="button-primary" onClick={this.handleGameview}>View</button>
          <button id="delete" className="button-primary" onClick={this.deleteHunt}>Delete</button>
        </td>
      </tr>
    )
  }
});

module.exports = Homepage;
