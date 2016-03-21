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

// initliazes the map
function initMap() {
    cluenumber = 1;
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.580247, lng: -41.817628},
    zoom: 12,
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

       var markercurrent = new google.maps.Marker({
            map: map,
            position: pos,
            animation: google.maps.Animation.DROP,
            icon: {
                    url: '../css/mapicon.svg',
                    scaledSize: new google.maps.Size(30, 40),
                    anchor: new google.maps.Point(20, 58)
                    },
           labelAnchor: new google.maps.Point(10, 10)
      });

      console.log('line 174');
      infoWindow.open(map, markercurrent);
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
       var markerclues = new google.maps.Marker({
           map: map,
           position: origin,
           animation: google.maps.Animation.DROP,
           label: label,
           icon: {
                   url: '../css/squat_marker_green.svg',
                   scaledSize: new google.maps.Size(40, 40),
                   anchor: new google.maps.Point(20, 58)
                   },
           });
           var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
             content:"<h6>Clue "+label+" "+cluedesc+"</h6><p>"+location+"</p>" // HTML contents of the InfoWindow
           });

            google.maps.event.addListener(markerclues, 'click', function() { // Add a Click Listener to our marker
             infowindow.open(map,markerclues); // Open the InfoWindow
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

// initilaze function for plotting map location by reading location from the database
function plotlocation() {

    var map1 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: 36.580247, lng: -41.817628},
    zoom: 12,
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

      var markerplot = new google.maps.Marker({
            map: map1,
            position: pos,
            animation: google.maps.Animation.DROP,
            icon: {
                    url: '../css/mapicon.svg',
                    scaledSize: new google.maps.Size(30, 40),
                    anchor: new google.maps.Point(20, 58)
                    },
           labelAnchor: new google.maps.Point(10, 10)
      });
      infoWindow.open(map1, markerplot);
       });
    }

      // getting the clues from database
      var cluesdb = JSON.parse($('#cluesdb').val());
      cluesdb.forEach((el)=>{
        var desc = el.desc.split('+').join(' ');
        var position = {
          lat: Number(el.lat),
          lng: Number(el.lng)
        };
        console.log('line 298 map',position);
        var label = el.clue_number.toString();
        //plot the location on the map
        var markergame = new google.maps.Marker({
            map: map1,
            position: position,
            animation: google.maps.Animation.DROP,
            label: label,
            icon: {
                    url: '../css/squat_marker_green.svg',
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 58)
                    }
            });
            var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
              content:"<h6>Clue"+label +"</h6><p>"+desc+"</p>" // HTML contents of the InfoWindow
            });
            console.log(infowindow);

             google.maps.event.addListener(markergame, 'click', function() { // Add a Click Listener to our marker
             console.log('in maps event');
              infowindow.open(map1,markergame); // Open the InfoWindow
            });
      });
  }
