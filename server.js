// Import the Modules installed to our server
var express = require('express');
var bodyParser = require('body-parser');

//Start the Express web framework

var app = express();

// configure app
app.use(bodyParser());

// port where the application will run
var port = process.env.PORT || 8080;

// Import Mongoose
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/conferenceDB');

app.get('/', function(req, res) {
	res.send('get successful');
});
app.listen(port);
console.log('Server running at http://localhost:' + port);
