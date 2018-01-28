const loader = new THREE.JSONLoader();
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.05);

renderer.domElement.id = 'Map';
renderer.domElement.className = 'mapCanvas';
renderer.setSize(window.innerWidth * 0.70, window.innerHeight);
controls.maxDistance = 30;
controls.minDistance = 4;
scene.add(hemisphereLight)
scene.add(directionalLight);
camera.position.y = 12.605131600565837;
camera.position.x = 0;
camera.position.z = 3.204281779409495;

loader.load('../res/dublin.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Dublin";
    object.order = 1;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wicklow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Wicklow";
    object.order = 2;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/wexford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Wexford";
    object.order = 3;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/carlow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Carlow";
    object.order = 4;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kildare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kildare";
    object.order = 5;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/meath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Meath";
    object.order = 6;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/louth.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Louth";
    object.order = 7;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/monaghan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Monaghan";
    object.order = 8;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/cavan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Cavan";
    object.order = 9;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/longford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Longford";
    object.order = 10;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/westmeath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Westmeath";
    object.order = 11;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/offaly.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Offaly";
    object.order = 12;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/laois.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Laois";
    object.order = 13;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kilkenny.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kilkenny";
    object.order = 14;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/waterford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Waterford";
    object.order = 15;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/cork.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Cork";
    object.order = 16;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/kerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Kerry";
    object.order = 17;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/limerick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Limerick";
    object.order = 18;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/tipperary.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Tipperary";
    object.order = 19;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/clare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Clare";
    object.order = 20;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/galway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Galway";
    object.order = 21;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/mayo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Mayo";
    object.order = 22;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/roscommon.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Roscommon";
    object.order = 23;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/sligo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Sligo";
    object.order = 24;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/leitrim.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Leitrim";
    object.order = 25;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/donegal.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = "Donegal";
    object.order = 26;
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/northernIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Northern Ireland";
    object.order = 27;
    object.type = "Place";
    scene.add(object);
  }
);

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
