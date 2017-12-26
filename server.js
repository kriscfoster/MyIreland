const express = require('express');
const rp = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);
const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const key = 'AIzaSyC2t91Kl0Z0vlafB5xM3z8CGYLanQLRDOM';
var sights = [];
var events = [];
var sight = {};
var event = {};

const placeTypes = [
	'amusement_park',
	'aquarium',
	'art_gallery',
	'museum',
	'stadium',
	'university',
	'zoo'
];

const counties = [
	"Carlow",
	"Cavan",
	"Clare",
	"Cork",
	"Donegal",
	"Dublin",
	"Galway",
	"Kerry",
	"Kildare",
	"Kilkenny",
	"Laois",
	"Leitrim",
	"Limerick",
	"Longford",
	"Louth",
	"Mayo",
	"Meath",
	"Monaghan",
	"Offaly",
	"Roscommon",
	"Sligo",
	"Tipperary",
	"Waterford",
	"Westmeath",
	"Wexford",
	"Wicklow",
	"Northern Ireland"
];

const northernIrlandCounties = [
	"Antrim",
	"Armagh",
	"Derry",
	"Down",
	"Fermanagh",
	"Tyrone",
];

const pathA = `${url}region=ie&type=${placeTypes[0]}&key=${key}`;
const pathB = `${url}region=ie&type=${placeTypes[1]}&key=${key}`;
const pathC = `${url}region=ie&type=${placeTypes[2]}&key=${key}`;
const pathD = `${url}region=ie&type=${placeTypes[3]}&key=${key}`;
const pathE = `${url}region=ie&type=${placeTypes[4]}&key=${key}`;
const pathF = `${url}region=ie&type=${placeTypes[5]}&key=${key}`;
const pathG = `${url}region=ie&type=${placeTypes[6]}&key=${key}`;

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
};

var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function writeUserData(data, location) {
  database.ref(location).set({
  	data
  });
}

function writeEvents() {
	const b = "http://api.eventful.com/json/events/search?app_key=SFdqgfDLvpk62fwL&location=Cavan&date=Future";
	rp(b, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  body = JSON.parse(body);

	  body.events.event.map((e) => {
	  	event = {};
	  	event.name = e.title;
	  	event.description = e.description;
	  	event.venue = e.venue_name;
	  	event.time = e.start_time;
	  	events.push(event);
	  });

	  console.log(events);
	  writeUserData(events, "events");
	});
}

function writeSights() {
	makeRequest(pathA).then(() => {
		makeRequest(pathB).then(() => {
			makeRequest(pathC).then(() => {
				makeRequest(pathD).then(() => {
					makeRequest(pathE).then(() => {
						makeRequest(pathF).then(() => {
							makeRequest(pathG).then(() => {
								console.log(sights);
								writeUserData(sights, "sights");
							});
						});
					});
				});
			});
		});
	});
}

function makeRequest(path) {
	var county;

	return (
		rp(path, function (error, response, body) {
		  console.log('error:', error);
		  console.log('statusCode:', response && response.statusCode);
		  body = JSON.parse(body);

		  body.results.map((place, index) => {

		  	counties.map((c) => {
		  		if(place.formatted_address.toLowerCase().includes(c.toLowerCase())) {
		  			county = c;
		  		}
		  	});

		  	sight = { name: place.name, county: county, rating: 1, imageUrl: "http://chicagotonight.wttw.com/sites/default/files/styles/full/public/article/image-non-gallery/Spire%201.jpg?itok=AGKlcHuJ" };
		  	sights.push(sight);
		  });
		})
	)
}

app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

console.log("Server is running at PORT: " + PORT);

// writeEvents();
// writeSights();
