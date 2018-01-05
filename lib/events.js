const rp = require('request-promise');
const firebase = require('firebase');

const eventbriteKey = process.env.EVENTBRITE_KEY;
const eventfulKey = process.env.EVENTFUL_KEY;

const eventbriteEventsRoute = "https://www.eventbriteapi.com/v3/events/search/";
const eventbriteVenuesRoute = "https://www.eventbriteapi.com/v3/venues/";
const eventfulEventsRoute = "http://api.eventful.com/json/events/search?";

const counties = require('../res/counties.js').counties;
const defaultImgUrl = "http://events.accessatlanta.com/image?method=image.icrop&context=event.yield&id=26332&w=350&h=-1";

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

if(process.env.USE_EVENTFUL) {
	//eventfulGetEventsForEveryCounty(counties);
} else {
	//eventbriteGetEventsForEveryCounty(counties);
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
			console.log("done", completedCounties);
			console.log("out of", counties.length);

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

function eventfulGetEventsForCounty(county) {
	const events = [];
	const path = `${eventfulEventsRoute}app_key=${eventfulKey}&location=${county},Ireland&date=Future`;

	return new Promise((resolve, reject) => {
		rp(path, function (error, response, body) {
			body = JSON.parse(body);
			var itemsProcessed = 0;

			if(body.events.event.length === 0) {
				resolve([]);
			}

			body.events.event.map((e) => {
				event = {};
				event.name = e.title;
				event.url = e.url;
				event.latitude = e.latitude;
				event.longitude = e.longitude;
				event.imageUrl = e.image ? e.image.medium.url : defaultImgUrl;
				event.description = e.description;
				event.venue = e.venue_name;
				event.county = e.region_name;
				event.time = e.start_time;
				events.push(event);
				itemsProcessed++;

				if (itemsProcessed === body.events.event.length) {
					return resolve(events);
				}
			});
		});
	})
	.catch((err) => {
		return reject(err.error);
	})
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
					writeUserData(events, "events");
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
		  		const events = parsedBody.events;
		  		var itemsProcessed = 0;

		  		if (events.length === 0) {
		  			return resolve([]);
		  		}

		  		events.map((e) => {
		  			event = {
		  				name: e.name.text,
		  				description: e.description.text,
		  				url: e.url,
		  				time: e.start.local,
		  				imageUrl: e.logo ? e.logo.url : defaultImgUrl,
		  				county: county
		  			};

		  			eventsForCounty.push(event);
		  			itemsProcessed++;

					if (itemsProcessed === events.length) {
						return resolve(eventsForCounty);
					}

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