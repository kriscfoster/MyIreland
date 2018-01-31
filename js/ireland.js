const moment = require('moment');
const originTarget = { x: 0.0, y: 0.0, z: 0.0 };

scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
camera = new THREE.PerspectiveCamera(75, (window.innerWidth * 0.70) / window.innerHeight, 0.1, 1000);
controls = new THREE.OrbitControls(camera);
controls.maxDistance = 30;
controls.minDistance = 3;

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
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var INTERSECTED = null;
var TARGET = originTarget;
var zoomedAtTarget = false;

function onWindowResize() {
  camera.aspect = window.innerWidth * 0.70 / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.70, window.innerHeight);
}

globalObject = {
  onMouseDown:function(event) {
    console.log(event.target);
    if (event.target.id === "Map" || event.target.id === "hoverPlaceContainer" || event.target.id === "hoverPlaceInfo") {
      if (INTERSECTED) {
        window.speechSynthesis.cancel();
        if (INTERSECTED.type === "Scene") {
          document.getElementById('homeView').style.display = 'block';
          document.getElementById("interest").style.display = "none";
          document.getElementById("closeButton").style.display="none";
          TARGET = originTarget;
          zoomedAtTarget = false;
          scene.children.forEach((child) => {
            child.visible = true;
          });
        } else if (INTERSECTED.type === "Place") {
          var li, link, textDiv, imageDiv, name, image, title, descriptionDiv, description, dateDiv, date, starsDiv, stars, reference;
          const interestDiv = document.getElementById('interest');
          const placeHeading = document.getElementById('Place');
          const buttons = document.getElementById('Buttons');
          const hoverPlace = document.getElementById('hoverPlace');
          document.getElementById('homeView').style.display = 'none';
          interestDiv.style.display = "block";
          document.getElementById("readButton").style.display = "inline-block";
          document.getElementById("pauseButton").style.display = "none";
          document.getElementById("stopButton").style.display = "none";
          document.getElementById("closeButton").style.display="block";
          TARGET = INTERSECTED.geometry.boundingSphere.center;
          zoomedAtTarget = true;
          scene.children.forEach((child) => {
            if((child.type === 'Place' && child.name !== INTERSECTED.name) || (child.type === "Sight" && child.county !== INTERSECTED.name)) {
              child.visible = false;
            }
          });

          placeHeading.innerHTML=INTERSECTED.name;
          var sightsUl = document.getElementById("sights-dynamic-list");
          var eventsUl = document.getElementById("events-dynamic-list");
          const informationUl =document.getElementById('information-dynamic-list');

          while (informationUl.firstChild) {
            informationUl.removeChild(informationUl.firstChild);
          }

          counties[INTERSECTED.name.replace(/\s/g, '')].information.summary.forEach(function(entry, index) {
            li = document.createElement("li");
            li.id = index;
            li.setAttribute('class', "informationListItem");
            fact = document.createTextNode(entry);
            li.appendChild(fact);
            informationUl.appendChild(li);
          });

          li = document.createElement("li");
          li.setAttribute('class', "informationListItem");
          fact = document.createTextNode("This information was summarised using Gensim's Summarisation tool but it originally came from ");
          li.appendChild(fact);
          reference = document.createElement("a");
          reference.appendChild(document.createTextNode("here"));
          reference.href = counties[INTERSECTED.name.replace(/\s/g, '')].information.link;
          reference.target= "_blank";
          li.appendChild(reference);
          informationUl.appendChild(li);

          while(sightsUl.firstChild){
            sightsUl.removeChild(sightsUl.firstChild);
          }

          counties[INTERSECTED.name.replace(/\s/g, '')].sights.forEach(function(entry, index) {
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

          counties[INTERSECTED.name.replace(/\s/g, '')].events.forEach(function(entry, index) {
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
      if (INTERSECTED) {
        if(INTERSECTED.type === "Place") {
          scene.children.forEach((sight) => {
            if(sight.type === "Place" || sight.type === "Sight") {
              sight.position.y = 0;
            }
          });

          INTERSECTED = null;
        } else if (INTERSECTED.type === "Sight") {
          INTERSECTED.position.y = 0;
        }
      }

      INTERSECTED = intersects[0].object;


      if(INTERSECTED.type === "Place" && !zoomedAtTarget) {
        INTERSECTED.position.y = 0.3;

        scene.children.forEach((sight) => {
          if(sight.type === "Sight" && sight.county === INTERSECTED.name) {
            sight.position.y = 0.3;
          }
        });

        hoverPlaceContainer.style.left = event.clientX + "px";
        hoverPlaceContainer.style.top = event.clientY + "px";
        hoverPlace.innerText = INTERSECTED.name;
        hoverPlaceSights.innerText = `${counties[INTERSECTED.name.replace(/\s/g, '')].sights.length} Sights`;
        hoverPlaceEvents.innerText = `${counties[INTERSECTED.name.replace(/\s/g, '')].events.length} Nearby Events`;
        hoverPlaceContainer.style.display = 'block';

      } else if (INTERSECTED.type === "Sight") {
        const hoveredSight = INTERSECTED;
        hoveredSight.position.y = 0.3;

        if (!zoomedAtTarget) {
          scene.children.forEach((sight) => {
            if(sight.name === hoveredSight.county) {
              INTERSECTED = sight;
              INTERSECTED.position.y = 0.3;
            } else if(sight.county === hoveredSight.county) {
              sight.position.y = 0.3;
            }
          });

          hoverPlaceContainer.style.left = event.clientX + "px";
          hoverPlaceContainer.style.top = event.clientY + "px";
          hoverPlace.innerText = INTERSECTED.name;
          hoverPlaceSights.innerText = `${counties[INTERSECTED.name.replace(/\s/g, '')].sights.length} Sights`;
          hoverPlaceEvents.innerText = `${counties[INTERSECTED.name.replace(/\s/g, '')].events.length} Nearby Events`;
          hoverPlaceContainer.style.display = 'block';
        } else {
          hoverPlaceContainer.style.left = event.clientX + "px";
          hoverPlaceContainer.style.top = event.clientY + "px";
          hoverPlace.innerText = hoveredSight.name;
          hoverPlaceSights.innerText = '';
          hoverPlaceEvents.innerText = '';
          hoverPlaceContainer.style.display = 'block';
        }
      } else {
        hoverPlaceContainer.style.display = 'none';
      }
    } else {
      // There are no intersections
      if (INTERSECTED) {
        if (INTERSECTED.type == "Place") {
          hoverPlaceContainer.style.display = 'none';  
        }       
      }
    }
  }
}

function render() {

  if (TARGET) {
    if (Math.abs(controls.target.x - TARGET.x) > 0.2) {
      if (controls.target.x - TARGET.x < 0.0 ) {
        controls.target.x += 0.1;
      } else {
        controls.target.x -= 0.1;
      }
    }

    if (Math.abs(controls.target.y - TARGET.y) > 0.2) {
      if (controls.target.y - TARGET.y < 0.0 ) {
        controls.target.y += 0.1;
      } else {
        controls.target.y -= 0.1;
      }
    }

    if (Math.abs(controls.target.z - TARGET.z) > 0.2) {
      if (controls.target.z - TARGET.z < 0.0 ) {
        controls.target.z += 0.1;
      } else {
        controls.target.z -= 0.1;
      }
    }

    if (TARGET != originTarget) {
      if (camera.position.length() > 7) {
          controls.dIn(1.02);
      } else {
        if ((Math.abs(controls.target.x - TARGET.x) <= 0.2) && (Math.abs(controls.target.y - TARGET.y) <= 0.2) && (Math.abs(controls.target.z - TARGET.z) <= 0.2)) {
          TARGET = null;
        }
      }
    } else {
      if (camera.position.length() < 16) {
          controls.dOut(1.02);
      } else {
        if ((Math.abs(controls.target.x - TARGET.x) <= 0.2) && (Math.abs(controls.target.y - TARGET.y) <= 0.2) && (Math.abs(controls.target.z - TARGET.z) <= 0.2)) {
          TARGET = null;
        }
      }
    }
  }

  controls.update();
  requestAnimationFrame(render);


  renderer.render(scene, camera);
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mousedown", globalObject.onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
