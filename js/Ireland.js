const moment = require('moment');

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
controls = new THREE.OrbitControls(camera);

counties = {
  Carlow: { events: [], sights: [] },
  Cavan: { events: [], sights: [] },
  Clare: { events: [], sights: [] },
  Cork: { events: [], sights: [] },
  Donegal: { events: [], sights: [] },
  Dublin: { events: [], sights: [] },
  Galway: { events: [], sights: [] },
  Kerry: { events: [], sights: [] },
  Kildare: { events: [], sights: [] },
  Kilkenny: { events: [], sights: [] },
  Laois: { events: [], sights: [] },
  Leitrim: { events: [], sights: [] },
  Limerick: { events: [], sights: [] },
  Longford: { events: [], sights: [] },
  Louth: { events: [], sights: [] },
  Mayo: { events: [], sights: [] },
  Meath: { events: [], sights: [] },
  Monaghan: { events: [], sights: [] },
  Offaly: { events: [], sights: [] },
  Roscommon: { events: [], sights: [] },
  Sligo: { events: [], sights: [] },
  Tipperary: { events: [], sights: [] },
  Waterford: { events: [], sights: [] },
  Westmeath: { events: [], sights: [] },
  Wexford: { events: [], sights: [] },
  Wicklow: { events: [], sights: [] },
  NorthernIreland: { events: [], sights: [] }
};

require("./helper.js");
require("./mapSetup.js");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var INTERSECTED = null;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

globalObject = {
  onMouseDown:function(event) {
    console.log(event);
    if(INTERSECTED) {
      const interestDiv = document.getElementById('interest');
      const placeHeading = document.getElementById('Place');
      const buttons = document.getElementById('Buttons');
      const hoverPlace = document.getElementById('hoverPlace');
      const reference = document.getElementById('reference');
      var li, link, textDiv, imageDiv, name, image, title, descriptionDiv, description, dateDiv, date, starsDiv, stars;

      if(INTERSECTED.type != "Scene") {
        hoverPlace.innerText = "";
        document.getElementById("Map").style.opacity = "0.15";
        interestDiv.style.display="block";
        window.removeEventListener("mousedown", globalObject.onMouseDown);
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        placeHeading.innerHTML=INTERSECTED.name;

        var sightsUl = document.getElementById("sights-dynamic-list");
        var eventsUl = document.getElementById("events-dynamic-list");

        while(sightsUl.firstChild){
          sightsUl.removeChild(sightsUl.firstChild);
        }

        counties[INTERSECTED.name].sights.forEach(function(entry, index) {
          li = document.createElement("li");
          li.id = index;
          li.setAttribute('class', "sightsListItem");
          link = document.createElement("a"); 
          link.href = entry.url;       
          link.target = "_blank";
          textDiv = document.createElement("div");
          textDiv.setAttribute('class', "sightsListItemInfo");
          imageDiv = document.createElement("div");
          imageDiv.setAttribute('class', "sightsListItemImageDiv");
          name = document.createTextNode(entry.name);
          stars = entry.rating > 0 ? document.createTextNode(entry.rating + "\u{272D}".repeat(Math.round(entry.rating))) : document.createTextNode("");
          image = document.createElement("img");
          image.setAttribute('class', "sightsListItemImage");
          image.src = entry.imageUrl;
          title = document.createElement("div");
          title.appendChild(name);
          title.setAttribute('class', "sightsListItemTitle");
          starsDiv = document.createElement("div");
          starsDiv.appendChild(stars);
          starsDiv.setAttribute('class', "sightsListItemStars");
          textDiv.appendChild(title);
          textDiv.appendChild(starsDiv);
          imageDiv.appendChild(image);
          link.appendChild(textDiv);
          link.appendChild(imageDiv);
          li.appendChild(link);
          li.appendChild(link);
          sightsUl.appendChild(li);
        });

        while(eventsUl.firstChild){
          eventsUl.removeChild(eventsUl.firstChild);
        }

        counties[INTERSECTED.name].events.forEach(function(entry, index) {
          li = document.createElement("li");
          li.id = index;
          li.setAttribute('class', "sightsListItem");
          link = document.createElement("a"); 
          link.href = entry.url;       
          link.target = "_blank";
          textDiv = document.createElement("div");
          textDiv.setAttribute('class', "sightsListItemInfo");
          imageDiv = document.createElement("div");
          imageDiv.setAttribute('class', "sightsListItemImageDiv");
          name = document.createTextNode(entry.name);
          description = document.createTextNode(entry.description);
          // var dateString = moment(entry.time).format("ddd, MMM Do HH:mm");
          date = document.createTextNode(moment(entry.time).format("ddd, MMM D h:mmA").toUpperCase());
          image = document.createElement("img");
          image.setAttribute('class', "sightsListItemImage");
          image.src = entry.imageUrl;

          title = document.createElement("div");
          title.appendChild(name);
          title.setAttribute('class', "sightsListItemTitle");

          dateDiv = document.createElement("div");
          dateDiv.appendChild(date);
          dateDiv.setAttribute('class', "sightsListItemTime");

          descriptionDiv = document.createElement("div");
          descriptionDiv.appendChild(description);
          descriptionDiv.setAttribute('class', "sightsListItemDescription");

          textDiv.appendChild(title);
          textDiv.appendChild(dateDiv);
          textDiv.appendChild(descriptionDiv);
          
          imageDiv.appendChild(image);
          link.appendChild(textDiv);
          link.appendChild(imageDiv);
          li.appendChild(link);
          li.appendChild(link);
          eventsUl.appendChild(li);
        });
      }
    }
  }
}

