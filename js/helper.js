function closeInterest() {
  document.getElementById("interest").style.display = "none";
  document.getElementById("homeView").style.display = "block";
  document.getElementById("information").style.display="block";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="none";
  document.getElementById("closeButton").style.display="none";
  document.getElementById("informationButton").className = "categoryButton selected material-icons";
  document.getElementById("sightsButton").className = "categoryButton material-icons";
  document.getElementById("eventsButton").className = "categoryButton material-icons";
  document.getElementById("readButton").style.display = "inline-block";
  document.getElementById("pauseButton").style.display = "none";
  document.getElementById("stopButton").style.display = "none";
  window.speechSynthesis.cancel();
}

function showInformation() {
  document.getElementById("information").style.display="block";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "categoryButton selected material-icons";
  document.getElementById("eventsButton").className = "categoryButton material-icons";
  document.getElementById("sightsButton").className = "categoryButton material-icons";
}

function showSights() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="none";
  document.getElementById("sights").style.display="block";
  document.getElementById("informationButton").className = "categoryButton material-icons";
  document.getElementById("eventsButton").className = "categoryButton material-icons";
  document.getElementById("sightsButton").className = "categoryButton selected material-icons";
}

function showEvents() {
  document.getElementById("information").style.display="none";
  document.getElementById("events").style.display="block";
  document.getElementById("sights").style.display="none";
  document.getElementById("informationButton").className = "categoryButton material-icons";
  document.getElementById("eventsButton").className = "categoryButton selected material-icons";
  document.getElementById("sightsButton").className = "categoryButton material-icons";
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
  controls.enabled = true;
}

function filterCounties(substr) {
  const countiesTable = document.getElementById('counties-dynamic-table');
  let li, countyName, countyId, link, td, tr;
  const validCounties = [];

  while (countiesTable.firstChild) {
    countiesTable.removeChild(countiesTable.firstChild);
  }

  scene.children.forEach((child) => {
    let test = false;
    if(child.type === "Place") {
      if (!substr) {
        test = true;
      } else if (child.name.toLowerCase().startsWith(substr.toLowerCase())) {
        test = true;
      }

      if (test) {
        child.position.y = 0;
        validCounties.push(
          {
            id: child.order,
            name: child.name
          } 
        );
      } else {
        child.position.y = -1;
      }
    }
  });

  validCounties.sort((a, b) => {
    return a.id - b.id;
  });

  validCounties.forEach((county) => {
    tr = document.createElement("tr");
    td = document.createElement("td");
    countyId = document.createTextNode(county.id);
    countyName = document.createTextNode(county.name);
    td.appendChild(countyId);
    td.setAttribute('class', "tableCountyId");
    tr.appendChild(td);
    td = document.createElement("td");
    td.appendChild(countyName);
    td.setAttribute('class', "tableCountyName");
    tr.appendChild(td);
    countiesTable.appendChild(tr);
  });
}

function searchChanged(event) {
  let valid = false;

  scene.children.forEach((child) => {
    if (child.name.toLowerCase().startsWith(event.target.value.toLowerCase())) {
      valid = true;
    }
  });

  if(valid) {
    filterCounties(event.target.value);
  } else {
    document.getElementById(event.target.id).value = event.target.value.slice(0, -1);
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

    filterCounties();
    document.body.appendChild(renderer.domElement);
    document.getElementById("spinnerDiv").style.display = "none";

  // firebase.initializeApp(firebaseConfig);
  // const database = firebase.database();
  // const ref = database.ref();
  // ref.once('value', gotData, errData);
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

  setTimeout(() => {
    filterCounties();
    document.getElementById("spinnerDiv").style.display = "none";
  }, 100);
}

function errData(err) {
  console.log(err);
}
