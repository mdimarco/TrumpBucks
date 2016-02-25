/*global $, TweenLite, Linear */

	var remove = function (buck) {
		buck.remove();
	};

	var dissapear = function (buck) {
		TweenLite.to(buck, 3, {opacity:0, delay:2, onComplete:remove, onCompleteParams:buck });
	};

	var animateTrumpBuck = function(id, rotateDeg, tweet) {
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
			scaleUp = TweenLite.to($(this), 1, { 'z-inxex':100, force3D:true, scale: 1, onComplete:addText, onCompleteParams: [id, tweet] });

		}, function(){

			flatten.reverse();
			scaleUp.reverse();
			
		});
	};

	var addText = function (id, tweet) {

		var text = tweet.text.slice(0,150).replace("/\n/g", " ");
		var name = tweet.user.screen_name;
		var pic = tweet.user.profile_image_url;

		$(id).on('click', function () {
			$(id+" .trump-sign").css("display","none");
			$(id+" .tweet-container").css("display","none");
			$(id).append('<div class="profile">');
				$(id).append('<img class="tweet-pic" src="'+pic+'">');
				$(id).append('<p class="tweet-name">'+name+'</p>');
			$(id).append('</div>');
			$(id).append('<p class="tweet-text">'+text+'</p>');
			$(id).off('click');
			$(id).css('cursor', 'initial');
	});
	};


	