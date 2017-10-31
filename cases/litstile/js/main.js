$('.click_bt1').click(function() {
	$('.pop_up_bg, .pop_up-req1').fadeIn();
	$('#wrapper').addClass('content-blur-active');
});
$('.click_bt2').click(function() {
	$('.pop_up_bg, .pop_up-req2').fadeIn();
	$('#wrapper').addClass('content-blur-active');
});
$('.close, .pop_up_bg').click(function() {
	$('.pop_up_bg, .pop_up-req').fadeOut();
	$('#wrapper').removeClass('content-blur-active');
});