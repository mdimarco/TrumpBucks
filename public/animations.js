/*global $, TweenLite, Linear */

var remove = function (buck) {
	buck.remove();
};

var dissapear = function (buck) {
	TweenLite.to(buck, 3, {opacity:0, delay:2, onComplete:remove, onCompleteParams:buck });
};

var animateItem = function(itemName, id, rotateDeg, tweet) {
	var buck = $(id);

	//Main animations
	var fall = TweenLite.to(buck, Math.round(Math.random()*10+5), { top:"80%", onComplete: dissapear, onCompleteParams: [buck] });
	var rotate = TweenLite.to(buck, 5, { rotation: "+="+rotateDeg, ease: Linear.easeNone });

	//Reversals animations for hover
	var flatten, scaleUp;

	buck.hover( function() {
		fall.pause();
		rotate.pause();

		flatten = TweenLite.to($(this), 1, { 'z-index':100, force3D:true, rotation: "0", ease: Linear.easeNone, onReverseComplete:function(){fall.play();rotate.play();} });
		scaleUp = TweenLite.to($(this), 1, { 'z-index':100, force3D:true, scale: 1 });

	}, function(){

		flatten.reverse();
		scaleUp.reverse();
		
	});
	addText(id, tweet, itemName)
};

var addText = function (id, tweet, itemName) {
	var text = tweet.text.slice(0,150).replace("/\n/g", " ");
	var name = tweet.user.screen_name;
	var pic = tweet.user.profile_image_url;

	$(id).click( function () {
		var backSource = $("#"+itemName+"-template-back").html();
		var backTemplate = Handlebars.compile(backSource);
		var back = backTemplate({text,name,pic});

		$(id+" .front").css("display","none");
		$(id+" .back").append(back);

		$(id).unbind('click');
		$(id).css('cursor', 'initial');
	});
};


