
	var dissapear = function (buck) {
		TweenLite.to(buck, 3, {opacity:0, delay:2, onComplete:buck.remove });
	};

	var animateTrumpBuck = function(id, rotate, text) {
		var buck = $(id);

		//Main animations
		var fall = TweenLite.to(buck, Math.round(Math.random()*10+5), {z:.001, force3D:true, top:"80%", onComplete: dissapear, onCompleteParams: [buck] });
		var rotate = TweenLite.to(buck, 5, { z:.001, force3D:true, rotation: "+="+rotate, ease: Linear.easeNone });

		//Reversals animations for hover
		var flatten, scaleUp;
	
		buck.hover( function(el) {
			fall.pause();
			rotate.pause();

			flatten = TweenLite.to($(this), 1, { z:.001, force3D:true, rotation: "0", ease: Linear.easeNone, onReverseComplete:function(){fall.play();rotate.play();} });
			scaleUp = TweenLite.to($(this), 1, { z:.001, force3D:true, scale: 1, onComplete:addText, onCompleteParams: [id, text] });

		}, function(el){

			flatten.reverse();
			scaleUp.reverse();
			
		});
	};

	var addText = function (id, text) {
		$(id).on('click', function (el) {
			$(id+" .trump-sign").css("display","none");
			$(id+" .tweet-container").css("display","none");
			$(id).append('<p class="tweet-text">'+text+'</p>');
			$(id).off('click');
			$(id).css('cursor', 'initial');
	});
	}


	