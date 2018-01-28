const moment = require('moment');

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
camera = new THREE.PerspectiveCamera(75, (window.innerWidth * 0.70) / window.innerHeight, 0.1, 1000);
controls = new THREE.OrbitControls(camera);

counties = {
  Carlow: { events: [], sights: [], information: {} },
  Cavan: { events: [], sights: [], information: {} },
  Clare: { events: [], sights: [], information: {} },
  Cork: { events: [], sights: [], information: {} },
  Donegal: { events: [], sights: [], information: {} },
  Dublin: { events: [], sights: [], information: {} },
  Galway: { events: [], sights: [], information: {} },
  Kerry: { events: [], sights: [], information: {} },
  Kildare: { events: [], sights: [], information: {} },
  Kilkenny: { events: [], sights: [], information: {} },
  Laois: { events: [], sights: [], information: {} },
  Leitrim: { events: [], sights: [], information: {} },
  Limerick: { events: [], sights: [], information: {} },
  Longford: { events: [], sights: [], information: {} },
  Louth: { events: [], sights: [], information: {} },
  Mayo: { events: [], sights: [], information: {} },
  Meath: { events: [], sights: [], information: {} },
  Monaghan: { events: [], sights: [], information: {} },
  Offaly: { events: [], sights: [], information: {} },
  Roscommon: { events: [], sights: [], information: {} },
  Sligo: { events: [], sights: [], information: {} },
  Tipperary: { events: [], sights: [], information: {} },
  Waterford: { events: [], sights: [], information: {} },
  Westmeath: { events: [], sights: [], information: {} },
  Wexford: { events: [], sights: [], information: {} },
  Wicklow: { events: [], sights: [], information: {} },
  NorthernIreland: { events: [], sights: [], information: {} }
};

require("./helper.js");
require("./mapSetup.js");
console.log(scene);
console.log("ssdfdfdsfds");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var INTERSECTED = null;

function onWindowResize() {
  camera.aspect = window.innerWidth * 0.70 / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.70, window.innerHeight);
}

globalObject = {
  onMouseDown:function(event) {
    if(INTERSECTED) {
      document.getElementById('homeView').style.display = 'none';
      document.getElementById("interest").style.display = "block";
      document.getElementById("closeButton").style.display="block";
      const interestDiv = document.getElementById('interest');
      const placeHeading = document.getElementById('Place');
      const buttons = document.getElementById('Buttons');
      const hoverPlace = document.getElementById('hoverPlace');
      const reference = document.getElementById('reference');
      var li, link, textDiv, imageDiv, name, image, title, descriptionDiv, description, dateDiv, date, starsDiv, stars;

      if(INTERSECTED.type != "Scene") {

        placeHeading.innerHTML=INTERSECTED.name;

        var sightsUl = document.getElementById("sights-dynamic-list");
        var eventsUl = document.getElementById("events-dynamic-list");
        const informationUl =document.getElementById('information-dynamic-list');
        reference.href = counties[INTERSECTED.name].information.link;

        while (informationUl.firstChild) {
          informationUl.removeChild(informationUl.firstChild);
        }

        counties[INTERSECTED.name].information.summary.forEach(function(entry, index) {
          li = document.createElement("li");
          li.id = index;
          li.setAttribute('class', "informationListItem");
          fact = document.createTextNode(entry);
          li.appendChild(fact);
          informationUl.appendChild(li);
        });

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

function onMouseMove(event) {
  const hoverPlace = document.getElementById('hoverPlace');
  const hoverPlaceSights = document.getElementById('hoverPlaceSights');
  const hoverPlaceEvents = document.getElementById('hoverPlaceEvents');
  const hoverPlaceContainer = document.getElementById('hoverPlaceContainer');

  // calculate mouse position in normalized coordinates
  mouse.x = (event.clientX / (window.innerWidth * 0.70)) * 2 - 1;
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
        INTERSECTED.material[0].color.setHex(0xffffff);
        hoverPlace.innerText = INTERSECTED.name;
        hoverPlaceSights.innerText = `${counties[INTERSECTED.name].sights.length} Sights`;
        hoverPlaceEvents.innerText = `${counties[INTERSECTED.name].events.length} Nearby Events`;
        hoverPlaceContainer.style.display = 'block';

      } else {
        hoverPlaceContainer.style.display = 'none';
      }
    } else {
      // there are no intersections
      if (INTERSECTED) {
        INTERSECTED.material[0].color.setHex( INTERSECTED.currentHex );
        hoverPlaceContainer.style.display = 'none';         
      }

      INTERSECTED = null;
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
