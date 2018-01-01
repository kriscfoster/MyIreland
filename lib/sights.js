const rp = require('request-promise');
const firebase = require('firebase');
const Flickr = require("flickrapi");

const googlePlacesRoute = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const googlePhotoRoute = 'https://maps.googleapis.com/maps/api/place/photo?';
const googlePlacesKey = 'AIzaSyC2t91Kl0Z0vlafB5xM3z8CGYLanQLRDOM';

const flickrKey = process.env.FLICKR_KEY;
const flickrSecret = process.env.FLICKR_SECRET;
const flickrOptions = { api_key: flickrKey, secret: flickrSecret };
const counties = require('../res/counties.js').counties;

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

//getSightsForEveryCounty(counties);

function getSightsForEveryCounty(counties) {
	var sights = [];
	var completedCounties = 0;
	var error;

	counties.map((county) => {
		getSightsForCounty(county)
		.then((newSights) => {
			console.log(`Got ${newSights.length} sights for ${county}`);
			sights = sights.concat(newSights);
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
					console.log("Failed to update sights: ", error);
				} else {
					console.log(`total sights: ${sights.length}`);
					console.log("Getting images from Flickr now");
					var completedSights = 0;

					sights.map((sight) => {
						Flickr.tokenOnly(flickrOptions, function(error, flickr) {
							flickr.photos.search({
						  		text: sight.name,
						  		sort: "relevance"
							}, function(err, result) {
						  		if(err) { throw new Error(err); }
						  		if(result.photos.photo.length > 0) {
							  		const photo = result.photos.photo[0];
									const farmId = photo.farm;
									const serverId = photo.server;
									const secret = photo.secret;
									const id = photo.id;
									const link = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_q.jpg`;
									console.log(link);
									sight.imageUrl = link;
						  		}

						  		completedSights++;

						  		if(completedSights === sights.length) {
						  			console.log("Finished getting images");
						  			writeUserData(sights, "sights");
						  			console.log("updated sights")
						  		}
							});
						});
					});	
				}
			}
		});
	});
}


function getSightsForCounty(county) {
	const path = `${googlePlacesRoute}query=${county},Ireland+point+of+interest&key=${googlePlacesKey}`;
	var sightsForCounty = [];
	var sight = {};

	return new Promise((resolve, reject) => {
		rp(path, function (error, response, body) {
		  	const parsedBody = JSON.parse(body);
		  	const sights = parsedBody.results;
		  	var itemsProcessed = 0;

	  		if (sights.length === 0) {
	  			return resolve([]);
	  		}

		  	sights.map((sight) => {
		  		if(sight.photos) {
		  			console.log(sight.photos[0]);
		  		}

		  		sight = { 
			  		name: sight.name,
			  		rating: sight.rating ? sight.rating : 0,
			  		imageUrl: sight.icon,
			  		county: county,
			  	};

			  	itemsProcessed++;
			  	sightsForCounty.push(sight);

				if (itemsProcessed === sights.length) {
					return resolve(sightsForCounty);
				}
			 });
		})
		.catch((err) => {
			return reject(err.error);
		});
	});
}



function writeUserData(data, location) {
  database.ref(location).set({
  	data
  });
}
