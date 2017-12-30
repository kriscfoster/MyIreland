const express = require('express');
const rp = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const googlePlacesRoute = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const googlePlacesKey = 'AIzaSyC2t91Kl0Z0vlafB5xM3z8CGYLanQLRDOM';

const eventbriteEventsRoute = "https://www.eventbriteapi.com/v3/events/search/";
const eventbriteVenuesRoute = "https://www.eventbriteapi.com/v3/venues/";
const eventbriteKey = "TPIDFBTICC5WWWGHWSLD";

const defaultImgUrl = "http://chicagotonight.wttw.com/sites/default/files/styles/full/public/article/image-non-gallery/Spire%201.jpg?itok=AGKlcHuJ";

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

// function writeEvents() {
// 	const b = "http://api.eventful.com/json/events/search?app_key=SFdqgfDLvpk62fwL&location=Cavan&date=Future";
// 	rp(b, function (error, response, body) {
// 	  console.log('error:', error); // Print the error if one occurred
// 	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// 	  body = JSON.parse(body);

// 	  body.events.event.map((e) => {
// 	  	event = {};
// 	  	event.name = e.title;
// 	  	event.description = e.description;
// 	  	event.venue = e.venue_name;
// 	  	event.time = e.start_time;
// 	  	events.push(event);
// 	  });

// 	  console.log(events);
// 	  writeUserData(events, "events");
// 	});
// }



function getEventsForCounty(county) {
	const path = `${eventbriteEventsRoute}?location.address=${county},Ireland&token=${eventbriteKey}&sort_by=date`;
	var eventsForCounty = [];
	var event = {};

	return new Promise((resolve, reject) => {
		rp(path, function (error, response, body) {
		  	const parsedBody = JSON.parse(body);

		  	if (response.statusCode === 200) {
		  		const events = parsedBody.events.slice(0,20);
		  		var itemsProcessed = 0;

		  		if (events.length === 0) {
		  			return resolve([]);
		  		}

				events.map((e) => {
					rp(`${eventbriteVenuesRoute}${e.venue_id}/?token=${eventbriteKey}`, function (error, response, venueBody) {

						var countyName;
						parsedVenueBody = JSON.parse(venueBody);
					
						if (parsedVenueBody.address) {
							if(parsedVenueBody.address.region) {
								if(parsedVenueBody.address.region.toLowerCase().includes(county.toLowerCase())) {
									countyName = county;
								}
							}
						}

						if(countyName) {
							event = { 
								name: e.name.text,
								description: e.description.text,
								imageUrl: e.logo ? e.logo.original.url : defaultImgUrl,
								county: countyName
							};

							eventsForCounty.push(event);
						}
						
						itemsProcessed++;

						if (itemsProcessed === events.length) {
							return resolve(eventsForCounty);
						}
					})
					.catch((err) => {
						return reject(err.error);
					});
				});
			}
		})
		.catch((err) => {
			return reject(err.error);
		})
	})
}

function getEventsForEveryCounty() {
	var events = [];
	var eventNames = [];
	var completedCounties = 0;
	var error;

	counties.map((county) => {
		getEventsForCounty(county)
		.then((newEvents) => {
			console.log(`Got ${newEvents.length} events for ${county}`);
			events = events.concat(newEvents);
			completedCounties++;
		})
		.catch((err) => {
			error = err;
			console.log(`${county} - ${err}`);
			completedCounties++;
		})
		.then(() => {
			if(completedCounties === counties.length) {
				if(error) {
					console.log("Failed to update events: ", error);
				} else {
					console.log("updated events")
					console.log(`total events: ${events.length}`);
					writeUserData(events, "events");
				}
			}
		});
	});
}

getEventsForEveryCounty();

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

// writeEvents();
// writeSights();
