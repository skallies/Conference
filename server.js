// Import the Modules installed to our server
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./server/api');
//Start the Express web framework

var app = express();

// configure app
app.use(bodyParser());

// port where the application will run
var port = process.env.PORT || 8080;

// Import Mongoose
var mongoose = require('mongoose');
// find an appropriate database to connect to, 
// default to localhost if we can't find one
var uriPath = process.env.MONGOLAB_URI ||
							process.env.MONGOHQ_URL ||
							'mongodb://localhost/conferenceDB';

//connect to the database
mongoose.connect(uriPath, function(err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uriPath + '. ' + err);
	} else {
		console.log('Successfully connected to database at ' + uriPath);
	}
});

app.get('/', function(req, res) {
	res.send('get successful');
});

app.use('/api', api);

app.listen(port, function(err, res) {
	if (err) {
		console.log('ERROR connecting to server on port: ' + port);
	} else {
		console.log('Server running at http://localhost:' + port);
	}
});