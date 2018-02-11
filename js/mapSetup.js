const loader = new THREE.JSONLoader();
const rp = require('request-promise');
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x0808dd, 1.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.05);

renderer.domElement.id = 'Map';
renderer.domElement.className = 'mapCanvas';
renderer.setSize(window.innerWidth * 0.70, window.innerHeight);
scene.add(hemisphereLight)
scene.add(directionalLight);
camera.position.y = 12.605131600565837;
camera.position.x = 0;
camera.position.z = 3.204281779409495;

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition((position) => {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  const path = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=AIzaSyC2t91Kl0Z0vlafB5xM3z8CGYLanQLRDOM`;
  rp(path, function (error, response, body) {
    const parsed = JSON.parse(body);
    address = parsed.results[0].formatted_address;
  });
});
}

loader.load('../res/dublin.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Dublin';
    object.order = 1;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/wicklow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Wicklow';
    object.order = 2;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/wexford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Wexford';
    object.order = 3;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/carlow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Carlow';
    object.order = 4;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/kildare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Kildare';
    object.order = 5;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/meath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Meath';
    object.order = 6;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/louth.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Louth';
    object.order = 7;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/monaghan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Monaghan';
    object.order = 8;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/cavan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Cavan';
    object.order = 9;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/longford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Longford';
    object.order = 10;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/westmeath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Westmeath';
    object.order = 11;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/offaly.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Offaly';
    object.order = 12;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/laois.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Laois';
    object.order = 13;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/kilkenny.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Kilkenny';
    object.order = 14;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/waterford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Waterford';
    object.order = 15;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/cork.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Cork';
    object.order = 16;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/kerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Kerry';
    object.order = 17;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/limerick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Limerick';
    object.order = 18;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/tipperary.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Tipperary';
    object.order = 19;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/clare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Clare';
    object.order = 20;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/galway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Galway';
    object.order = 21;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/mayo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Mayo';
    object.order = 22;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/roscommon.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Roscommon';
    object.order = 23;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/sligo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Sligo';
    object.order = 24;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/leitrim.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Leitrim';
    object.order = 25;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/donegal.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Donegal';
    object.order = 26;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/northernIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Northern Ireland';
    object.order = 27;
    object.type = 'Place';
    scene.add(object);
  }
);

loader.load('../res/tropicalWorld.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Tropical World';
    object.type = 'Sight';
    object.county = 'Donegal';
    scene.add(object);
  }
);

loader.load('../res/theSilverStrand.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Silver Strand';
    object.type = 'Sight';
    object.county = 'Donegal';
    scene.add(object);
  }
);

loader.load('../res/castleLeslieEstate.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Castle Leslie Estate';
    object.type = 'Sight';
    object.county = 'Monaghan';
    scene.add(object);
  }
);

loader.load('../res/cavanBurrenPark.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Cavan Burren Park';
    object.type = 'Sight';
    object.county = 'Cavan';
    scene.add(object);
  }
);

loader.load('../res/roscommonMuseum.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Roscommon County Museum';
    object.type = 'Sight';
    object.county = 'Roscommon';
    scene.add(object);
  }
);

loader.load('../res/smithwicksBreweryTour.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Smithwicks Brewery Tour';
    object.type = 'Sight';
    object.county = 'Kilkenny';
    scene.add(object);
  }
);

loader.load('../res/croughPatrick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Crough Patrick';
    object.type = 'Sight';
    object.county = 'Mayo';
    scene.add(object);
  }
);

loader.load('../res/schoolOfFalconry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'School Of Falconry';
    object.type = 'Sight';
    object.county = 'Mayo';
    scene.add(object);
  }
);

loader.load('../res/connemaraNationalPark.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Connemara National Park';
    object.type = 'Sight';
    object.county = 'Galway';
    scene.add(object);
  }
);

loader.load('../res/loughGillDrive.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Lough Gill Drive';
    object.type = 'Sight';
    object.county = 'Sligo';
    scene.add(object);
  }
);

loader.load('../res/giantsCauseway.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Giants Causeway';
    object.type = 'Sight';
    object.county = 'Northern Ireland';
    scene.add(object);
  }
);

loader.load('../res/spire.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Spire';
    object.type = 'Sight';
    object.county = 'Dublin';
    scene.add(object);
  }
);

loader.load('../res/famineCottages.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Famine Cottages';
    object.type = 'Sight';
    object.county = 'Kerry';
    scene.add(object);
  }
);

loader.load('../res/newgrange.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Newgrange';
    object.type = 'Sight';
    object.county = 'Meath';
    scene.add(object);
  }
);

loader.load('../res/lisheenCastle.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Lisheen Castle';
    object.type = 'Sight';
    object.county = 'Tipperary';
    scene.add(object);
  }
);

loader.load('../res/belvedereHouse.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Belvedere House & Gardens';
    object.type = 'Sight';
    object.county = 'Westmeath';
    scene.add(object);
  }
);

loader.load('../res/cliffsOfMoher.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Cliffs of Moher';
    object.type = 'Sight';
    object.county = 'Clare';
    scene.add(object);
  }
);

loader.load('../res/irishHeritagePark.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Irish Heritage Park';
    object.type = 'Sight';
    object.county = 'Wexford';
    scene.add(object);
  }
);

loader.load('../res/riverLee.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The River Lee';
    object.type = 'Sight';
    object.county = 'Cork';
    scene.add(object);
  }
);

loader.load('../res/canoeAssociationNorthernIreland.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Canoe Association of Northern Ireland';
    object.type = 'Sight';
    object.county = 'Northern Ireland';
    scene.add(object);
  }
);

loader.load('../res/wicklowMountains.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'The Wicklow Mountains';
    object.type = 'Sight';
    object.county = 'Wicklow';
    scene.add(object);
  }
);

loader.load('../res/sea.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = 'Sea';
    object.type = 'Scene';
    scene.add(object);
  }
);

loader.load('../res/sun.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.name = 'Sun';
    object.type = 'Scene';
    scene.add(object);
  }
);
