
import { default as React, Component } from "react";
import { GoogleMap } from "react-google-maps";

//Google maps component
// var Map = React.createClass({
//
//   //Render search input
//   render: function() {
//     return (
//       <div id="map">
//         <p>Map Goes here</p>
//       </div>
//     );
//   }
// });

// module.exports = Map;
export default class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      />
    );
  }
}
