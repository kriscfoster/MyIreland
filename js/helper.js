function closeInterest() {
  document.getElementById("interest").style.display = "none";
  document.getElementById("homeView").style.display = "block";
  document.getElementById("information").style.display="block";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "categoryButton selected";
  document.getElementById("sightsButton").className = "categoryButton";
  document.getElementById("eventsButton").className = "categoryButton";
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
  document.getElementById("informationButton").className = "categoryButton selected";
  document.getElementById("eventsButton").className = "categoryButton";
  document.getElementById("sightsButton").className = "categoryButton";
}

function showSights() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="block";
  document.getElementById("informationButton").className = "categoryButton";
  document.getElementById("eventsButton").className = "categoryButton";
  document.getElementById("sightsButton").className = "categoryButton selected";
}

function showEvents() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="block";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "categoryButton";
  document.getElementById("eventsButton").className = "categoryButton selected";
  document.getElementById("sightsButton").className = "categoryButton";
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

function enteredSidePanel() {
  controls.enabled = false;
}

function exitedSidePanel() {
    document.getElementById('sidePanel').style.color = 'black';
    controls.enabled = true;
}

function filterCounties(substr) {
  const countiesUl = document.getElementById('counties-dynamic-list');
  let li, countyName;

  while (countiesUl.firstChild) {
    countiesUl.removeChild(countiesUl.firstChild);
  }

  scene.children.forEach((child) => {
    if(child.type === "Place") {
      if(child.name.toLowerCase().startsWith(substr) || !substr) {
        child.position.y = 0;
        li = document.createElement("li");
        countyName = document.createTextNode(`${child.order} - ${child.name}`);
        li.appendChild(countyName);
        countiesUl.appendChild(li);
      } else {
        child.position.y = -1;
      }
    }
  });
}

function searchChanged(event) {
  let valid = false;

  scene.children.forEach((child) => {
    if (child.name.toLowerCase().startsWith(event.target.value)) {
      valid = true;
    }
  });

  if(valid) {
    filterCounties(event.target.value);
  } else {
    document.getElementById(event.target.id).value = event.target.value.slice(0, -1);
  }
}

function checkSceneState() {
  if(scene.children.length === 31) {
    filterCounties();
  }
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

  document.getElementById('sidePanel').addEventListener('mouseenter', enteredSidePanel);
  document.getElementById('sidePanel').addEventListener('mouseleave', exitedSidePanel);
  document.getElementById('searchCounties').addEventListener('input', searchChanged);

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

  document.body.appendChild(renderer.domElement);
  checkSceneState();
}

function errData(err) {
  console.log(err);
}
