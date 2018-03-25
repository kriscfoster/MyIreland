/* eslint-disable max-statements */

const THREE = require('../lib/three.min.js');
const loader = new THREE.JSONLoader();
const WHITE_HEX = 0xffffff;
const BLUE_HEX = 0x0808dd;
const ONE_HALF = 1.5;
const FIVE_PERCENT = 0.05;
const SEVENTY_PERCENT = 0.7;

const hemisphereLight =
  new THREE.HemisphereLight(WHITE_HEX, BLUE_HEX, ONE_HALF);
const directionalLight = new THREE.DirectionalLight(WHITE_HEX, FIVE_PERCENT);

module.exports = (scene, renderer, camera) => {
  renderer.domElement.id = 'Map';
  renderer.domElement.className = 'mapCanvas';
  renderer.setSize(window.innerWidth * SEVENTY_PERCENT,
    window.innerHeight);
  scene.add(hemisphereLight);
  scene.add(directionalLight);
  camera.position.y = 13.605131600565837;
  camera.position.x = 0;
  camera.position.z = 3.204281779409495;

  loader.load('../res/models/dublin.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Dublin';
      object.order = 1;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/wicklow.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Wicklow';
      object.order = 2;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/wexford.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Wexford';
      object.order = 3;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/carlow.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Carlow';
      object.order = 4;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/kildare.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Kildare';
      object.order = 5;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/meath.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Meath';
      object.order = 6;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/louth.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Louth';
      object.order = 7;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/monaghan.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Monaghan';
      object.order = 8;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/cavan.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Cavan';
      object.order = 9;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/longford.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Longford';
      object.order = 10;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/westmeath.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Westmeath';
      object.order = 11;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/offaly.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Offaly';
      object.order = 12;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/laois.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Laois';
      object.order = 13;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/kilkenny.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Kilkenny';
      object.order = 14;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/waterford.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Waterford';
      object.order = 15;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/cork.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Cork';
      object.order = 16;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/kerry.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Kerry';
      object.order = 17;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/limerick.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Limerick';
      object.order = 18;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/tipperary.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Tipperary';
      object.order = 19;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/clare.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Clare';
      object.order = 20;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/galway.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Galway';
      object.order = 21;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/mayo.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Mayo';
      object.order = 22;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/roscommon.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Roscommon';
      object.order = 23;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/sligo.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Sligo';
      object.order = 24;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/leitrim.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Leitrim';
      object.order = 25;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/donegal.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Donegal';
      object.order = 26;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/northernIreland.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Northern Ireland';
      object.order = 27;
      object.type = 'Place';
      scene.add(object);
    }
  );

  loader.load('../res/models/tropicalWorld.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Tropical World';
      object.type = 'Sight';
      object.county = 'Donegal';
      scene.add(object);
    }
  );

  loader.load('../res/models/theSilverStrand.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Silver Strand';
      object.type = 'Sight';
      object.county = 'Donegal';
      scene.add(object);
    }
  );

  loader.load('../res/models/castleLeslieEstate.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Castle Leslie Estate';
      object.type = 'Sight';
      object.county = 'Monaghan';
      scene.add(object);
    }
  );

  loader.load('../res/models/cavanBurrenPark.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Cavan Burren Park';
      object.type = 'Sight';
      object.county = 'Cavan';
      scene.add(object);
    }
  );

  loader.load('../res/models/roscommonMuseum.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Roscommon County Museum';
      object.type = 'Sight';
      object.county = 'Roscommon';
      scene.add(object);
    }
  );

  loader.load('../res/models/smithwicksBreweryTour.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Smithwicks Brewery Tour';
      object.type = 'Sight';
      object.county = 'Kilkenny';
      scene.add(object);
    }
  );

  loader.load('../res/models/croughPatrick.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Crough Patrick';
      object.type = 'Sight';
      object.county = 'Mayo';
      scene.add(object);
    }
  );

  loader.load('../res/models/schoolOfFalconry.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'School Of Falconry';
      object.type = 'Sight';
      object.county = 'Mayo';
      scene.add(object);
    }
  );

  loader.load('../res/models/connemaraNationalPark.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Connemara National Park';
      object.type = 'Sight';
      object.county = 'Galway';
      scene.add(object);
    }
  );

  loader.load('../res/models/loughGillDrive.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Lough Gill Drive';
      object.type = 'Sight';
      object.county = 'Sligo';
      scene.add(object);
    }
  );

  loader.load('../res/models/giantsCauseway.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Giants Causeway';
      object.type = 'Sight';
      object.county = 'Northern Ireland';
      scene.add(object);
    }
  );

  loader.load('../res/models/spire.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Spire';
      object.type = 'Sight';
      object.county = 'Dublin';
      scene.add(object);
    }
  );

  loader.load('../res/models/famineCottages.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Famine Cottages';
      object.type = 'Sight';
      object.county = 'Kerry';
      scene.add(object);
    }
  );

  loader.load('../res/models/newgrange.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Newgrange';
      object.type = 'Sight';
      object.county = 'Meath';
      scene.add(object);
    }
  );

  loader.load('../res/models/lisheenCastle.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Lisheen Castle';
      object.type = 'Sight';
      object.county = 'Tipperary';
      scene.add(object);
    }
  );

  loader.load('../res/models/belvedereHouse.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Belvedere House & Gardens';
      object.type = 'Sight';
      object.county = 'Westmeath';
      scene.add(object);
    }
  );

  loader.load('../res/models/cliffsOfMoher.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Cliffs of Moher';
      object.type = 'Sight';
      object.county = 'Clare';
      scene.add(object);
    }
  );

  loader.load('../res/models/irishHeritagePark.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Irish Heritage Park';
      object.type = 'Sight';
      object.county = 'Wexford';
      scene.add(object);
    }
  );

  loader.load('../res/models/corkGhostTour.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Cork Ghost Tour';
      object.type = 'Sight';
      object.county = 'Cork';
      scene.add(object);
    }
  );

  loader.load('../res/models/canoeAssociationNorthernIreland.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Canoe Association of Northern Ireland';
      object.type = 'Sight';
      object.county = 'Northern Ireland';
      scene.add(object);
    }
  );

  loader.load('../res/models/wicklowMountains.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'The Wicklow Mountains';
      object.type = 'Sight';
      object.county = 'Wicklow';
      scene.add(object);
    }
  );

  loader.load('../res/models/sea.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Sea';
      object.type = 'Scene';
      scene.add(object);
    }
  );

  loader.load('../res/models/sun.json',
    (geometry, materials) => {
      const object = new THREE.Mesh(geometry, materials);
      object.name = 'Sun';
      object.type = 'Scene';
      scene.add(object);
    }
  );
};
