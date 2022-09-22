/*
	HQ Video BackGround jQuery Plugin
	Version : 1.0.0
	Site	: under construction
	---
	Author	: Art Dark
	License : MIT License / GPL License
*/
var ytplayer;
var ytPlayerReady = false;
var mobileDevice = false;
var smallDevice = false;
if(
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i))
{
	mobileDevice = true;
}
if (
	navigator.userAgent.match(/iPod/i) ||
	navigator.userAgent.match(/iPhone/i))
{
	smallDevice = true;
}

/*YouTube API*/ 
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
	if (!mobileDevice && $('.bg_video_wrapper').hasClass('youtube')) {
		ytPlayerReady = true;
		playerSlide = $('.bg_video_wrapper');
		//Youtube Play
		playerUrl = playerSlide.attr('data-src');
		playerSlide.prepend($('<div id="ytVideoPlayer"></div><div id="bg_video_fadder"></div>'));				
		ytplayer = new YT.Player('ytVideoPlayer', {
		  height: $(window).height(),
		  width: $(window).width(),
		  videoId: playerUrl,
		  playerVars: {
			controls: 0,
			showinfo: 0 ,
			modestbranding: 1,
			wmode: 'opaque'
		},
		  events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		  }				  
		});
	}
}
function onPlayerReady(event) {	
	$('#pauseplay').hide();
	$('#videoplay').show();
	event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
	if(event.data==YT.PlayerState.ENDED) {
		if (playerSlide.hasClass('repeat')) {
			event.target.playVideo();
		}
		if (playerSlide.hasClass('fade')) {
			playerSlide.fadeOut(250);
		}
	}
	if (event.data==YT.PlayerState.PLAYING) {
		$('#videoplay').addClass('pause');
		$('#bg_video_fadder').animate({'opacity' : '0'}, 500);
		
	}
}

function stopVideo() {
	ytplayer.stopVideo();
}
function playVideo() {
	ytplayer.playVideo();
}
/*END : YouTube API*/ 

/*Vimeo API*/
var vmPlayerReady=false;
var vmplayer;
function vimeoApiReady(player_id){
	vmPlayerReady = true;
	var vmplayer = player_id;
	$('#bg_video_fadder').css('opacity', '1');
	$f(vmplayer).addEvent('finish', vimeoVideoEnded);
	$f(vmplayer).addEvent('playProgress', vimeoOnPlay);	
	$('#bg_video_fadder').css('opacity' , '0');
	$f(vmplayer).api('play');
	$('#pauseplay').hide();
	$('#videoplay').show();
	$('#videoplay').bind('click', function() {
		if ($(this).hasClass('pause')) {										   
			$f(player_id).api('pause');
			$(this).removeClass('pause');
		}
		else {
			$f(player_id).api('play');
			$(this).addClass('pause');
		}
	});
}
function vimeoVideoEnded(player_id){
	vmplayer = player_id;
		if ($('.bg_video_wrapper').hasClass('repeat')) {
			$f(player_id).api('play')
		}
		if ($('.bg_video_wrapper').hasClass('fade')) {
			$('.bg_video_wrapper').fadeOut(250);
		}
}
function vimeoOnPlay(player_id) {
	vmplayer = player_id;
	var vimeo_player = $f(player_id);
	$('#videoplay').addClass('pause');
}
/*END Vimeo API*/  

jQuery.fn.hq_videoBackground = function(hq_params) {
	//Set Variables
	var hq_videoEl = $(this),
		hq_videoBase = this;
	//hq_params.type;
	if (hq_params.repeat == 1) {
		repeatClass = "repeat";
	} else if (hq_params.fade == 1  && hq_params.repeat != 1) {
		repeatClass = "fade";
	}
	else {
		repeatClass = "norepeat";
	}

//Append Main HTML;		
	if (!mobileDevice) {
		$('body').append('<a href="javascript:void(0)" class="btn_repeat"></a>');
		if (hq_params.type == 'youtube') {
			//Start YouTube Play
			$('body').prepend($('<div class="'+repeatClass+' bg_video_wrapper '+hq_params.type+'" data-src="'+hq_params.src+'"></div>'));
		}
		else if (hq_params.type == 'vimeo'){			
			playerUrl = hq_params.src;
			$('body').prepend($('<div class="'+repeatClass+' bg_video_wrapper '+hq_params.type+'" data-src="'+hq_params.src+'"></div>'));
			$('.bg_video_wrapper').prepend($('<div id="vmVideo"></div><div id="viemo_overlay">'));
			$('#vmVideo').append($('<iframe width="100%" height="100%" src="http://player.vimeo.com/video/'+playerUrl+'?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=1&loop=0&controls=0&player_id=vimeoplayer" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>').attr('id', 'vimeoplayer'));
			$('#vmVideo iframe').each(function(){
				$f(this).addEvent('ready', vimeoApiReady);
			});		
		}
	} else {
		if (!smallDevice) {
			//Start Mobile Video
			if (hq_params.type == 'youtube') {
				//Start YouTube Play
				playerUrl = hq_params.src;
				append_video = $('<div class="mobile_video_wrapper bg_video_wrapper"><iframe width="'+($(window).width())+'" height="'+$(window).height()+'" src="http://www.youtube.com/embed/'+playerUrl+'?controls=0&showinfo=0&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe></div>');
				setTimeout("$('body').append(append_video)",500);
			}
			else if (hq_params.type == 'vimeo'){			
				playerUrl = hq_params.src;
				append_video = $('<div class="mobile_video_wrapper bg_video_wrapper"><iframe src="http://player.vimeo.com/video/'+playerUrl+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="'+($(window).width())+'" height="'+$(window).height()+'"  frameborder="0" allowfullscreen></iframe></div>');
				setTimeout("$('body').append(append_video)",500);
			}			
		}
		else {
			if (hq_params.type == 'youtube') {
				//Start YouTube Play
				activePlayer = 'youtube';
				playerUrl = hq_params.src;
				playerPreview = hq_params.preview;				
				append_video = $('<div class="smallDevice_video_wrapper" allowfullscreen><iframe width="60" height="50" src="http://www.youtube.com/embed/'+playerUrl+'?controls=0&showinfo=0&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe><a href="javascript:void(0)" class="play_btn"></a></div><img src="'+playerPreview+'" class="video_preview">');
				setTimeout("$('body').append(append_video)",500);
			}
			else if (hq_params.type == 'youtube') {			
				playerUrl = hq_params.src;
				playerSlide.prepend($('<iframe src="http://player.vimeo.com/video/'+playerUrl+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="60" height="50" frameborder="0" allowfullscreen></iframe>'));
			}
			
		}
	}
	
}

$(document).ready(function() {
	$('.mobile_video_wrapper').css('opacity', '0');
	$('.btn_repeat').live('click', function(){
		if ($('.bg_video_wrapper').hasClass('youtube')) {
			playerSlide.fadeIn(500);
			ytplayer.playVideo();
		} else if ($('.bg_video_wrapper').hasClass('vimeo')) {
			$('.bg_video_wrapper').fadeIn(500);
			$f('vimeoplayer').api('play');
		}
	});
	
});
/* Window Load
-----------------*/
$(window).load(function(){
	setTimeout("$('.bg_video_wrapper').animate({'opacity' : '1'},600)", 1000);	
	setTimeout("$('.btn_repeat').animate({'opacity' : '0.3'},600)", 2000);
	setTimeout("$('.preloader').animate({'opacity' : '0'},300)", 800);
});
/* Window Resize
-----------------*/
$(window).resize(function(){
	//
});