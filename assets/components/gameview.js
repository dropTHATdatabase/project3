'use strict'
import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../auth'

const $   = require('jquery');
const moment = require('moment');
const moment_countdown = require('moment-countdown');
const Createhunt = require('./createhunt.js');

const Map = React.createClass({
  componentDidMount : function() {
   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2U33goCrZ0Hilh_cdksT1_F8jBgUTl4w&libraries=places&callback=plotlocation');
  },
  render : function() {
    let divstyle = {
      height: "500px",
      width: "580px",
      margin: '0 auto',
      position: 'relative',
      border: '2px solid black'
    }
    let sectionstyle = {
      position: 'relative',
      left: '1em',
      top: '-399px'
    }
    return (
      <section style={sectionstyle}>
        <div id="map2" style={divstyle}>
        </div>
      </section>
    )
  }
});

const Gameview = React.createClass({
  contextTypes: {
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    currentHuntId: React.PropTypes.number,
    setCurrentHuntId: React.PropTypes.func
  },
  getInitialState() {
    return {
      game: {
        clues: [],
        participants: []
      }
    }
  },
  componentWillMount() {
    // gets list of hunts from user token
    $.ajax({
      url: "/api/v1/hunts/"+this.context.currentHuntId,
      type: "get",
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
      }
    }).done((data)=>{
      localStorage.currentHuntId = parseInt(this.context.currentHuntId)
      this.state.game = data.data
      // setting the state of the game
      this.setState({ game: this.state.game })

      // grabbing the clues returned from the database
      // need clue number, lat and lng
      var clues = this.state.game.clues;
      var cluesdb =[];

      clues.forEach((el) => {
        var clueobj ={
          'clue_number': el.clue_number,
          'lat': el.lat,
          'lng': el.lng
        }
        cluesdb.push(clueobj)
      })

      console.log('clues from the database', cluesdb);
      var cluesstring = JSON.stringify(cluesdb);

      var $hiddenDiv = $('#hidden');

      // remove cluesdb if it already exists
       $('#cluesdb').remove();
      // put the clues data from the database into hiddendiv to pass it to google maps script
      $hiddenDiv.append($('<input id="cluesdb" type="hidden" value='+cluesstring+'>'));

    }).fail((error)=>{
      console.log('Gameview GET Error: ', error)
    })
  },
  renderClue(clue) {
    return(<Clue key={clue.clue_id} details={clue} />)
  },
  renderParticipant(participant) {
    return(<Participant key={participant.participant_id} details={participant} />)
  },
  handleCheckIn(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $.ajax({
        url: "/api/v1/hunts/"+this.context.currentHuntId+"?lat="+latitude+"&lng="+longitude,
        type: "get",
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
        }
      }).done((data)=>{
        console.log('booya: ', data)
      })
    })
    console.log('check in button clicked for clue: ', this.state.game.clues)


  },
  render() {
    var clues = this.state.game.clues;
    var participants = this.state.game.participants;

    return (
      <div>
        <div className="center-align">
          <h2 id="wager">{this.state.game.wager}</h2>
          <h3 id="time">{moment(this.state.game.deadline).countdown().toString()}</h3>
        </div>



        <div className="row">
          {/* List of all User hunts + Edit|View|Delete options per hunt */}
          <div className="card-panel z-depth-5 gameview clues center-align">
            <h5 className="#7986cb indigo lighten-2"id="clues">Clues:</h5>
            <ul className="text collection">
              {/* List all clues here */}
              { clues ? clues.map((el)=> this.renderClue(el)) : console.log('no clues available') }
            </ul>
          </div>

          <div className="map">
            <Map />
          </div>

          {/* User Hunt Record + Create Hunt btn */}
          <div className="card-panel z-depth-5 gameview status center-align">
            <h5 id="clues"className="#7986cb indigo lighten-2">Player Status:</h5>
            <ul className="text collection">
              {/* List each player status here */}
              { participants ? participants.map((el)=> this.renderParticipant(el)) : console.log('no participants available') }
            </ul>
            <div>
              { this.state.game.isOwner
                  ? console.log('creator view')
                  : <button onClick={this.handleCheckIn}>Check In</button> }
            </div>
          </div>
        </div>
        {/* {this.props.children} */}
      </div>
    )
  }
});

const Clue = React.createClass({
  render() {
    return ( <li>{this.props.details.description}</li> )
  }
});

const Participant = React.createClass({
  render() {
    return (
      <div>
        {this.props.details.username}: {this.props.details.progress}
      </div>
    )
  }
});


module.exports = Gameview;
