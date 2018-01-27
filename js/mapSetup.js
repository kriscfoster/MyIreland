const loader = new THREE.JSONLoader();
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);

renderer.domElement.id = 'Map';
renderer.domElement.className = 'mapCanvas';
renderer.setSize(window.innerWidth * 0.70, window.innerHeight);
controls.maxDistance = 30;
controls.minDistance = 4;
scene.add(hemisphereLight)
//scene.add(directionalLight);
camera.position.y = 12.605131600565837;
camera.position.x = 0;
camera.position.z = 3.204281779409495;


loader.load('../res/sea.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Sea";
    object.type = "Scene";
    scene.add(object);
  }
);

loader.load('../res/sun.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Historic Sight";
    object.type = "Scene";
    scene.add(object);
  }
);

loader.load('../res/irelandLabel.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Ireland Label";
    object.type = "Scene";
    scene.add(object);
  }
);

loader.load('../res/dublin.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
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
    object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/galway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Galway";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/northernIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "NorthernIreland";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kerry";
    object.type = "Place";
        object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/limerick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Limerick";
    object.type = "Place";
     object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/clare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Clare";
    object.type = "Place";
     object.direction = 0.005;
    scene.add(object);
  }
);

loader.load('../res/tipperary.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Tipperary";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/waterford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Waterford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wexford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Wexford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kilkenny.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kilkenny";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/carlow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Carlow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wicklow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Wicklow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/laois.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Laois";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kildare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kildare";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/offaly.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Offaly";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/westmeath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Westmeath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/meath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Meath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/louth.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Louth";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/longford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Longford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/roscommon.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Roscommon";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/leitrim.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Leitrim";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/sligo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Sligo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/mayo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Mayo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/cavan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Cavan";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/monaghan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Monaghan";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/donegal.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Donegal";
    object.type = "Place";
    scene.add(object);
  }
);
