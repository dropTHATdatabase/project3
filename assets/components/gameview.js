'use strict'
import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../auth'

const $   = require('jquery');
const moment = require('moment');
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
      // console.log('json string',cluesstring);
      var $hiddenDiv = $('#hidden');
      // console.log('hidden div ', $hiddenDiv);
      // remove cluesdb if it alreadt
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
      // console.log(position.coords.latitude, position.coords.longitude)
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
  
    // gets current location
    // $.ajax({
    //   url: "/api/v1/hunts"
    //   type: "get",
    // })
    console.log('check in button clicked for clue: ', this.state.game.clues)

    // $.ajax({
    //   url: "/api/v1/hunts/1/clues/"+this.state.game.clues,
    //   type: "PUT",
    //   beforeSend: function( xhr ) {
    //     xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
    //   }
    // }).done((data)=>{
    //   console.log('you get: ', data)
    // })

  },
  render() {
    var clues = this.state.game.clues;
    var participants = this.state.game.participants;
    // console.log('clues: ', this.state.game.clues)
    // console.log('participants: ', this.state.game.participants)
    return (
      <div>
        <h2>
          <span>{this.state.game.wager}</span>
          <span>Deadline: {moment(this.state.game.deadline).fromNow()}</span>
        </h2>
        <div className="row">
          {/* List of all User hunts + Edit|View|Delete options per hunt */}
          <div className="gameview clues">
            <h5>Clues:</h5>
            <ul>
              {/* List all clues here */}
              { clues ? clues.map((el)=> this.renderClue(el)) : console.log('no clues available') }
            </ul>  
          </div>

          <div className="map">
            <Map />
          </div>

          {/* User Hunt Record + Create Hunt btn */}
          <div className="gameview status">
            <h5>Player Status:</h5>
            <div>
              {/* List each player status here */}
              { participants ? participants.map((el)=> this.renderParticipant(el)) : console.log('no participants available') }
            </div>
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
