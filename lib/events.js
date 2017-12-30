const rp = require('request-promise');
const firebase = require('firebase');

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

const eventbriteEventsRoute = "https://www.eventbriteapi.com/v3/events/search/";
const eventbriteVenuesRoute = "https://www.eventbriteapi.com/v3/venues/";




const eventbriteKey = "TPIDFBTICC5WWWGHWSLD";
const defaultImgUrl = "http://chicagotonight.wttw.com/sites/default/files/styles/full/public/article/image-non-gallery/Spire%201.jpg?itok=AGKlcHuJ";
const counties = require('../res/counties.js').counties;

if(process.env.USE_EVENTBRITE) {
	eventbriteGetEventsForEveryCounty(counties);
} else {
	eventfulGetEventsForEveryCounty(counties);
}

 function eventfulGetEventsForEveryCounty(counties) {
	var events = [];
	var completedCounties = 0;
	var error;

	counties.map((county) => {
		eventfulGetEventsForCounty(county)
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

 function eventfulGetEventsForCounty(county) {
	const events = [];
	const b = `http://api.eventful.com/json/events/search?app_key=SFdqgfDLvpk62fwL&location=${county},Ireland&date=Future`;

	return new Promise((resolve, reject) => {
		rp(b, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			body = JSON.parse(body);

			if(body.events.event.length === 0) {
				resolve([]);
			}

			body.events.event.map((e) => {

				//console.log(e.image);

				event = {};
				event.name = e.title;
				event.imageUrl = e.image ? e.image.medium.url : defaultImgUrl;
				event.description = e.description;
				event.venue = e.venue_name;
				event.county = e.region_name;
				event.time = e.start_time;
				events.push(event);
			});

			console.log(events);
			return resolve(events);
		});
	});
 }

function eventbriteGetEventsForEveryCounty(counties) {
	var events = [];
	var eventNames = [];
	var completedCounties = 0;
	var error;

	counties.map((county) => {
		eventbriteGetEventsForCounty(county)
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
					//writeUserData(events, "events");
				}
			}
		});
	});
}

function eventbriteGetEventsForCounty(county) {
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
					const path = `${eventbriteVenuesRoute}${e.venue_id}/?token=${eventbriteKey}`;
					rp(path, function (error, response, venueBody) {
						var countyName;
						parsedVenueBody = JSON.parse(venueBody);
					
						if (parsedVenueBody.address) {
							if(parsedVenueBody.address.region) {
								if(parsedVenueBody.address.region.toLowerCase().includes(county.toLowerCase())) {
									countyName = county;

									event = { 
										name: e.name.text,
										description: e.description.text,
										imageUrl: e.logo ? e.logo.original.url : defaultImgUrl,
										county: countyName
									};

									eventsForCounty.push(event);
								}
							}
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

function writeUserData(data, location) {
  database.ref(location).set({
  	data
  });
}