function gotData(data) {
  data = data.val();
  const information =document.getElementById('informationText');
  const events =document.getElementById('events');
  const sights =document.getElementById('sights');
  const text = data.Information.text;
  const sentences = text.replace(/(\S\.)\s*([A-Z])/g, "$1\n\n$2");
  information.innerText = sentences;
  events.innerText = data.Events;
  

  if(data.Information.reference ) {
    reference.href = data.Information.reference;
  }
}

function errData(err) {
  console.log(err);
}

function onMouseMove(event) {
  const interestDiv = document.getElementById('interest');
  const hoverPlace = document.getElementById('hoverPlace');
  const hoverPlaceSights = document.getElementById('hoverPlaceSights');
  const hoverPlaceEvents = document.getElementById('hoverPlaceEvents');
  const hoverPlaceContainer = document.getElementById('hoverPlaceContainer');

  if(interestDiv.style.display != 'block') {
    // calculate mouse position in normalized coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (var i=0; i < intersects.length; i++) {

      if(intersects[i].object != INTERSECTED) {

        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED != null) { 
          INTERSECTED.material[0].color.setHex(INTERSECTED.currentHex);
          INTERSECTED.position.y = 0;
          INTERSECTED = null;
        }

        // store reference to closest object as current intersection object
        if(intersects[0].object.type != "Scene") {
          //hoverPlaceContainer.style.backgroundColor = "blue";
          hoverPlaceContainer.style.left = event.clientX + "px";
          hoverPlaceContainer.style.top = event.clientY + "px";
          INTERSECTED = intersects[0].object;
          // store color of closest object (for later restoration)
          INTERSECTED.currentHex = INTERSECTED.material[0].color.getHex();
          // set a new color for closest object
          INTERSECTED.material[0].color.setHex(0x40f7ee);
          hoverPlace.innerText = INTERSECTED.name;
          hoverPlaceSights.innerText = `${counties[INTERSECTED.name].sights.length} Sights`;
          hoverPlaceEvents.innerText = `${counties[INTERSECTED.name].events.length} Nearby Events`;
          hoverPlaceContainer.style.display = 'block';

        } else {
          hoverPlaceContainer.style.display = 'none';
        }
      } else {
        // there are no intersections
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED) {

          INTERSECTED.material[0].color.setHex( INTERSECTED.currentHex );
          hoverPlaceContainer.style.display = 'none';         
        }

        INTERSECTED = null;
      }
    }
  }
}

function render() {
  controls.update();
  requestAnimationFrame(render);

  if(INTERSECTED) {
    INTERSECTED.position.y = 0.2;
  }

  renderer.render(scene, camera);
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mousedown", globalObject.onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
