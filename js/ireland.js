/* global THREE */

const originTarget = { x: 0.0, y: 0.0, z: 0.0 };
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const SEVENTY_FIVE = 75;
const SEVENTY_PERCENT = 0.7;
const TEN_PERCENT = 0.1;
const ONE_THOUSAND = 1000;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
const camera = new THREE.PerspectiveCamera(SEVENTY_FIVE,
  (window.innerWidth * SEVENTY_PERCENT) / window.innerHeight,
  TEN_PERCENT, ONE_THOUSAND);
const controls = new THREE.OrbitControls(camera);
controls.maxDistance = 30;
controls.minDistance = 3;

let hoverPlace, hoverPlaceContainer, hoverPlaceEvents, hoverPlaceSights;

const counties = {
  Carlow: { events: [], sights: [], information: {} },
  Cavan: { events: [], sights: [], information: {} },
  Clare: { events: [], sights: [], information: {} },
  Cork: { events: [], sights: [], information: {} },
  Donegal: { events: [], sights: [], information: {} },
  Dublin: { events: [], sights: [], information: {} },
  Galway: { events: [], sights: [], information: {} },
  Kerry: { events: [], sights: [], information: {} },
  Kildare: { events: [], sights: [], information: {} },
  Kilkenny: { events: [], sights: [], information: {} },
  Laois: { events: [], sights: [], information: {} },
  Leitrim: { events: [], sights: [], information: {} },
  Limerick: { events: [], sights: [], information: {} },
  Longford: { events: [], sights: [], information: {} },
  Louth: { events: [], sights: [], information: {} },
  Mayo: { events: [], sights: [], information: {} },
  Meath: { events: [], sights: [], information: {} },
  Monaghan: { events: [], sights: [], information: {} },
  Offaly: { events: [], sights: [], information: {} },
  Roscommon: { events: [], sights: [], information: {} },
  Sligo: { events: [], sights: [], information: {} },
  Tipperary: { events: [], sights: [], information: {} },
  Waterford: { events: [], sights: [], information: {} },
  Westmeath: { events: [], sights: [], information: {} },
  Wexford: { events: [], sights: [], information: {} },
  Wicklow: { events: [], sights: [], information: {} },
  NorthernIreland: { events: [], sights: [], information: {} }
};

let TARGET = originTarget;
let zoomedAtTarget = false;
const utils = require('./helper.js')(scene, camera, controls, counties);
require('./mapSetup.js')(scene, renderer, camera);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let INTERSECTED = null;

window.onload = () => {
  hoverPlace = document.getElementById('hoverPlace');
  hoverPlaceSights = document.getElementById('hoverPlaceSights');
  hoverPlaceEvents = document.getElementById('hoverPlaceEvents');
  hoverPlaceContainer = document.getElementById('hoverPlaceContainer');
  utils.onLoadHandler();
  document.body.appendChild(renderer.domElement);
};

/**
 * A place was selected so carry out necessary steps.
 * @param {String} placeName - Name of county selected.
 */
function placeSelected(placeName) {
  let intersectedPlace;

  scene.children.forEach((child) => {
    if (child.type === 'Place' && child.name === placeName) {
      intersectedPlace = child;
      child.visible = true;
    } else if (child.county === placeName) {
      child.visible = true;
    }
  });

  TARGET = intersectedPlace.geometry.boundingSphere.center;
  zoomedAtTarget = true;
  utils.placeSelectedHandler(intersectedPlace.name);
}

/**
 * Called when window is resized.
 */
function onWindowResize() {
  camera.aspect = window.innerWidth *
    SEVENTY_PERCENT / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth *
    SEVENTY_PERCENT, window.innerHeight);
}

/**
 * Called when toggled out of county.
 */
function toggleOutOfCounty() {
  document.getElementById('homeView').style.display = 'block';
  document.getElementById('interest').style.display = 'none';
  document.getElementById('closeButton').style.display='none';
  TARGET = originTarget;
  zoomedAtTarget = false;
  scene.children.forEach((child) => {
    child.visible = true;
  });
}

/**
 * Called on mouse click.
 * @param {JSON} event - click click event.
 */
function onMouseDown(event) {
  utils.stop();
  if (event.target.id === 'closeButton') {
    toggleOutOfCounty();
  }

  if (event.target.id === 'Map' || event.target.id === 'hoverPlaceContainer' ||
    event.target.id === 'hoverPlaceInfo') {
    if (INTERSECTED) {
      if (INTERSECTED.type === 'Scene') {
        toggleOutOfCounty();
      } else if (INTERSECTED.type === 'Place') {
        placeSelected(INTERSECTED.name);
      }
    }
  }
}

/* eslint-disable max-statements */

/**
 * Called on mouse move.
 * @param {JSON} event - mouse move event.
 */
