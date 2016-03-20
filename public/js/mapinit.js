var styles =[
    {
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff4400"
            },
            {
                "saturation": -68
            },
            {
                "lightness": -4
            },
            {
                "gamma": 0.72
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0077ff"
            },
            {
                "gamma": 3.1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00ccff"
            },
            {
                "gamma": 0.44
            },
            {
                "saturation": -33
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "hue": "#44ff00"
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "gamma": 0.77
            },
            {
                "saturation": 65
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 0.11
            },
            {
                "weight": 5.6
            },
            {
                "saturation": 99
            },
            {
                "hue": "#0091ff"
            },
            {
                "lightness": -86
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -48
            },
            {
                "hue": "#ff5e00"
            },
            {
                "gamma": 1.2
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -64
            },
            {
                "hue": "#ff9100"
            },
            {
                "lightness": 16
            },
            {
                "gamma": 0.47
            },
            {
                "weight": 2.7
            }
        ]
    }
];

var wager, timer, cluedesc;
var cluesarr =[];
var cluesearch, map,clueinput,addclue,cluenumber;
var image = 'http://www.googlemapsmarkers.com/v1/009900';



// initliazes the map
function initMap() {
    cluenumber = 1;
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.580247, lng: -41.817628},
    zoom: 6,
    draggable: true,
    styles: styles
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var infoWindow = new google.maps.InfoWindow({map: map});
      infoWindow.setContent('Current Location');
      map.setCenter(pos);

      var marker = new google.maps.Marker({
            map: map,
            position: pos,
            animation: google.maps.Animation.DROP,
            label: 'A'
      });
      // marker.addListener('click', toggleBounce(marker));
      infoWindow.open(map, marker);
       });

    }

  // add clue button
  addclue = document.getElementById('addclue');
  // input value for the location of the clue
  clueinput = new google.maps.places.Autocomplete(document.getElementById('clueinput'));
  // adding places Autocomplete to the clueiput
  google.maps.event.addListener(clueinput, 'places_changed', placesSearch);
  addClick();
}

// uses google places library to auto complete the input entered by the user
function placesSearch(){
  var places = clueinput.getPlaces();
}


//plots the location of the value entered by the user
function buttonSearch(location) {

  var geocoder = new google.maps.Geocoder();
  var address = {'address': location};



  geocoder.geocode(address, function (results, status) {
    console.log(cluenumber);
    cluedesc =  document.getElementById('cluedesc').value;
    // removing all the spaces and replacing them with +
    var replacedec = cluedesc.split(' ').join('+');
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();
    var origin = new google.maps.LatLng(lat, lng);
    var label = (cluenumber++).toString();
    var clue_info = {
      'description': replacedec,
      'clue_number': label,
       'lat': lat,
       'lng': lng
     };
     // pushing the each clue in to cluesarr
     cluesarr.push(clue_info);
     // convertung cluesarr to a string
     var cluesstring = JSON.stringify(cluesarr);
     // getting the hidden div and appending input type hidden to the div to pass data to react
      $hiddenDiv = $('#hidden');
     // if the input type hidden is already there then remove it
     $('#cluesdata').remove();
     $hiddenDiv.append($('<input id="cluesdata" type="hidden" value='+cluesstring+'>'));
     // to check the status og
     if (status == google.maps.GeocoderStatus.OK) {
       map.setCenter(results[0].geometry.location);
       var marker = new google.maps.Marker({
           map: map,
           position: origin,
           animation: google.maps.Animation.DROP,
           label: label,
           icon: image
       });
     } else {
       alert("Geocode was not successful for the following reason: " + status);
     }
     // clearing the values of the clue desc and clue input for the next clue
     document.getElementById('cluedesc').value ="";
     document.getElementById('clueinput').value ="";
  });

}

//adds click to add clue button and calls buttonSearch function
function addClick() {
    clueinput = document.getElementById('clueinput');
    addclue.addEventListener("click", function(){
    var location = clueinput.value;
    buttonSearch(location);
 });
}

// for marker animation
function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// initilaze function for plotting map location by reading location from the database
function plotlocation() {
    console.log('in plot location');
    var map1 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 36.580247, lng: -41.817628},
    zoom: 6,
    draggable: true,
    styles: styles
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var infoWindow = new google.maps.InfoWindow({map: map1});
      infoWindow.setContent('Current Location');
      map1.setCenter(pos);

      var marker = new google.maps.Marker({
            map: map1,
            position: pos,
            animation: google.maps.Animation.DROP,
            label: 'A'
      });
      infoWindow.open(map1, marker);
       });
    }
    // getting the clues from database
    var cluesdb = JSON.parse($('#cluesdb').val());
    console.log(cluesdb);
    cluesdb.forEach((el)=>{
      var position = {
        lat: Number(el.lat),
        lng: Number(el.lng)
      }
      console.log('line 298 map',position);
      var label = el.clue_number.toString();
      //plot the location on the map
      var marker = new google.maps.Marker({
          map: map1,
          position: position,
          animation: google.maps.Animation.DROP,
          label: label,
          icon: image
      });
    });
  }
