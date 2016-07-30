
var request = require('request');
var twitter_auth = require('./twitter-auth');
var accessToken = '';

/**
 * Initializes tweet-poller, setting access token and returning poll function
 * @param  String key    	consumer key
 * @param  String secret 	consumer secret
 * @return function 		'poll' function described later in file
 */
module.exports = function(key, secret) {
	//Get the access token needed to poll tweets
	twitter_auth(key, secret,
		function(twitterAccessToken) {
			accessToken = twitterAccessToken;
		});
	return poll;
};

function formatTweets(rawText) {
	if(!rawText) {
		console.log("Error: no rawtext of tweets provided");
	}
	return JSON.parse(rawText).statuses;
}

function poll(searchTerm, callback) {
	if(!accessToken) {
		console.log("ERROR: No access token to poll with");
	} else {
		var query = encodeURI(searchTerm);
		var options = { 
			headers: {
				Authorization: 'Bearer '+accessToken 
			},
			url: 'https://api.twitter.com/1.1/search/tweets.json?q='+query
		};

		request.get(options, function(err, resp, body){
			if(err) {
				console.log("Error retrieving tweets",err);
			} else{
				callback(formatTweets(body));
			}
		});
	}
}
