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

loader.load('../res/myIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "The Giants Causeway";
    object.type = "Scene";
    scene.add(object);
  }
);

loader.load('../res/dublin.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Dublin";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/cork.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Cork";
    object.type = "Place";
    object.rotation.x = 1;
    object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/galway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Galway";
    object.type = "Place";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/northernIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Northern Ireland";
    object.type = "Place";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/kerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kerry";
    object.type = "Place";
        object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/limerick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Limerick";
    object.type = "Place";
     object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/clare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Clare";
    object.type = "Place";
     object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/tipperary.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Tipperary";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/waterford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Waterford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wexford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Wexford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kilkenny.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kilkenny";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/carlow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Carlow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wicklow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Wicklow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/laois.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Laois";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kildare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kildare";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/offaly.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Offaly";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/westmeath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Westmeath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/meath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Meath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/louth.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Louth";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/longford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Longford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/roscommon.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Roscommon";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/leitrim.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Leitrim";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/sligo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Sligo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/mayo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Mayo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/cavan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Cavan";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/monaghan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Monaghan";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/donegal.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Donegal";
    object.type = "Place";
    scene.add(object);
  }
);
