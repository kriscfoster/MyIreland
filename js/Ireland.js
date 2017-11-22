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

loader.load('../res/IrelandSmooth.json', 
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

loader.load('../res/MyIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Giants Causeway";
    object.type = "Scene";
    scene.add(object);
  }
);

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

loader.load('../res/Point.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point2.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point3.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point4.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point5.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point6.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point7.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point8.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point9.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point10.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Point11.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Historic Sight";
    object.type = "Sight";
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

// loader.load('../res/Cloud.json', 
//   function (geometry, materials) {
//     const object = new THREE.Mesh(geometry, materials);
//     object.rotation.x = 1;
//     object.name = "The Giants Causeway";
//     object.type = "Scene";
//     scene.add(object);
//   }
// );

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
      const information =document.getElementById('information');
      const events =document.getElementById('events');
      const sights =document.getElementById('sights');
      const buttons = document.getElementById('Buttons');

      if(intersects[i].object.type != "Scene") {
        document.getElementById("Map").style.display = "none";
        interestDiv.style.display="block";
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        placeHeading.innerHTML=intersects[i].object.name;
        const ref = database.ref(intersects[i].object.name);
        ref.once('value', gotData, errData);

        if(intersects[i].object.type === "Place") {
          buttons.style.display = "block";
        } else {
          buttons.style.display = "none";
        }


      }

      // if(intersects[i].object.name === 'Dublin'){
      //   //placeHeading.innerHTML="Dublin"
      //   const ref = database.ref('Dublin');
      //   ref.once('value', gotData, errData);
      // } else if(intersects[i].object.name === 'Galway'){
      //   //placeHeading.innerHTML="Galway"
      //   const ref = database.ref('Galway');
      //   ref.once('value', gotData, errData);
      // } else if(intersects[i].object.name === 'Cork'){
      //   //placeHeading.innerHTML="Cork"
      //   const ref = database.ref('Cork');
      //   ref.once('value', gotData, errData);
      // } else if(intersects[i].object.name === 'Belfast'){
      //   //placeHeading.innerHTML="Belfast"
      //   const ref = database.ref('Belfast');
      //   ref.once('value', gotData, errData);
      // }

      function gotData(data) {
        data = data.val();
        information.innerHTML = data.Information;
        sights.innerHTML = data.Sights;
        events.innerHTML = data.Events;
      }

      function errData(err) {
        console.log(err);
      }
    }
  }
}

function onMouseMove(event) {
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
      }

      // store reference to closest object as current intersection object
      if(intersects[0].object.type != "Scene") {
        INTERSECTED = intersects[0].object;
        // store color of closest object (for later restoration)
        INTERSECTED.currentHex = INTERSECTED.material[0].color.getHex();
        // set a new color for closest object

        INTERSECTED.material[0].color.setHex(0xffff00);

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

function render() {
  controls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mousedown", onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
