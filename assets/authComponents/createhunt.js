
const React = require('react');
const auth = require('../auth');

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
       xhr.setRequestHeader("Authorization", auth.getToken() );
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
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

module.exports = Createhunt;
