
var name = "hill-mail";
// var name = "trump-buck";
var pref = "hm";
var seenTweets = {};
var itemCounter = 0;
//After every poll, move the max id back to avoid polling duplicates
var maxId = '';

// This code will be executed when the page finishes loading
window.addEventListener('load', function () {
   pollTweets();
}, false);

function pollTweets () {
	getTweets(addTweetsToDOM);
	setTimeout(pollTweets, 3000);
}

function getMaxId() {
	return maxId ? "max_id=" + maxId : '';
}

//Number of tweets to ask for
function numTweets() {
	return "count=" + Math.round($(window).width() / 80);
}

//Send AJAX request to retrieve twitter rawtext
function getTweets (responseCallback) {
	var query = "/poll_tweets?"+numTweets()+"&"+getMaxId();
	$.get(query, function(rawResponse) {
		responseCallback(rawResponse);
	})
}

//Clean and then add/animate retrieved tweets
function addTweetsToDOM(rawResponse) {
	var cleanedTweets = cleanResponse(rawResponse);
	cleanedTweets.forEach(function (each) {
		itemCounter += 1;
		var id = pref+"-"+itemCounter;
		createItem(id);
		animateItem(name, "#"+id, Math.round( Math.random()*200 - 100), each);
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
function createItem(id) {
	var buckSource = $("#"+name+"-template").html();
	var buckTemplate = Handlebars.compile(buckSource);
	var buck = buckTemplate({id});
	$("body").append(buck);
	$("#"+id).css("left", Math.round( Math.random()*100-20)+"%");
	$("#"+id).css("top", Math.round( Math.random()*200-350)+"px");
}
