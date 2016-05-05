var express = require('express');
var router = express.Router();
var Speaker = require('./models/speaker');

// Defining the Routes for our API

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {
	// Give some message on the console
	console.log('An action was performed by the server.');
	// call the next() function or the route stops here
	next();
});

// Default message when access the API folder through the browser
router.get('/', function(req, res) {
	res.json({ message: 'Hello SPA the API is working!' });
});

// When accessing the speakers Routes
router.route('/speakers')
			.post (function(req, res) {
				var speaker = new Speaker();
				speaker.name = req.body.name;
				speaker.company = req.body.company;
				speaker.description = req.body.description;
				speaker.picture = req.body.picture;
				speaker.schedule = req.body.schedule;

				speaker.save(function(err) {
					if (err) {
						res.send(err);
					}	else {
						res.json({ message: 'speaker successfully created!' });
					}
				});
			})
			.get (function(req, res) {
				Speaker.find(function(err, speakers) {
					if (err) {
						res.send(err);
					} else {
						res.json(speakers);
					}
				});
			});

// on accessing speaker route by id
router.route('/speakers/:speaker_id')
			.get(function(req, res) {
				Speaker.findById(req.params.speaker_id, function(err, speaker) {
					if (err) {
						res.send(err);
					} else {
						res.json(speaker);
					}
				});
			})
			.put(function(req, res) {
				Speaker.findById(req.params.speaker_id, function(err, speaker) {
					if (err) {
						res.send(err);
					}
					speaker.name = req.body.name;
					speaker.company = req.body.company;
					speaker.title = req.body.title;
					speaker.description = req.body.descriptino;
					speaker.picture = req.body.picture;
					speaker.schedule = req.body.schedule;

					speaker.save(function(err) {
						if (err) {
							res.send(err);
						} else {
							res.json({ message: 'speaker successfully updated!'});
						}
					});
				});
			})
			.delete(function(req, res) {
				Speaker.remove({
					_id: req.params.speaker_id
				}, function(err, speaker) {
					if (err) {
						res.send(err);
					} else {
						res.json({ message: 'speaker successfully deleted!' });
					}
				});
			});

// export
module.exports = router;