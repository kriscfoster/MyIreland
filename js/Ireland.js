const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const loader = new THREE.JSONLoader();
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
controls = new THREE.OrbitControls(camera);

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
    object.rotation.x = 1;
    directionalLight.target = object;
    scene.add(object);
  }
);

loader.load('../res/sea.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Ireland";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/spire.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Dublin"
    scene.add(object);
  }
);

loader.load('../res/Dublin.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Dublin";
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
      const information =document.getElementById('information');
      const events =document.getElementById('events');
      const sights =document.getElementById('sights');
      
      if(intersects[i].object.name!= 'Ireland') {
        document.getElementById("Map").style.display = "none";
        interestDiv.style.display="block";
        controls.enableZoom = false;
      }

      if(intersects[i].object.name === 'Dublin'){
        placeHeading.innerHTML="Dublin"
        const ref = database.ref('Dublin');
        ref.once('value', gotData, errData);
      } else if(intersects[i].object.name === 'Galway'){
        placeHeading.innerHTML="Galway"
        const ref = database.ref('Galway');
        ref.once('value', gotData, errData);
      } else if(intersects[i].object.name === 'Cork'){
        placeHeading.innerHTML="Cork"
        const ref = database.ref('Cork');
        ref.once('value', gotData, errData);
      } else if(intersects[i].object.name === 'Belfast'){
        placeHeading.innerHTML="Belfast"
        const ref = database.ref('Belfast');
        ref.once('value', gotData, errData);
      }

      function gotData(data) {
        data = data.val();
        information.innerHTML = '<img src="./res/dublin.jpg"/>' + data.Information;
        sights.innerHTML = data.Sights;
        events.innerHTML = data.Events;
      }

      function errData(err) {
        console.log(err);
      }
    }
  }
}

function render() {
  controls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

document.addEventListener("mousedown", onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
