'use strict'
import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../auth'

const $   = require('jquery');
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
  getInitialState() {
    return {
      game: {}
    }
  },

  componentWillMount() {
    // gets list of hunts from user token
    $.ajax({
      url: "/api/v1/hunts/"+localStorage.hid,
      type: "get",
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
      }
    }).done((data)=>{
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
      console.log('json string',cluesstring);
      var $hiddenDiv = $('#hidden');
      // remove cluesdb if it alreadt
       $('#cluesdb').remove();
      // put the clues data from the database into hiddendiv to pass it to google maps script
      $hiddenDiv.append($('<input id="cluesdb" type="hidden" value='+cluesstring+'>'));

    }).fail((error)=>{
      console.log('Gameview GET Error: ', error)
    })
  },

  componentDidMount() {
    // console.log('currently at Gameview component')
    // console.log('line12',localStorage.hid);

  },

  render() {
    return (
      <div>
        <div>
          <h2>Welcome back, username!<span>Enter time countdown here</span></h2>
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

          <div className="map">
            <Map />
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
