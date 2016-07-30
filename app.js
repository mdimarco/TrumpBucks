var express = require('express');
var app = express();
var path = require('path');

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
	consumerKey: process.env.TWITTER_CONSUMER_KEY,
	consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
	callback: ''
});


app.use(express.static(path.join(__dirname, 'public')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 5000);