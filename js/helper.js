function closeInterest() {
  window.addEventListener("mousedown", globalObject.onMouseDown);
  document.getElementById("Map").style.opacity = "1";
  document.getElementById("interest").style.display="none";
  document.getElementById("information").style.display="block";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "selected";
  document.getElementById("sightsButton").className = "";
  document.getElementById("eventsButton").className = "";
  document.getElementById("readButton").style.display = "inline-block";
  document.getElementById("pauseButton").style.display = "none";
  document.getElementById("stopButton").style.display = "none";
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
  window.speechSynthesis.cancel();
}

function showInformation() {
  document.getElementById("information").style.display="block";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "selected";
  document.getElementById("eventsButton").className = "";
  document.getElementById("sightsButton").className = "";
}

function showSights() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="block";
  document.getElementById("informationButton").className = "";
  document.getElementById("eventsButton").className = "";
  document.getElementById("sightsButton").className = "selected";
}

function showEvents() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="block";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "";
  document.getElementById("eventsButton").className = "selected";
  document.getElementById("sightsButton").className = "";
}

function read() {
  const text = document.getElementById("informationText").innerText;
  const sentences = text.match( /[^\.!\?]+[\.!\?]+/g );

  var timer = setInterval(function() {
    var voices = speechSynthesis.getVoices();

    if (voices.length !== 0) {
      for (i = 0; i < sentences.length; i++) {
        sentence = sentences[i]
        audio = new SpeechSynthesisUtterance(sentence);
        audio.voice = voices[66];
        window.speechSynthesis.speak(audio);
        clearInterval(timer);
      }
    }
  }, 200);

  document.getElementById("readButton").style.display = "none";
  document.getElementById("pauseButton").style.display = "inline-block";
  document.getElementById("stopButton").style.display = "inline-block";
}

function pause() {
  document.getElementById("readButton").style.display = "inline-block";
  document.getElementById("pauseButton").style.display = "none";
  window.speechSynthesis.cancel();
}

function stop() {
  document.getElementById("readButton").style.display = "inline-block";
  document.getElementById("pauseButton").style.display = "none";
  document.getElementById("stopButton").style.display = "none";
  window.speechSynthesis.cancel();
}

window.onload = function() {
  const closeButton = document.getElementById('closeButton');
  closeButton.onclick = () => { closeInterest(); }
  const informationButton = document.getElementById('informationButton');
  informationButton.onclick = () => { showInformation(); }
  const sightsButton = document.getElementById('sightsButton');
  sightsButton.onclick = () => { showSights(); }
  const eventsButton = document.getElementById('eventsButton');
  eventsButton.onclick = () => { showEvents(); }
  const readButton = document.getElementById('readButton');
  readButton.onclick = () => { read(); }
  const pauseButton = document.getElementById('pauseButton');
  pauseButton.onclick = () => { pause(); }
  const stopButton = document.getElementById('stopButton');
  stopButton.onclick = () => { stop(); }

  const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const ref = database.ref();
  ref.once('value', gotData, errData);
}


function gotData(data) {
  data = data.val();

  data.events.data.map((e) => {
    if(counties[e.county]) {
      counties[e.county].events.push(e);
    }
  });

  data.sights.data.map((e) => {
    if(counties[e.county]) {
      counties[e.county].sights.push(e);
    }
  });

  for(var key in data.counties) {
    if (counties[key]) {
      counties[key].information = data.counties[key];
    }
  }

// console.log(scene);

// scene.children.forEach((child) => {
//   if (child.type != 'Scene' && child.type != 'HemisphereLight') {
//     child.visible = false;
//   }
// })

// var collisionBoxes = [];

// for(var i=0; i< 60; i++) {
//   console.log(i);
//   var geometry = new THREE.CylinderGeometry( 1, 1, 0.5, 32 );
//   var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: false});
//   THREE.ImageUtils.crossOrigin = '';

//   const random = Math.floor(Math.random() * (counties.Dublin.sights.length - 1));

//   var materials = [
//     new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: false}),
//      new THREE.MeshLambertMaterial({
//          map: THREE.ImageUtils.loadTexture(counties.Dublin.sights[random].imageUrl)
//      }),
//   ];

//   var cube = new THREE.Mesh(geometry, materials);
//   cubetype = "Scene";
//   cube.rotation.y = 1;
//   cube.position.x = Math.random() * 40 - 20;
//   cube.position.z = Math.random() * 20 - 10;
//   scene.add(cube);
//   bb = new THREE.Box3().setFromObject(cube);
//   var collide = false;

//   if(collisionBoxes.length < 1) {
//     collisionBoxes.push(bb);
//   } else {
//     for(var j=0; j<collisionBoxes.length; j++) {
//       if(bb.isIntersectionBox(collisionBoxes[j])) {
//         collide = true;
//       }
//     }

//     if(collide === true) {
//       scene.remove(cube);
//     } else {
//       collisionBoxes.push(bb);
//     }
//   }
// }

  document.body.appendChild(renderer.domElement);
}

function errData(err) {
  console.log(err);
}
