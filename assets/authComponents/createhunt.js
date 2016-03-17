
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
      </div>
    )
  }
})

module.exports = Createhunt;
