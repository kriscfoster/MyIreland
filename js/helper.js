const moment = require('moment');

function closeInterest() {
  document.getElementById('interest').style.display = 'none';
  document.getElementById('homeView').style.display = 'block';
  document.getElementById('information').style.display='block';
  document.getElementById('events').style.display='none';
  document.getElementById('sights').style.display='none';
  document.getElementById('closeButton').style.display='none';
  document.getElementById('informationButton').className = 'categoryButton selected material-icons';
  document.getElementById('sightsButton').className = 'categoryButton material-icons';
  document.getElementById('eventsButton').className = 'categoryButton material-icons';
  document.getElementById('readButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'none';
  stop();
}

function showInformation() {
  document.getElementById('information').style.display='block';
  document.getElementById('events').style.display='none';
  document.getElementById('sights').style.display='none';
  document.getElementById('informationButton').className = 'categoryButton selected material-icons';
  document.getElementById('eventsButton').className = 'categoryButton material-icons';
  document.getElementById('sightsButton').className = 'categoryButton material-icons';
}

function showSights() {
  document.getElementById('information').style.display='none';
  document.getElementById('events').style.display='none';
  document.getElementById('sights').style.display='block';
  document.getElementById('informationButton').className = 'categoryButton material-icons';
  document.getElementById('eventsButton').className = 'categoryButton material-icons';
  document.getElementById('sightsButton').className = 'categoryButton selected material-icons';
}

function showEvents() {
  document.getElementById('information').style.display='none';
  document.getElementById('events').style.display='block';
  document.getElementById('sights').style.display='none';
  document.getElementById('informationButton').className = 'categoryButton material-icons';
  document.getElementById('eventsButton').className = 'categoryButton selected material-icons';
  document.getElementById('sightsButton').className = 'categoryButton material-icons';
}

function placeSelected(placeName) {
  let intersectedPlace;

  scene.children.forEach((child) => {
    if(child.type === "Place" && child.name === placeName) {
      intersectedPlace = child;
      child.visible = true;
    } else if(child.county === placeName) {
      child.visible = true;
    }
  })

  var li, link, textDiv, imageDiv, name, image, title, descriptionDiv,
    description, dateDiv, date, starsDiv, stars, reference;
  const interestDiv = document.getElementById('interest');
  const placeHeading = document.getElementById('Place');
  const buttons = document.getElementById('Buttons');
  const hoverPlace = document.getElementById('hoverPlace');
  document.getElementById('homeView').style.display = 'none';
  interestDiv.style.display = 'block';
  document.getElementById('readButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById("stopButton").style.display = "none";
  document.getElementById('closeButton').style.display= 'block';
  TARGET = intersectedPlace.geometry.boundingSphere.center;
  zoomedAtTarget = true;
  scene.children.forEach((child) => {
    if((child.type === 'Place' && child.name !== intersectedPlace.name) || (child.type === 'Sight' && child.county !== intersectedPlace.name)) {
      child.visible = false;
    }
  });

  placeHeading.innerHTML=intersectedPlace.name;
  var sightsUl = document.getElementById("sights-dynamic-list");
  var eventsUl = document.getElementById("events-dynamic-list");
  const informationUl =document.getElementById('information-dynamic-list');

  while (informationUl.firstChild) {
    informationUl.removeChild(informationUl.firstChild);
  }

  counties[intersectedPlace.name.replace(/\s/g, '')].information.summary.forEach(function(entry, index) {
    li = document.createElement("li");
    li.id = index;
    li.setAttribute('class', "informationListItem");
    fact = document.createTextNode(entry);
    li.appendChild(fact);
    informationUl.appendChild(li);
  });

  li = document.createElement("li");
  li.setAttribute('class', "informationListItem");
  fact = document.createTextNode("This information was summarised using Gensim's Summarisation tool but it originally came from ");
  li.appendChild(fact);
  reference = document.createElement("a");
  reference.appendChild(document.createTextNode("here"));
  reference.href = counties[intersectedPlace.name.replace(/\s/g, '')].information.link;
  reference.target= "_blank";
  li.appendChild(reference);
  informationUl.appendChild(li);

  while(sightsUl.firstChild){
    sightsUl.removeChild(sightsUl.firstChild);
  }

  counties[intersectedPlace.name.replace(/\s/g, '')].sights.forEach(function(entry, index) {
    li = document.createElement("li");
    li.id = index;
    li.setAttribute('class', "sightsListItem");
    link = document.createElement("a"); 
    link.href = entry.url;       
    link.target = "_blank";
    textDiv = document.createElement("div");
    textDiv.setAttribute('class', "sightsListItemInfo");
    imageDiv = document.createElement("div");
    imageDiv.setAttribute('class', "sightsListItemImageDiv");
    name = document.createTextNode(entry.name);
    stars = entry.rating > 0 ? document.createTextNode(entry.rating + "\u{272D}".repeat(Math.round(entry.rating))) : document.createTextNode("");
    image = document.createElement("img");
    image.setAttribute('class', "sightsListItemImage");
    image.src = entry.imageUrl;
    title = document.createElement("div");
    title.appendChild(name);
    title.setAttribute('class', "sightsListItemTitle");
    starsDiv = document.createElement("div");
    starsDiv.appendChild(stars);
    starsDiv.setAttribute('class', "sightsListItemStars");
    textDiv.appendChild(title);
    textDiv.appendChild(starsDiv);
    imageDiv.appendChild(image);
    link.appendChild(textDiv);
    link.appendChild(imageDiv);
    li.appendChild(link);
    li.appendChild(link);
    sightsUl.appendChild(li);
  });

  while(eventsUl.firstChild){
    eventsUl.removeChild(eventsUl.firstChild);
  }

  counties[intersectedPlace.name.replace(/\s/g, '')].events.forEach(function(entry, index) {
    li = document.createElement("li");
    li.id = index;
    li.setAttribute('class', "sightsListItem");
    link = document.createElement("a"); 
    link.href = entry.url;       
    link.target = "_blank";
    textDiv = document.createElement("div");
    textDiv.setAttribute('class', "sightsListItemInfo");
    imageDiv = document.createElement("div");
    imageDiv.setAttribute('class', "sightsListItemImageDiv");
    name = document.createTextNode(entry.name);
    description = document.createTextNode(entry.description);
    date = document.createTextNode(moment(entry.time).format("ddd, MMM D h:mmA").toUpperCase());
    image = document.createElement("img");
    image.setAttribute('class', "sightsListItemImage");
    image.src = entry.imageUrl;

    title = document.createElement("div");
    title.appendChild(name);
    title.setAttribute('class', "sightsListItemTitle");

    dateDiv = document.createElement("div");
    dateDiv.appendChild(date);
    dateDiv.setAttribute('class', "sightsListItemTime");

    descriptionDiv = document.createElement("div");
    descriptionDiv.appendChild(description);
    descriptionDiv.setAttribute('class', "sightsListItemDescription");

    textDiv.appendChild(title);
    textDiv.appendChild(dateDiv);
    textDiv.appendChild(descriptionDiv);
    
    imageDiv.appendChild(image);
    link.appendChild(textDiv);
    link.appendChild(imageDiv);
    li.appendChild(link);
    li.appendChild(link);
    eventsUl.appendChild(li);
  });
}

function zoomIn() {
  controls.dIn(1.2);
}

function zoomOut() {
  controls.dOut(1.2);
}

function myLocation() {
  if(address.length > 0) {
    scene.children.forEach((c) => {
      if (c.type === "Place") {
        if(address.toLowerCase().includes(c.name.toLowerCase())) {
          placeSelected(c.name);
        }
      }
    });
  }
}

function read() {
  const text = document.getElementById('informationText').innerText;
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

  document.getElementById('readButton').style.display = 'none';
  document.getElementById('pauseButton').style.display = 'inline-block';
  document.getElementById('stopButton').style.display = 'inline-block';
}

function pause() {
  document.getElementById('readButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  window.speechSynthesis.cancel();
}

function stop() {
  document.getElementById('readButton').style.display = 'inline-block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'none';
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
    if(child.type === 'Place') {
      if (!substr) {
        test = true;
      } else if (child.name.toLowerCase().startsWith(substr.toLowerCase())) {
        test = true;
      }

      if (test) {
        child.visible = true;
        validCounties.push(
          {
            id: child.order,
            name: child.name
          } 
        );
      } else {
        child.visible = false;
      }
    } else if(child.type === 'Sight') {
      if (!substr) {
        child.visible = true;
      } else if (child.county.toLowerCase().startsWith(substr.toLowerCase())) {
        child.visible = true;
      } else {
        child.visible = false;
      }
    }
  });

  validCounties.sort((a, b) => {
    return a.id - b.id;
  });

  validCounties.forEach((county) => {
    tr = document.createElement('tr');
    td = document.createElement('td');
    countyName = document.createTextNode(county.name);
    td = document.createElement('td');
    td.appendChild(countyName);
    td.setAttribute('class', 'tableCountyName');
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
  const zoomInButton = document.getElementById('zoomInButton');
  zoomInButton.onclick = () => { zoomIn(); }
  const zoomOutButton = document.getElementById('zoomOutButton');
  zoomOutButton.onclick = () => { zoomOut(); }
  const myLocationButton = document.getElementById('myLocationButton');
  myLocationButton.onclick = () => { myLocation(); }

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

  document.body.appendChild(renderer.domElement);
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

  data.sights.data.sort(function(a, b) {
    return b.rating - a.rating;
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
    document.getElementById('spinnerDiv').style.display = 'none';
  }, 100);
}

function errData(err) {
  console.log(err);
}


module.exports = { stop, placeSelected }
