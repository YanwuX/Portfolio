$(function() {

	/*============================================
	Cover Functions
	==============================================*/

	(function() {

	var designerImg 	= $('#img-header');
	var coderImg 		= $('#img-code-header');;
	var designerDesc	= $('#designer-desc');
	var coderDesc		= $('#coder-desc');			

	var face 			= $('#face');
	var section 		= $('#section');
	var duration 		= 500;

	var mouseX = 0;
	var relMouseX = 520;
	var xp = 520;
	frameRate =  30;
	timeInterval = Math.round( 1000 / frameRate );		

	section.mouseenter(function(e){

		// Get mouse position
		section.mousemove(function(e){

		   	// raw mouse position
		   	mouseX = e.pageX;

		   	// mouse position relative to face div
		   	relMouseX = mouseX - face.offset().left;

		});
		
		// Animate the face based on mouse movement
		loop = setInterval(function(){

			// zeno's paradox dampens the movement
				xp += (relMouseX - xp) / 12;

				designerDesc.css({left: 100 + (520 - xp) * 0.1});
			    coderDesc.css({right: 100 - (520 - xp) * 0.1});

			    // designerBg.css({left: 100 + (520 - xp) * 0.05, opacity: ((1040 - xp)/520)});
			    // coderBg.css({right:  100 + (xp - 520) * 0.05, opacity: (xp/520)});

			    designerDesc.css({opacity: ((1040 - xp)/520)});
			    coderDesc.css({opacity: (xp/520)});
			    designerImg.css({opacity: ((1040 - xp)/520)});
			    coderImg.css({opacity: (xp/520)});
			}, timeInterval );

		}).mouseleave(function(e){ 

			// reset the face to initial state
			clearInterval(loop);
			xp 			= 520;
			mouseX 		= 0;
			relMouseX 	= 520;

			// designerImg.hoverFlow(e.type, duration, 'easeOutQuad');
			// coderImg.hoverFlow(e.type, duration, 'easeOutQuad');
			coderDesc.hoverFlow(e.type, {opacity: 1}, duration, 'easeOutQuad');
			designerDesc.hoverFlow(e.type, {opacity: 1}, duration, 'easeOutQuad');
			// coderBg.hoverFlow(e.type, {right:100, opacity: 1}, duration, 'easeOutQuad');
			// designerBg.hoverFlow(e.type, {left:100, opacity: 1}, duration, 'easeOutQuad');

		}); 
		
	})(); 

	/*============================================
	Skills Functions
	==============================================*/

	$('#skills').waypoint(function(){
		$('.chart').each(function(){
		$(this).easyPieChart({
				size:170,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				barColor: '#6AC4E8',
				lineWidth: 10
			});
		});
	},{offset:'80%'});
	
	/*============================================
	Project thumbs - Masonry
	==============================================*/
	$(window).load(function(){

		$('#projects-container').css({visibility:'visible'});

		$('#projects-container').masonry({
			itemSelector: '.project-item:not(.filtered)',
			columnWidth:350,
			isFitWidth: true,
			isResizable: true,
			isAnimated: !Modernizr.csstransitions,
			gutterWidth: 0
		});

		scrollSpyRefresh();
		waypointsRefresh();
	});

	/*============================================
	Filter Projects
	==============================================*/
	$('#filter-works a').click(function(e){
		e.preventDefault();

		$('#filter-works li').removeClass('active');
		$(this).parent('li').addClass('active');

		var category = $(this).attr('data-filter');

		$('.project-item').each(function(){
			if($(this).is(category)){
				$(this).removeClass('filtered');
			}
			else{
				$(this).addClass('filtered');
			}

			$('#projects-container').masonry('reload');
		});

		scrollSpyRefresh();
		waypointsRefresh();
	});

	
	/*============================================
	Resize Functions
	==============================================*/
	$(window).resize(function(){
		$('.jumbotron').height($(window).height());
		$('.message-box').css({'marginTop':$(window).height()*0.4});
		scrollSpyRefresh();
		waypointsRefresh();
	});
	
	/*============================================
	Refresh scrollSpy function
	==============================================*/
	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	/*============================================
	Refresh waypoints function
	==============================================*/
	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

});	