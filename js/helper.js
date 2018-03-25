/* global firebase */
/* eslint-disable no-process-env */
/* eslint-disable max-statements */

const moment = require('moment');

let closeButton, easyEnglish, events, eventsButton, eventsUl, homeView,
  information, informationButton, informationUl, interestDiv, pauseButton,
  placeHeading, readButton, sidePanel, sights, sightsButton, sightsUl,
  stopButton, zoomInButton, zoomOutButton;

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

const REFERENCE_STRING = 'This information was summarised using Gensim\'s' +
  'Summarisation tool but it originally came from ';
const ZOOM_STRENGTH = 1.2;
const ZERO = 0;
const LAST_INDEX = -1;
const VOICE_INDEX = 66;
const FLESH_THRESHOLD = 65;
const INTERVAL = 200;

module.exports = (scene, camera, controls, counties) => {
  /**
   * Initializes elements from the DOM
   */
  function initializeElements() {
    interestDiv = document.getElementById('interest');
    placeHeading = document.getElementById('Place');
    information = document.getElementById('information');
    events = document.getElementById('events');
    sights = document.getElementById('sights');
    sightsUl = document.getElementById('sights-dynamic-list');
    eventsUl = document.getElementById('events-dynamic-list');
    homeView = document.getElementById('homeView');
    closeButton = document.getElementById('closeButton');
    informationButton = document.getElementById('informationButton');
    sightsButton = document.getElementById('sightsButton');
    eventsButton = document.getElementById('eventsButton');
    readButton = document.getElementById('readButton');
    pauseButton = document.getElementById('pauseButton');
    stopButton = document.getElementById('stopButton');
    informationUl =document.getElementById('information-dynamic-list');
    easyEnglish = document.getElementById('easyEnglish');
    zoomInButton = document.getElementById('zoomInButton');
    zoomOutButton = document.getElementById('zoomOutButton');
    sidePanel = document.getElementById('sidePanel');
  }

  /**
   * Closes the interest in county.
   */
  function closeInterest() {
    interestDiv.style.display = 'none';
    homeView.style.display = 'block';
    information.style.display='block';
    events.style.display='none';
    sights.style.display='none';
    closeButton.style.display='none';
    informationButton.className = 'categoryButton selected material-icons';
    sightsButton.className = 'categoryButton material-icons';
    eventsButton.className = 'categoryButton material-icons';
    readButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    stopButton.style.display = 'none';
    stop();
  }

  /**
   * Show information for a county.
   */
  function showInformation() {
    information.style.display='block';
    events.style.display='none';
    sights.style.display='none';
    informationButton.className = 'categoryButton selected material-icons';
    eventsButton.className = 'categoryButton material-icons';
    sightsButton.className = 'categoryButton material-icons';
  }

  /**
   * Show sights for a county.
   */
  function showSights() {
    information.style.display='none';
    events.style.display='none';
    sights.style.display='block';
    informationButton.className = 'categoryButton material-icons';
    eventsButton.className = 'categoryButton material-icons';
    sightsButton.className = 'categoryButton selected material-icons';
  }

  /**
   * Show events for a county.
   */
  function showEvents() {
    information.style.display='none';
    events.style.display='block';
    sights.style.display='none';
    informationButton.className = 'categoryButton material-icons';
    eventsButton.className = 'categoryButton selected material-icons';
    sightsButton.className = 'categoryButton material-icons';
  }

  /**
   * Append information for a selected county.
   * @param {String} countyName - Name of county.
   */
  function appendAllInformation(countyName) {
    let fact, li;
    easyEnglish.checked = false;

    while (informationUl.firstChild) {
      informationUl.removeChild(informationUl.firstChild);
    }

    counties[countyName].information.summary.forEach((entry, index) => {
      li = document.createElement('li');
      li.id = index;
      li.difficulty = entry.difficulty;
      li.setAttribute('class', 'informationListItem');
      fact = document.createTextNode(entry.text);
      li.appendChild(fact);
      informationUl.appendChild(li);
    });

    li = document.createElement('li');
    li.difficulty = 100;
    li.setAttribute('class', 'informationListItem');
    fact = document.createTextNode(REFERENCE_STRING);
    li.appendChild(fact);
    const reference = document.createElement('a');
    reference.appendChild(document.createTextNode('here'));
    reference.href = counties[countyName].information.link;
    reference.target= '_blank';
    li.appendChild(reference);
    informationUl.appendChild(li);
  }

  /**
   * Creates a stars div for a sight.
   * @param {Int} rating - rating for sight.
   * @returns {DOM} div for stars.
   */
  function createStarsDiv(rating) {
    const starsUniCode = '\u{272D}';
    const stars = rating > ZERO ?
      document.createTextNode(rating +
        starsUniCode.repeat(Math.round(rating))) :
      document.createTextNode('');
    const starsDiv = document.createElement('div');
    starsDiv.appendChild(stars);
    starsDiv.setAttribute('class', 'sightsListItemStars');
    return starsDiv;
  }

  /**
   * Creates an image div.
   * @param {JSON} entry - entry of sight.
   * @returns {DOM} image div.
   */
  function createImageDiv(entry) {
    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    imageDiv.setAttribute('class', 'sightsListItemImageDiv');
    image.setAttribute('class', 'sightsListItemImage');
    image.src = entry.imageUrl;
    imageDiv.appendChild(image);
    return imageDiv;
  }

  /**
   * Creates an date div.
   * @param {Int} date - date.
   * @returns {DOM} date div.
   */
  function createDateDiv(date) {
    const dateDiv = document.createElement('div');
    const dateText = document.createTextNode(moment(date)
      .format('ddd, MMM D h:mmA').toUpperCase());
    dateDiv.appendChild(dateText);
    dateDiv.setAttribute('class', 'sightsListItemTime');
    return dateDiv;
  }

  /**
   * Creates a link element.
   * @param {url} url - url for link.
   * @returns {DOM} an 'a' element.
   */
  function createLinkElement(url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    return link;
  }

  /**
   * Creates a link element.
   * @param {url} name - name for div.
   * @returns {DOM} Title div.
   */
  function createTitleDiv(name) {
    const title = document.createElement('div');
    const nameNode = document.createTextNode(name);
    title.appendChild(nameNode);
    title.setAttribute('class', 'sightsListItemTitle');
    return title;
  }

  /**
   * Creates a sight list item.
   * @param {JSON} entry - entry of sight.
   * @param {Int} index - index of sight.
   * @returns {DOM} list item for sight.
   */
  function createSightsListItem(entry) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const textDiv = document.createElement('div');
    const title = createTitleDiv(entry.name);
    const imageDiv = createImageDiv(entry);
    const starsDiv = createStarsDiv(entry.rating);

    link.href = entry.url;
    link.target = '_blank';
    textDiv.setAttribute('class', 'sightsListItemInfo');
    textDiv.appendChild(title);
    textDiv.appendChild(starsDiv);
    link.appendChild(textDiv);
    link.appendChild(imageDiv);
    li.appendChild(link);
    return li;
  }

  /**
   * Creates an events list item.
   * @param {JSON} entry - entry of event.
   * @param {Int} index - index of event.
   * @returns {DOM} list item for event.
   */
  function createEventsListItem(entry) {
    const li = document.createElement('li');
    const textDiv = document.createElement('div');
    const title = createTitleDiv(entry.name);
    const descriptionDiv = document.createElement('div');
    const description = document.createTextNode(entry.description);
    const link = createLinkElement(entry.url);
    const imageDiv = createImageDiv(entry);
    const dateDiv = createDateDiv(entry.time);

    textDiv.setAttribute('class', 'sightsListItemInfo');
    descriptionDiv.appendChild(description);
    descriptionDiv.setAttribute('class', 'sightsListItemDescription');
    textDiv.appendChild(title);
    textDiv.appendChild(dateDiv);
    textDiv.appendChild(descriptionDiv);
    link.appendChild(textDiv);
    link.appendChild(imageDiv);
    li.appendChild(link);
    return li;
  }

  /**
   * Read information.
   */
  function read() {
    const text = document.getElementById('informationText').innerText;
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    let audio, sentence;

    const timer = setInterval(() => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        for (let i = 0; i < sentences.length; i++) {
          sentence = sentences[i];
          audio = new SpeechSynthesisUtterance(sentence);
          audio.voice = voices[VOICE_INDEX];
          window.speechSynthesis.speak(audio);
          clearInterval(timer);
        }
      }
    }, INTERVAL);

    readButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    stopButton.style.display = 'inline-block';
  }

  /**
   * Pause the read.
   */
  function pause() {
    document.getElementById('readButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'none';
    window.speechSynthesis.cancel();
  }

  /**
   * Easy english toggle clicked
   * @param {JSON} event - click toggle event
   */
  function easyEnglishHandler(event) {
    const items = informationUl.getElementsByTagName('li');

    if (event.target.checked) {
      for (let i = 0; i < items.length; ++i) {
        if (items[i].difficulty < FLESH_THRESHOLD) {
          items[i].style.display = 'none';
        }
      }
    } else {
      for (let i = 0; i < items.length; ++i) {
        items[i].style.display = 'block';
      }
    }
  }

  /**
   * Filtering counties by substring
   * @param {String} substr - Substring to filter by.
   */
  function filterCounties(substr) {
    const countiesTable = document.getElementById('counties-dynamic-table');
    let countyName, td, tr;
    const validCounties = [];

    while (countiesTable.firstChild) {
      countiesTable.removeChild(countiesTable.firstChild);
    }

    scene.children.forEach((child) => {
      let test = false;
      if (child.type === 'Place') {
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
      } else if (child.type === 'Sight') {
        if (!substr) {
          child.visible = true;
        } else if (child.county.toLowerCase()
          .startsWith(substr.toLowerCase())) {
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

  /**
   * Search for county has changed
   * @param {JSON} event - search changed event.
   */
  function searchChanged(event) {
    let valid = false;

    scene.children.forEach((child) => {
      if (child.name.toLowerCase()
        .startsWith(event.target.value.toLowerCase())) {
        valid = true;
      }
    });

    if (valid) {
      filterCounties(event.target.value);
    } else {
      document.getElementById(event.target.id).value =
        event.target.value.slice(ZERO, LAST_INDEX);
    }
  }

  /**
   * Successfully got data.
   * @param {JSON} dataObj - Data object received.
   */
  function gotData(dataObj) {
    const data = dataObj.val();

    data.events.data.map((e) => {
      if (counties[e.county]) {
        counties[e.county].events.push(e);
      }
    });

    data.sights.data.sort((a, b) => {
      return b.rating - a.rating;
    });

    data.sights.data.map((e) => {
      if (counties[e.county]) {
        counties[e.county].sights.push(e);
      }
    });

    for (const key in data.counties) {
      if (counties[key]) {
        counties[key].information = data.counties[key];
      }
    }

    setTimeout(() => {
      filterCounties();
      document.getElementById('spinnerDiv').style.display = 'none';
    }, INTERVAL);
  }

  /**
   * Handler for failed retrieval of data.
   * @param {JSON} err - error.
   */
  function errData(err) {
    console.log(err);
  }

  return {
    onLoadHandler: () => {
      initializeElements();
      closeButton.addEventListener('click', closeInterest);
      informationButton.addEventListener('click', showInformation);
      sightsButton.addEventListener('click', showSights);
      eventsButton.addEventListener('click', showEvents);
      readButton.addEventListener('click', read);
      pauseButton.addEventListener('click', pause);
      stopButton.addEventListener('click', stop);
      easyEnglish.addEventListener('click', easyEnglishHandler);
      document.getElementById('searchCounties')
        .addEventListener('input', searchChanged);

      zoomInButton.onclick = () => {
        controls.dIn(ZOOM_STRENGTH);
      };

      zoomOutButton.onclick = () => {
        controls.dOut(ZOOM_STRENGTH);
      };

      sidePanel.onmouseenter = () => {
        controls.enabled = false;
      };

      sidePanel.onmouseleave = () => {
        controls.enabled = true;
      };

      firebase.initializeApp(firebaseConfig);
      const database = firebase.database();
      const ref = database.ref();
      ref.once('value', gotData, errData);
    },


    /**
     * Stop playing speech synthesis.
     */
    stop: () => {
      document.getElementById('readButton').style.display = 'inline-block';
      document.getElementById('pauseButton').style.display = 'none';
      document.getElementById('stopButton').style.display = 'none';
      window.speechSynthesis.cancel();
    },

    /**
     * A place was selected so carry out necessary steps.
     * @param {String} placeName - Name of county selected.
     */
    placeSelectedHandler: (placeName) => {
      let li;

      homeView.style.display = 'none';
      interestDiv.style.display = 'block';
      readButton.style.display = 'inline-block';
      pauseButton.style.display = 'none';
      stopButton.style.display = 'none';
      closeButton.style.display= 'block';

      scene.children.forEach((child) => {
        if ((child.type === 'Place' && child.name !== placeName) ||
          (child.type === 'Sight' && child.county !== placeName)) {
          child.visible = false;
        }
      });

      placeHeading.innerHTML = placeName;

      appendAllInformation(placeName.replace(/\s/g, ''));
      showInformation();

      while (sightsUl.firstChild) {
        sightsUl.removeChild(sightsUl.firstChild);
      }

      counties[placeName.replace(/\s/g, '')]
        .sights.forEach((entry, index) => {
          li = createSightsListItem(entry, index);
          li.id = index;
          li.setAttribute('class', 'sightsListItem');
          sightsUl.appendChild(li);
        });

      while (eventsUl.firstChild){
        eventsUl.removeChild(eventsUl.firstChild);
      }

      counties[placeName.replace(/\s/g, '')]
        .events.forEach((entry, index) => {
          li = createEventsListItem(entry, index);
          li.id = index;
          li.setAttribute('class', 'sightsListItem');
          eventsUl.appendChild(li);
        });
    }
  };
};
