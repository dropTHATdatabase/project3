'use strict'
import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../auth'

const $   = require('jquery');
const Createhunt = require('./createhunt.js');

const Map = React.createClass({
  componentDidMount : function() {
   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2U33goCrZ0Hilh_cdksT1_F8jBgUTl4w&libraries=places&callback=initMap');
  },
  render : function() {
    let divstyle = {
      height: "400px",
      width: "380px",
      margin: '0 auto',
      position: 'relative'
    }
    let sectionstyle = {
      position: 'relative',
      left: '8em',
      top: '4em'
    }
    return (
      <section style={sectionstyle}>
        <div id="map" style={divstyle}>
        </div>
      </section>
    )
  }
});

const Gameview = React.createClass({
  contextTypes: {
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    currentHuntId: React.PropTypes.number
  },
  getInitialState() {
    return {
      game: {}
    }
  },
  componentWillMount() {
    console.log('gameview hunt_id: ', this.context.currentHuntId)
    // gets list of hunts from user token
    $.ajax({
      url: "/api/v1/hunts/"+this.context.currentHuntId,
      type: "get",
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
      }
    }).done((data)=>{ 
      this.state.game = data.data
      this.setState({ game: this.state.game })
    }).fail((error)=>{ 
      console.log('Gameview GET Error: ', error) 
    })
  },

  componentDidMount() {
    // console.log('currently at Gameview component')
    // console.log('line12',localStorage.hid);
    
  },

  render() {
    var clues = this.state.game.clues;
    var participants = this.state.game.participants;
    console.log('clues: ', this.state.game.clues)
    console.log('participants: ', this.state.game.participants)
    return (
      <div>
        <div>
          <h1>Welcome back, username!<span>Enter time countdown here</span></h1>
        </div>
        

        <div className="row">
          {/* List of all User hunts + Edit|View|Delete options per hunt */}
          <div className="gameview clues">
            <h5>Clues:</h5>
            <ul>
              <li>clue #1</li>
              <li>clue #2</li>
              <li>clue #3</li>
              <li>clue #4</li>
              {/* List all clues here */}
            </ul>
          </div>

          <div className="gameview map">
            map
          </div>

          {/* User Hunt Record + Create Hunt btn */}
          <div className="gameview status">
            <h5>Player Status:</h5>
            <div>
              <div>Player 1</div>
              <div>Player 2</div>
              <div>Player 3</div>
              {/* List each player status here */}
            </div>
          </div>
        </div>
        {/* {this.props.children} */}
      </div>
    )
  }
})

module.exports = Gameview;
