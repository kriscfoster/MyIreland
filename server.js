const express = require('express');
const rp = require('request-promise');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

console.log("Server is running at PORT: " + PORT);
