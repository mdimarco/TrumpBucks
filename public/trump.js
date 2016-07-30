/*global window, $, createTrumpBuck */


/*
    trump.js
    An implementation of the TrumpFeed project.
*/

// This code will be executed when the page finishes loading
window.addEventListener('load', function () {
   pollTweets();
   setTimeout(function(){
		if(trumpCounter == 0){
			$("#navbar").append('<p class="error-msg">Note: If the trump-bucks are not loading, try using http:// in the browser header instead of https://</p>');
		}
	},2000);

}, false);

// Add more supporting code here!


var seenTweets = {};
var trumpCounter = 0;

function pollTweets () {
	getTweets(addTweetsToDOM);
	setTimeout(pollTweets, 3000);
}


//Send AJAX request to retrieve twitter rawtext
function getTweets (responseCallback) {
	$.get("/poll_tweets", function(rawResponse) {
		console.log(rawResponse)
		responseCallback(rawResponse);
	})
}

//Clean and then add/animate retrieved tweets
function addTweetsToDOM(rawResponse) {
	var cleanedTweets = cleanResponse(rawResponse);
	cleanedTweets.forEach(function (each) {
		trumpCounter += 1;
		var id = "tb-"+trumpCounter;
		createTrumpBuck(id);
		animateTrumpBuck("#"+id, Math.round( Math.random()*200 - 100), each);
	});

}

//Parse and clean response from AJAX request, 
function cleanResponse (rawResponse) {
	var filteredResponse = rawResponse.filter(function(each) { return !seenTweets[each.id] || true;}); 
	filteredResponse = filteredResponse.slice(0,25);
	filteredResponse.forEach(function(each){ seenTweets[each.id] = true;});
	return filteredResponse;
}

//Adds trump buck to the dom, and handles clicking / displaying the tweet
function createTrumpBuck(id) {
	$("body").append('<div id="'+id+'" class="trump-buck"><div class="trump-sign"><i class="fa fa-usd"></i></div><div class="tweet-container"><div class="trump-pic"><p class="trump-text"> E Pluribus Trumpum</p></div></div><div class="trump-sign"><i class="fa fa-usd"></i></div></div>');
	$("#"+id).css("left", Math.round( Math.random()*100-20 )+"%");
	$("#"+id).css("top", Math.round( Math.random()*200-250)+"px");


}