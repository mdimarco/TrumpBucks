var request = require('request');
/**
 * Requires node version 6 or higher (for the Buffer.from instead of Buffer constructer, 
 * and the request package
 *
 * Gains an access token from the twitter api
 * 
 * [twitter_auth description]
 * @param  String consumerKey    	twitter consumer key (given by dev.twitter.com)
 * @param  String consumerSecret 	twitter secret key   (^)
 * @param  function respCallback   	callback that gives the user their access token
 */
module.exports = function(consumerKey, consumerSecret, respCallback) {

	var options = {
		url: 'https://api.twitter.com/oauth2/token',
		headers: {
			Authorization: 'Basic ' + Buffer.from(consumerKey+":"+consumerSecret).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: 'grant_type=client_credentials'
	};

	request.post(options, function (err, resp, body) {
		if(err) {
			console.log("Oauth Error getting access token", err);
		}
		else {
			respCallback(JSON.parse(body).access_token);
		}
	});
};



 