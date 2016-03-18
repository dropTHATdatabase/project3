
const React = require('react');
const auth = require('../auth');

const Map = React.createClass({
  componentDidMount : function() {
   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2U33goCrZ0Hilh_cdksT1_F8jBgUTl4w&libraries=places&callback=initMap');
  },

  render : function() {
    let divstyle ={
      height: "400px",
      width: "680px",
      margin: '0 auto',
      position: 'relative'

    }

    let sectionstyle ={
      position: 'relative',
      left: '11em'
    }
    return (
      <section style={sectionstyle}>
        <div id="map" style={divstyle}>

        </div>
    </section>
    )
  }
});

const Searchbar = React.createClass({
  render: function() {
    return (

    <div id="hunt-form">

          <label htmlFor="wager">Scavenger Hunt Wager: </label>
          <input id="wager"type="text" placeholder="Enter Wager" />

          <label htmlFor="timer">Set Timer: </label>
          <input id="timer"type="datetime-local" placeholder="Set Timer" />

          <label htmlFor="cluedesc">Clue Description: </label>
          <input id="cluedesc"type="text" placeholder="Clue Description" />

          <label htmlFor="clueinput">Clue Location</label>
          <input id="clueinput" type="text" placeholder="Enter a Clue location" />

          <button id="addclue">Add Clue</button>
          <button id="startgame">Start Game</button>

      </div>

    );
  }
});


const Createhunt = React.createClass({

  getInitialState: function() {
    return {
      me:''
    }
  },
  welcome: function(event) {
    event.preventDefault();
    $.ajax({
     url: 'users/me',
     beforeSend: function( xhr ) {
       xhr.setRequestHeader("Authorization", "Bearer" + auth.getToken() );
     }
    }).done((data) => {
     console.log();
     this.setState({me: data.agent.email})
     console.log(this.state);
    })

  },
  render() {
    const token = auth.getToken()
    const state = this.state.me
    return (
      <div>
        <Map />
        <Searchbar />
      </div>
    )
  }
})

module.exports = Createhunt;
