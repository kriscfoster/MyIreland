const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const loader = new THREE.JSONLoader();
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.3);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
controls = new THREE.OrbitControls(camera);
var INTERSECTED = null;

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const database = firebase.database();

renderer.domElement.id = 'Map';
renderer.setSize(window.innerWidth, window.innerHeight);
controls.maxDistance = 20;
controls.minDistance = 4;
scene.add(hemisphereLight)
scene.add(directionalLight);
camera.position.z = 15;

loader.load('../res/Ireland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Ireland";
    object.type = "Scene";
    object.rotation.x = 1;
    directionalLight.target = object;
    scene.add(object);
  }
);

loader.load('../res/sea.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Sea";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/Sun.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Scene";
    scene.add(object);
  }
);

loader.load('../res/MyIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Giants Causeway";
    object.type = "Scene";
    scene.add(object);
  }
);

// loader.load('../res/compus.json', 
//   function (geometry, materials) {
//     const object = new THREE.Mesh(geometry, materials);
//     object.rotation.x = 1;
//     object.name = "The Giants Causeway";
//     object.type = "Scene";
//     scene.add(object);
//   }
// );

loader.load('../res/spire.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Spire";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/DublinLabel.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Dublin";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/CorkLabel.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Cork";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/GalwayLabel.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Galway";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/BelfastLabel.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Belfast";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/NewGrange.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Newgrange";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/GiantsCauseway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Giants Causeway";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/theHillOfTara.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Hill Of Tara";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/croughPatrick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Crough Patrick";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/theRingOfKerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Ring of Kerry";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/theCliffsOfMoher.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Cliffs of Moher";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/theRockOfCashal.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Rock of Cashal";
    object.type = "Sight";
    scene.add(object);
  }
);

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
        information.innerText = data.Information.text;
        //sights.innerText = data.Sights;
        events.innerText = data.Events;
        
        var ul = document.getElementById("dynamic-list");

        while(ul.firstChild){
          ul.removeChild(ul.firstChild);
        }

        data.Sights.forEach(function(entry, index) {
          var li = document.createElement("li");
          li.id = index;

          if(index == 0) {
            li.setAttribute('class', "sightsListItem sightsListItemLeft");
          } else if(index == 1) {
            //li.setAttribute('class', "sightsListItem sightsListItemMiddle");
                        li.setAttribute('class', "sightsListItem sightsListItemRight");
          // } else if(index%3==0) {
          //   li.setAttribute('class', "sightsListItem sightsListItemLeft");
          } else if(index%2==0) {
            li.setAttribute('class', "sightsListItem sightsListItemLeft");
          } else {
                        li.setAttribute('class', "sightsListItem sightsListItemRight");
          }

          var aLink, textDiv, imageDiv, name, image, title;
          
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
          hoverPlace.innerText = "";
        }

        // store reference to closest object as current intersection object
        if(intersects[0].object.type != "Scene") {
          INTERSECTED = intersects[0].object;
          // store color of closest object (for later restoration)
          INTERSECTED.currentHex = INTERSECTED.material[0].color.getHex();
          // set a new color for closest object
          INTERSECTED.material[0].color.setHex(0xffff00);
          hoverPlace.innerText = INTERSECTED.name;

        }
      } else {
        // there are no intersections
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED) {
            INTERSECTED.material[0].color.setHex( INTERSECTED.currentHex );
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
