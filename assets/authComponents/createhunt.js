const React = require('react');
const auth = require('../auth');

const Map = React.createClass({
  componentDidMount : function() {
   loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2U33goCrZ0Hilh_cdksT1_F8jBgUTl4w&callback=initMap');
  },

  render : function() {
    let style ={
      height: "400px",
      width: "550px",
      margin: "0 auto"
    }
    return (
      <section style={{height: "50%", width:"50%"}}>
        <div id="map" style={style}>

        </div>
    </section>
    )
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
        <p>{token}</p>
        <Map />
      </div>
    )
  }
})

module.exports = Createhunt;
