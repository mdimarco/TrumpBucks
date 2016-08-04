var express = require('express');
var app = express();
var path = require('path');

var consumerKey = process.env.TWITTER_CONSUMER_KEY;
var consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

var twitter_poll = require('./twitter-poll')(consumerKey, consumerSecret);



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(ignore, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/poll_tweets', function(req, res) {
	console.log(req.query)
	twitter_poll('donald trump OR trump -filter:retweets', req.query.max_id, req.query.count, function(tweets) {
		res.send(tweets);
	});
});

app.listen(process.env.PORT || 5000);