function onMouseMove(event) {
  // calculate mouse position in normalized coordinates
  mouse.x = (event.clientX / (window.innerWidth * SEVENTY_PERCENT)) * TWO - ONE;
  mouse.y = -(event.clientY / window.innerHeight) * TWO + ONE;
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i=0; i < intersects.length; i++) {
    if (intersects[i].object === INTERSECTED) {
      if (INTERSECTED) {
        if (INTERSECTED.type === 'Place') {
          hoverPlaceContainer.style.display = 'none';
        }
      }
    } else {
      if (INTERSECTED) {
        if (INTERSECTED.type === 'Place') {
          scene.children.forEach((sight) => {
            if (sight.type === 'Place' || sight.type === 'Sight') {
              sight.position.y = 0;
            }
          });

          INTERSECTED = null;
        } else if (INTERSECTED.type === 'Sight') {
          INTERSECTED.position.y = 0;
        }
      }

      INTERSECTED = intersects[ZERO].object;


      if (INTERSECTED.type === 'Place' && !zoomedAtTarget) {
        INTERSECTED.position.y = 0.3;

        scene.children.forEach((sight) => {
          if (sight.type === 'Sight' && sight.county === INTERSECTED.name) {
            sight.position.y = 0.3;
          }
        });

        hoverPlaceContainer.style.left = event.clientX + 'px';
        hoverPlaceContainer.style.top = event.clientY + 'px';
        hoverPlace.innerText = INTERSECTED.name;
        hoverPlaceSights.innerText =
          `${counties[INTERSECTED.name
            .replace(/\s/g, '')].sights.length} Sights`;
        hoverPlaceEvents.innerText =
          `${counties[INTERSECTED.name
            .replace(/\s/g, '')].events.length} Nearby Events`;
        hoverPlaceContainer.style.display = 'block';
      } else if (INTERSECTED.type === 'Sight') {
        const hoveredSight = INTERSECTED;
        hoveredSight.position.y = 0.1;

        if (!zoomedAtTarget) {
          scene.children.forEach((sight) => {
            if(sight.name === hoveredSight.county) {
              INTERSECTED = sight;
              INTERSECTED.position.y = 0.3;
            } else if(sight.county === hoveredSight.county) {
              sight.position.y = 0.3;
            }
          });

          hoverPlaceContainer.style.left = event.clientX + 'px';
          hoverPlaceContainer.style.top = event.clientY + 'px';
          hoverPlace.innerText = INTERSECTED.name;
          hoverPlaceSights.innerText =
            `${counties[INTERSECTED.name
              .replace(/\s/g, '')].sights.length} Sights`;
          hoverPlaceEvents.innerText =
            `${counties[INTERSECTED.name
              .replace(/\s/g, '')].events.length} Nearby Events`;
          hoverPlaceContainer.style.display = 'block';
        } else {
          hoverPlaceContainer.style.left = event.clientX + "px";
          hoverPlaceContainer.style.top = event.clientY + "px";
          hoverPlace.innerText = hoveredSight.name;
          hoverPlaceSights.innerText = '';
          hoverPlaceEvents.innerText = '';
          hoverPlaceContainer.style.display = 'block';
        }
      } else {
        hoverPlaceContainer.style.display = 'none';
      }
    }
  }
}

function moveTowardsTarget() {
  if (Math.abs(controls.target.x - TARGET.x) > 0.2) {
    if (controls.target.x - TARGET.x < 0.0 ) {
      controls.target.x += 0.1;
    } else {
      controls.target.x -= 0.1;
    }
  }

  if (Math.abs(controls.target.y - TARGET.y) > 0.2) {
    if (controls.target.y - TARGET.y < 0.0 ) {
      controls.target.y += 0.1;
    } else {
      controls.target.y -= 0.1;
    }
  }

  if (Math.abs(controls.target.z - TARGET.z) > 0.2) {
    if (controls.target.z - TARGET.z < 0.0 ) {
      controls.target.z += 0.1;
    } else {
      controls.target.z -= 0.1;
    }
  }

  if (TARGET != originTarget) {
    if (camera.position.length() > 7) {
        controls.dIn(1.02);
    } else {
      if ((Math.abs(controls.target.x - TARGET.x) <= 0.2) && (Math.abs(controls.target.y - TARGET.y) <= 0.2) && (Math.abs(controls.target.z - TARGET.z) <= 0.2)) {
        TARGET = null;
      }
    }
  } else {
    if (camera.position.length() < 16) {
        controls.dOut(1.02);
    } else {
      if ((Math.abs(controls.target.x - TARGET.x) <= 0.2) && (Math.abs(controls.target.y - TARGET.y) <= 0.2) && (Math.abs(controls.target.z - TARGET.z) <= 0.2)) {
        TARGET = null;
      }
    }
  }
}

function render() {
  if (TARGET) {
    moveTowardsTarget();
  }

  controls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('resize', onWindowResize);

render();
