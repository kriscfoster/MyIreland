function closeInterest() {
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
  document.body.appendChild(renderer.domElement);
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
} 