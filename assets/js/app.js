/**
 * Created by Alexsander on 08.12.2016.
 */
$(document).ready(function(){
/*
    var timeStop = 0;
    var bgvid = document.getElementById("bgvid");

// FadeIn video on
    bgvid.addEventListener("ended", toggleActive, false);
    function toggleActive(){
        bgvid.className = '';
        //setTimeout(function(){ bgvid.className = ''; }, 1000);
        this.play();
        timeStop = 0;
    };

// FadeOut video just before end (total video length ~11s)
    bgvid.ontimeupdate = function() {myFunction()};
    function myFunction() {
        if(bgvid.currentTime >= 10 && !timeStop) {
            bgvid.className = 'active';
            timeStop = 1;
        }
    }
*/
	var transform_prop = window.Modernizr.prefixed('transform'),
		transition_prop = window.Modernizr.prefixed('transition'),
		transition_end = (function() {
			var props = {
				'WebkitTransition' : 'webkitTransitionEnd',
				'MozTransition'    : 'transitionend',
				'OTransition'      : 'oTransitionEnd otransitionend',
				'msTransition'     : 'MSTransitionEnd',
				'transition'       : 'transitionend'
			};
			return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
		})();


	// index page js
    var block2 = document.getElementById('block-2');
	if( block2 && typeof block2 !== 'undefined') {
		var curBg = 0;
		checkScroll(curBg, block2);
		window.addEventListener("scroll",function(){
			checkScroll(curBg, block2);
		});

		var nextSlide = document.getElementById("next-slide");
		nextSlide.addEventListener("click", function(){
			var b = document.getElementById('block-2'),
				ofset = b.offsetTop;
			$('html, body').animate({
				scrollTop: ofset
			}, 1000);
		}, false);

		

		function checkScroll() {
			var s =document.body.scrollTop; // document scroll position
			var t = block2.offsetTop;
			var h = block2.offsetHeight;

			// if sroll under block2
			if(s >= t && s <= (s+h)) {

				if(curBg != 1 && s < (.8*h/3 + t)) {
					block2.className = "block block-2 row bg-1";
					curBg = 1;
				}
				if(curBg != 2 && s >= (.8*h/3 + t)) {
					block2.className = "block block-2 row bg-2";
					curBg = 2;
				}
				if(curBg != 3 && s >= (.8*2*h/3 + t)) {
					block2.className = "block block-2 row bg-3";
					curBg = 3;
				}
			}

		}
	}

	// Animation on Scroll
		AOS.init({
			duration: 1200
		});

	var trim = function(str)
	{
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
	};

	var hasClass = function(el, cn)
	{
		return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	};

	var addClass = function(el, cn)
	{
		if (!hasClass(el, cn)) {
			el.className = (el.className === '') ? cn : el.className + ' ' + cn;
		}
	};

	var removeClass = function(el, cn)
	{
		el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	};

	// Open navigation sidebar
	var navOpen = document.getElementById('nav-open-btn'),
		navClose = document.getElementById('nav-close-btn'),
		nav = document.getElementById('nav'),
		main = document.getElementById('main');
	navOpen.onclick = function() {
		if(hasClass(nav,'active')) {
			removeClass(nav,'active');
		}
		else {
			addClass(nav,'active');
		}

	};
	navClose.onclick = function(e) {
		e.preventDefault();
		removeClass(nav,'active');
	};
	// Close on navigation on content click
	main.onclick = function() {
		removeClass(nav, 'active');
	};

	// Add animation only after page load
	addClass(nav, 'ready');


	function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 14,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(55.762277, 37.620729), // Moscow

			// Do not change zoom on mouse scroll
			scrollwheel: false,

			// How you would like to style the map.
			// This is where you would paste any style found on Snazzy Maps.
			styles: [
				{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"saturation": 36
						},
						{
							"color": "#333333"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#fefefe"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#fefefe"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f5f5f5"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f5f5f5"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#dedede"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f2f2f2"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e9e9e9"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#fdeb06"
						}
					]
				}
			]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');

		if(mapElement) {

			// When the window has finished loading create our google map below
			google.maps.event.addDomListener(window, 'load', init);

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);
		}
		

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(55.762277, 37.620729),
			map: map,
			title: 'Офис',
			icon: "/assets/images/map_marker-min.png"
		});

		// center map on window resize
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}


	// Scroll top button
	var scrollTopButton = document.getElementById("scrollTop");
	if(scrollTopButton) {
		scrollTopButton.addEventListener("click", function(){

			$('html, body').animate({
				scrollTop: 0
			}, 2000);
		}, false);
	}
	
	// Ajax pop up
	$('.ajax-modal').click(function(e) {
		e.preventDefault();
		var type = $(this).data('type');
		$.post('/ajax/index.php', {action: 'modal', type: type}, function(data){
			$('#pop_up').html(data.modal);
			$('.pop_up_bg, .pop_up-req1').fadeIn();
			$('.blured').addClass('content-blur-active');
			$('input[name=time]').val(data.time);
		},'json');
	});
	$('.click_bt2').click(function() {
		$('.pop_up_bg, .pop_up-req2').fadeIn();
		$('.blured').addClass('content-blur-active');
	});
	// Close pop up
	$('body').on('click', '.close, .pop_up_bg, .close-button', function() {
		$('.pop_up_bg, .pop_up-req').fadeOut();
		$('.blured').removeClass('content-blur-active');
	});

	// Ajax form submit
	$('body').on('submit', '.form-ajax', function(e) {
		e.preventDefault();
		var form = $(this),
			postData = form.serialize(),
			url = form.attr('action');

		$.post(url, postData, function(data) {
			console.log('success');
			$('#pop_up').html(data.modal);
			$('.pop_up_bg, .pop_up-req1').fadeIn();
			$('.blured').addClass('content-blur-active');
			formChecked = 0;
		}, 'json');
	});


});
