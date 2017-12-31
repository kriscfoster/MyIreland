scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
controls = new THREE.OrbitControls(camera);
controls.target.y -= 0.8;
controls.target.z = 2;
require("./helper.js");
require("./mapSetup.js");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var INTERSECTED = null;

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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
  if(INTERSECTED) {
    const interestDiv = document.getElementById('interest');
    const placeHeading = document.getElementById('Place');
    const buttons = document.getElementById('Buttons');
    const hoverPlace = document.getElementById('hoverPlace');
    const reference = document.getElementById('reference');
    var li, link, textDiv, imageDiv, name, image, title, descriptionDiv, description, dateDiv, date;

    if(INTERSECTED.type != "Scene") {
      hoverPlace.innerText = "";
      document.getElementById("Map").style.opacity = "0.15";
      interestDiv.style.display="block";
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
        link.href = entry.link;       
        link.target = "_blank";
        textDiv = document.createElement("div");
        textDiv.setAttribute('class', "sightsListItemInfo");
        imageDiv = document.createElement("div");
        imageDiv.setAttribute('class', "sightsListItemImageDiv");
        name = document.createTextNode(entry.name);
        image = document.createElement("img");
        image.setAttribute('class', "sightsListItemImage");
        image.src = entry.imageUrl;
        title = document.createElement("div");
        title.appendChild(name);
        title.setAttribute('class', "sightsListItemTitle");
        textDiv.appendChild(title);
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
        link.href = entry.link;       
        link.target = "_blank";
        textDiv = document.createElement("div");
        textDiv.setAttribute('class', "sightsListItemInfo");
        imageDiv = document.createElement("div");
        imageDiv.setAttribute('class', "sightsListItemImageDiv");
        name = document.createTextNode(entry.name);
        description = document.createTextNode(entry.description);
        date = document.createTextNode("11/12/18");
        image = document.createElement("img");
        image.setAttribute('class', "sightsListItemImage");
        image.src = entry.imageUrl;

        title = document.createElement("div");
        title.appendChild(name);
        title.setAttribute('class', "sightsListItemTitle");

        dateDiv = document.createElement("div");
        dateDiv.appendChild(date);
        dateDiv.setAttribute('class', "sightsListItemTitle");

        descriptionDiv = document.createElement("div");
        descriptionDiv.appendChild(description);
        descriptionDiv.setAttribute('class', "sightsListItemTitle");

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

function gotData(data) {
  data = data.val();
  const information =document.getElementById('informationText');
  const events =document.getElementById('events');
  const sights =document.getElementById('sights');
  const text = data.Information.text;
  const sentences = text.replace(/(\S\.)\s*([A-Z])/g, "$1\n\n$2");
  information.innerText = sentences;
  events.innerText = data.Events;
  
  var ul = document.getElementById("dynamic-list");

  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }

  data.Sights.forEach(function(entry, index) {
    var li, aLink, textDiv, imageDiv, name, image, title;
    li = document.createElement("li");
    li.id = index;
    li.setAttribute('class', "sightsListItem");
    aLink = document.createElement("a"); 
    aLink.href = entry.link;       
    aLink.target = "_blank";
    textDiv = document.createElement("div");
    textDiv.setAttribute('class', "sightsListItemInfo");
    imageDiv = document.createElement("div");
    imageDiv.setAttribute('class', "sightsListItemImageDiv");
    name = document.createTextNode(entry.name);
    image = document.createElement("img");
    image.setAttribute('class', "sightsListItemImage");
    image.src = entry.imageUrl;
    title = document.createElement("div");
    title.appendChild(name);
    title.setAttribute('class', "sightsListItemTitle");
    textDiv.appendChild(title);
    imageDiv.appendChild(image);
    aLink.appendChild(textDiv);
    aLink.appendChild(imageDiv);
    li.appendChild(aLink);
    li.appendChild(aLink);
    ul.appendChild(li);
  });

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
          INTERSECTED.material[0].color.setHex(0xff2d2d);
          hoverPlace.innerText = INTERSECTED.name;
        //  console.log(INTERSECTED);
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
    INTERSECTED.position.y = 0.15;
  }

  renderer.render(scene, camera);
};

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousedown", onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
