const express = require('express');
const updateEvents = require('./update_scripts/update-events.js');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

console.log("Server is running at PORT: " + PORT);

function millisecondsUntilMidnight() {
    var midnightTime = new Date();
    midnightTime.setHours(24);
    midnightTime.setMinutes(0);
    midnightTime.setSeconds(0);
    midnightTime.setMilliseconds(0);
    return (midnightTime.getTime() - new Date().getTime());
}

function runUpdateEventScript() {
	updateEvents.updateEvents();

	setTimeout(() => {
		updateEvents.updateEvents();
	}, millisecondsUntilMidnight())
}


runUpdateEventScript();