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


var seenTweets = {};
var trumpCounter = 0;
//After every poll, move the max id back to avoid polling duplicates
var maxId = '';



function pollTweets () {
	getTweets(addTweetsToDOM);
	setTimeout(pollTweets, 3000);
}

function getMaxId() {
	return maxId ? "max_id=" + maxId : '';
}

//Number of tweets to ask for
function getCount() {
	return "count=" + Math.round($(window).width() / 80);
}

//Send AJAX request to retrieve twitter rawtext
function getTweets (responseCallback) {
	var query = "/poll_tweets?"+getCount()+"&"+getMaxId();
	$.get(query, function(rawResponse) {
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
	var filteredResponse = rawResponse.filter(function(each) { return !seenTweets[each.id];}); 
	if(filteredResponse.length) {
		maxId = filteredResponse[filteredResponse.length-1].id_str;
	}
	if(filteredResponse.length > 25) {
		filteredResponse = filteredResponse.slice(0,25);
	}
	filteredResponse.forEach(function(each){ seenTweets[each.id] = true;});
	return filteredResponse;
}

//Adds trump buck to the dom, and handles clicking / displaying the tweet
function createTrumpBuck(id) {
	var buckSource = $("#trump-buck-template").html();
	var buckTemplate = Handlebars.compile(buckSource);
	var buck = buckTemplate({id});
	$("body").append(buck);
	$("#"+id).css("left", Math.round( Math.random()*100-20)+"%");
	$("#"+id).css("top", Math.round( Math.random()*200-250)+"px");
}

