const loader = new THREE.JSONLoader();
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.3);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);

renderer.domElement.id = 'Map';
renderer.setSize(window.innerWidth, window.innerHeight);
controls.maxDistance = 20;
controls.minDistance = 4;
scene.add(hemisphereLight)
scene.add(directionalLight);
camera.position.z = 12;
camera.position.y = -2

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

loader.load('../res/Clonmacnoise.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Clonmacnoise";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/MarbleArchCaves.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Marble Arch Caves";
    object.type = "Sight";
    scene.add(object);
  }
);

loader.load('../res/Castle.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Castle";
    object.type = "Sight";
    scene.add(object);
  }
);
