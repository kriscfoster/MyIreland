const express = require('express');
const rp = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const googlePlacesRoute = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const googlePlacesKey = 'AIzaSyC2t91Kl0Z0vlafB5xM3z8CGYLanQLRDOM';

const placeTypes = [
	'amusement_park',
	'aquarium',
	'art_gallery',
	'museum',
	'stadium',
	'university',
	'zoo'
];

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

function getAllSightsTypes() {
	var sights = [];

	var promises = [];

	getSightsForType(placeTypes[0]).then(() => {
		getSightsForType(placeTypes[1]).then(() => {
			getSightsForType(placeTypes[2]).then(() => {
				getSightsForType(placeTypes[3]).then(() => {
					getSightsForType(placeTypes[4]).then(() => {
						getSightsForType(placeTypes[5]).then(() => {
							getSightsForType(placeTypes[6]).then(() => {
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

function getSightsForType(type) {
	var county;
	var sight = {};
	var path = `${googlePlacesRoute}region=ie&type=${type}&key=${googlePlacesKey}`;

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

		  	sight = { name: place.name, county: county, rating: 1, imageUrl: defaultImgUrl };
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
