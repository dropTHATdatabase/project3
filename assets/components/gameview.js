'use strict'
import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import auth from '../auth'

const $   = require('jquery');
const Nav = require('./nav.js');
const Createhunt = require('./createhunt.js');

const Gameview = React.createClass({
  componentDidMount() {
    console.log('currently at Gameview component')
  },

  render() {
    return (
      <div>
        <Nav />
        <div>At Gameview component, son!</div>
      </div>
    )
  }
})

module.exports = Gameview;
