// API key for map provider.
const key = 'pk.eyJ1IjoiZGFtaWFub2d1aSIsImEiOiJFbkpoNnlJIn0.jiaQb2vj0lE8tIqbdIMxtA';


// Options for map
var options = {
  lng: 7.673345599999999,
  lat: 45.074128599999995,
  zoom: 20,
  style: 'mapbox://styles/mapbox/light-v9',
  pitch: 50,
};

// Create an instance of MapboxGL
const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

//geolocation
var locationData;
var myLat;
var myLong;

//controls
var addedControl = false;
var pointSelected = false;

function setup() {

  watchPosition(positionChanged);

  canvas = createCanvas(windowWidth, windowHeight);


  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  if(geoCheck() == true){
  		//geolocation is available
  	}else{
  		//error getting geolocaion
  	}
}

// The draw loop is fully functional but we are not using it for now.
function draw() {

  clear();

  if (myLat != 0 && myLong != 0){
    var pos = myMap.latLngToPixel(myLat, myLong);

    fill(0,0,255,50);
    stroke(255);
    strokeWeight(3);


    if (dist(mouseX,mouseY,pos.x,pos.y) < 50){
      ellipse(pos.x, pos.y, 50,50);
      pointSelected = true;
    } else {
      ellipse(pos.x, pos.y, 50,30);
    }



  }



  if (myMap.map != null && addedControl == false){
    myMap.map.addControl(new mapboxgl.NavigationControl(),'bottom-right');
    addedControl = true;

    myMap.map.on('load', function() {
        // Insert the layer beneath any symbol layer.
        var layers = myMap.map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        myMap.map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': .6
            }
        }, labelLayerId);
    });
}
}
function positionChanged(position){
    print("lat: " + position.latitude);
    myLat = position.latitude;
    print("long: " + position.longitude);
    myLong = position.longitude;
}

function mousePressed(){
  if (pointSelected == true){
    var modal = createP("hey");
    modal.position(0,0);

  }
  //rect(0,0,windowWidth,windowHeight);
}
