import { browserHistory, Router, Route, Link } from 'react-router'
const React = require('react');
const auth = require('../auth');
const Gameview = require('./gameview.js');

const Map = React.createClass({
  componentDidMount : function() {
   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2U33goCrZ0Hilh_cdksT1_F8jBgUTl4w&libraries=places&callback=initMap');
  },
  render : function() {
    let divstyle ={
      height: "600px",
      width: "680px",
      margin: '0 auto',
      position: 'relative'
    }
    let sectionstyle ={
      position: 'relative',
      left: '13em',
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

const Huntform = React.createClass({
  getInitialState: function() {
    return {
      hunt: {
        wager:'',
        deadline:'',
        participants:[],   // by user_id
        clues:[]
      },
      data:{}  // capture all the users with their ids from the database
    }
  },

  componentDidMount:function() {
    $.ajax({
      url:'/api/v1/users',
      method: 'GET',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done((result)=>{
        result.data.forEach((el)=>{
          this.state.data[el.user_id] = el.username;
      })
      this.setState({data: this.state.data});
    })
  },

  handleSubmit: function(event) {
    event.preventDefault();

    // get the hidden in input field which has all the clues data
    var cluesarr =JSON.parse($('#cluesdata').val());

    // replacing the + in clue description with spaces
    cluesarr.forEach((el)=>{
      el.description= el.description.split('+').join(' ');
    })

    // have to set up logic if there are no clues, setting it to undefined does not work
    if(typeof(cluesarr) === null){
      alert('Please enter clues');
    } else {
      // setting the state of the clues
      this.state.hunt.clues = cluesarr;

      // setting the state of the wager
      var wager = this.refs.wager.value;
      this.state.hunt.wager = wager;

      // setting the state of th deadline
      var timer = this.refs.timer.value ;
      this.state.hunt.deadline = timer;

      // setting the state of participants by grabbing all the checkboxes that are checked
      var boxes = $(":checkbox:checked");
      var participants =[];
       boxes.each(function(){
         participants.push(($(this).val()));
       })
       this.state.hunt.participants = participants.map((el)=>{
         return parseInt(el);
       });

       this.setState({hunt:this.state.hunt});

      var newhunt = this.state.hunt;
      console.log('new hunt to be added to the database',newhunt);
      $.ajax({
        url:'/api/v1/hunts',
        method: 'POST',
        data: JSON.stringify(newhunt),
        contentType: 'application/json',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken());
        }
      }).done((result)=>{
         console.log('line118',result);
         console.log('line119',result.data.hunt_id);
         localStorage.hid = result.data.hunt_id;
         console.log('hunt created');
         localStorage.hid = result.data.hunt_id;
       }).fail((data)=>{
         console.log('error in creating  hunt');
       })

    }

  },

  render: function() {

    var options =[]
    var users = this.state.data;
    var count=0;

    Object.keys(users).forEach((el)=>{
      count++;
      var id=`checkbox${count}`
      var v = users[el];
       options.push(<p key={el}>{v} <input key={el} index={el} id={id} type="checkbox" value={el} /></p>)
    })

    return (
      <div id="hunt-form">
        <form id="participants" onSubmit={this.handleSubmit}>
          <label htmlFor="cluedesc">Clue Description: </label>
          <input id="cluedesc"type="text" placeholder="Clue Description" />

          <label htmlFor="clueinput">Clue Location</label>
          <input id="clueinput" type="text" placeholder="Enter a Clue location" />

          <div className="huntinfo">
            <label htmlFor="wager">Scavenger Hunt Wager: </label>
            <input id="wager"type="text" placeholder="Enter Wager"ref="wager" required />

            <label htmlFor="timer">Set Timer: </label>
            <input id="timer"type="datetime-local" placeholder="Set Timer" ref="timer" required/>

            Add Members:
            {options}
          <button  className="waves-effect waves-light btn"id="creategame">Create Game</button>
          </div>
        </form>
          <button  className="waves-effect waves-light btn"id="addclue">Add Clue</button>
          <Link to="/gameview"><button  className="waves-effect waves-light btn"id="startgame">Start Game</button></Link>
      </div>
    );
  }
});


const Createhunt = React.createClass({
  // set context from parent component  
  contextTypes: {
    setCurrentHuntId: React.PropTypes.func,
    currentHuntId: React.PropTypes.number,
    router: React.PropTypes.object.isRequired
  },

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
        <Huntform />
      </div>
    )
  }
})

module.exports =  {
  Createhunt: Createhunt,
  Huntform: Huntform
}
