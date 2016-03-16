# Contributing 

## Workflow

1. Create an issue in this repository explaining what feature/bug you are working on.
2. On your fork or in a separate branch, work on the feature/bug. 
3. When you are done, send a pull request to the dev branch and reference the issue/bug you made in 1.
4. Merges into dev will be made by the owner of the repository after testing it manually
5. Dev is merged into master daily

## Styleguide
Mostly uses the [ES5 airbnb styleguide](https://github.com/airbnb/javascript/tree/master/es5). With the following differences:
* Airbnb recommends one space between the function header and the first curly brace. We do not.
  ```javascript
  // Bad 
  function foo() {
    //
  }
  
  // Good 
  function bar(){
  //
  }
  ```
* ES6 Features
  * Arrow functions for callbacks. Arrowfunction bind the context of "this" lexically, so they make sense for callbacks usually.
  ```javascript
  // Example
  foo(() => {
    //
    });
  ```
  * Use const for constants
  ```javascript
  // Example
  const express = require('express');
  ```
* React
  * ES6 Style import statements to reduce the number of require statements
  ```javascript
  // Example
  import React from 'react' 
  import {Router, Link, Route, browserHistory} from 'react-router'
  ```
  * Use React.createClass syntax for making react classes
  * Use key value pairs in react classes, like regular javascript objects
  * No semi-colons on JSX blocks
  ```javascript 
  // Example
  const App = React.createClass({
    render: function(){
      return (
        <div>
          <Component />
        </div>
      );
    }
  })
  ```
  
## Commit Messages

* Use present imperative tense, e.g. Creates contributing readme
* Should fit the sentence "this commit &lt;commit message&gt;"
* Any extra information should be added to a description
* Less than 80 characters, not including the description
