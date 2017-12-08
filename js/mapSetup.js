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


// loader.load('../res/Ireland.json', 
//   function (geometry, materials) {
//     const object = new THREE.Mesh(geometry, materials); // array
//     object.name = "Ireland";
//     object.type = "Scene";
//     object.rotation.x = 1;
//     directionalLight.target = object;
//     scene.add(object);
//   }
// );

loader.load('../res/corknew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Cork";
    object.type = "Place";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/kerrynew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Sea";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/waterfordnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Sea";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/limericknew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "Sea";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/clarenew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/galwaynew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/mayonew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/sligoNew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/roscommonnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/leitrimnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/longfordnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/westmeathnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/offalynew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/tipperarynew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/kilkennynew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/wexfordnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/wicklownew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/laoisnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/carlownew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/kildarenew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/meathnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/dublinnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/cavannew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/louthnew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/monaghannew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
    scene.add(object);
  }
);

loader.load('../res/ninew.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials); // array
    object.name = "clarenew";
    object.type = "Scene";
    object.rotation.x = 1;
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

/*
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
*/

loader.load('../res/Kerry.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kerry";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Limerick.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Limerick";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Clare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Clare";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Tipperary.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Tipperary";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Waterford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Waterford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Wexford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Wexford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Kilkenny.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kilkenny";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Carlow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Carlow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Wicklow.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Wicklow";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Laois.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Laois";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Kildare.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Kildare";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Castle.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Castle";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Offaly.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Offaly";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Westmeath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Westmeath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Meath.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Meath";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Louth.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Louth";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Longford.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Longford";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Roscommon.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Roscommon";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Leitrim.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Leitrim";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Sligo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Sligo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Mayo.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Mayo";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Cavan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Cavan";
    object.type = "Place";
    scene.add(object);
  }
);

loader.load('../res/Monaghan.json', 
  function (geometry, materials) {
    const object = new THREE.Mesh(geometry, materials);
    object.rotation.x = 1;
    object.name = "Monaghan";
    object.type = "Place";
    scene.add(object);
  }
);



