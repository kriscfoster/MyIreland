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

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
  // calculate mouse position in normalized coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (var i = 0; i < intersects.length; i++) {
    if(intersects[i]) {
      const interestDiv = document.getElementById('interest');
      const placeHeading = document.getElementById('Place');
      const information =document.getElementById('informationText');
      const events =document.getElementById('events');
      const sights =document.getElementById('sights');
      const buttons = document.getElementById('Buttons');
      const hoverPlace = document.getElementById('hoverPlace');
      const reference = document.getElementById('reference');

      if(intersects[i].object.type != "Scene") {
        console.log(intersects[i].object);
        hoverPlace.innerText = "";
        document.getElementById("Map").style.opacity = "0.15";
        interestDiv.style.display="block";
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        placeHeading.innerHTML=intersects[i].object.name;
        const ref = database.ref(intersects[i].object.name);
        ref.once('value', gotData, errData);

        if(intersects[i].object.type === "Place") {
          buttons.style.display = "inline-block";
        } else {
          buttons.style.display = "none";
        }
      }

      function gotData(data) {
        data = data.val();
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
    }
  }
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
      if(intersects[i].object != INTERSECTED ) {

        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED != null) { 
          INTERSECTED.material[0].color.setHex(INTERSECTED.currentHex);
          //hoverPlace.innerText = "";
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
          INTERSECTED.material[0].color.setHex(0xffff00);
          hoverPlace.innerText = INTERSECTED.name;
          console.log(INTERSECTED);
          hoverPlaceContainer.style.display = 'block';
          INTERSECTED.translateY(0.01);

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
  renderer.render(scene, camera);
};

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousedown", onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
