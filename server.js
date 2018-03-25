/* eslint-disable no-process-env */

const express = require('express');
const path = require('path');
const updateEvents = require('./update_scripts/update-events.js');
const app = express();
const DEFAULT_PORT_NUM = 3000;
const ZERO = 0;
const HOURS_IN_DAY = 24;
const PORT = process.env.PORT || DEFAULT_PORT_NUM;

app.listen(PORT);
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Gets the amount of milliseconds until midnight.
 * @returns {Int} - Amount of milliseconds until midnight.
 */
function millisecondsUntilMidnight() {
  const midnightTime = new Date();
  midnightTime.setHours(HOURS_IN_DAY);
  midnightTime.setMinutes(ZERO);
  midnightTime.setSeconds(ZERO);
  midnightTime.setMilliseconds(ZERO);
  return (midnightTime.getTime() - new Date().getTime());
}

/**
 * Runs the update events script to update DB.
 */
function runUpdateEventScript() {
  updateEvents.updateEvents();

  setTimeout(() => {
    updateEvents.updateEvents();
  }, millisecondsUntilMidnight());
}

// eslint-disable-next-line no-console
console.log('Server is running at PORT: ' + PORT);

if (process.env.UPDATE_EVENTS) {
  runUpdateEventScript();
}
