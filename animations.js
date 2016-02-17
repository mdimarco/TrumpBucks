
	var dissapear = function (buck) {
		TweenLite.to(buck, 3, {opacity:0, delay:2, onComplete:buck.remove });
	};

	var animateTrumpBuck = function(id, rotate) {
		var buck = $(id);

		//Main animations
		var fall = TweenLite.to(buck, 5, {top:"90%", onComplete: dissapear, onCompleteParams: [buck] });
		var rotate = TweenLite.to(buck, 5, { rotation: "+="+rotate, ease: Linear.easeNone });

		//Reversals animations for hover
		var flatten, scaleUp;
	
		buck.hover( function(el) {
			fall.pause();
			rotate.pause();

			flatten = TweenLite.to($(this), 1, { rotation: "0", ease: Linear.easeNone, onReverseComplete:function(){fall.play();rotate.play();} });
			scaleUp = TweenLite.to($(this), 1, { scale: 15 });

		}, function(el){

			flatten.reverse();
			scaleUp.reverse();
			
		});
	};


	