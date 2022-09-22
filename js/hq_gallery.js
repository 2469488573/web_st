/*
	HQ Gallery - Fullscreen Gallery jQuery Plugin
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
	ytPlayerReady = true;
	if ($('.current-slide').hasClass('first_video') && $('.current-slide').find('div').hasClass('youtube_player')) {
		playerSlide = $('.activeslide').find('div.video_player');
		playerSlide.empty();
		//Youtube Play
		activePlayer = 'youtube';
		playerUrl = playerSlide.attr('data-src');
		playerSlide.prepend($('<div id="ytVideoPlayer"></div><div id="player_wrapper"></div>'));				
		$('#player_wrapper').css('opacity', '1');					
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
		$('#videoplay').removeClass('pause');
	}
	if (event.data==YT.PlayerState.PLAYING) {
		$('#videoplay').addClass('pause');
		$('#player_wrapper').animate({'opacity' : '0'}, 500);
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
	$('#player_wrapper').css('opacity', '1');
	$f(vmplayer).addEvent('finish', vimeoVideoEnded);
	$f(vmplayer).addEvent('playProgress', vimeoOnPlay);
	$('#player_wrapper').animate({'opacity' : '0'}, 500);
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
	$('#videoplay').removeClass('pause');
}
function vimeoOnPlay(player_id) {
	vmplayer = player_id;
	var vimeo_player = $f(player_id);
	$('#videoplay').addClass('pause');
}
/*END Vimeo API*/  

jQuery.fn.hq_gallery = function(hq_options) {
	//Set Variables
	var hq_el = $(this),
		hq_base = this;
		thumb_ul_width = hq_options.slides.length*(hq_options.thumb_width + 2);
		hq_gallery_prev = $('#hq_fullscreen_prev');
		hq_gallery_next = $('#hq_fullscreen_next');
		hq_btn_close = $('#hq_fullscreen_close');
	if (!hq_options.key_navigation) hq_options.key_navigation = 0;
	if (!hq_options.img_protect) hq_options.img_protect = 0;
	if (!hq_options.popup_info) hq_options.popup_info = 0;
	if (!hq_options.socials) hq_options.socials = 0;
	if (!hq_options.click_zoom) hq_options.click_zoom = 0;
	if (!hq_options.touch_support) hq_options.touch_support = 0;
	if (!hq_options.thumb_width) hq_options.thumb_width = 126;
		
	//Append Main HTML;
	hq_el.append('<div id="hq_grid"></div>');
	$('body').append('<div id="hq_fullscreen" class="hided" style="z-index:-100"><ul id="hq_fullscreen_list"></ul><div id="hq_thmb_list"><ul id="hq_thmb_list_scroller" style="width:'+thumb_ul_width+'px"></ul></div><div id="hq_fadder"></div><a href="javascript:void(0)" id="hq_fullscreen_prev"></a><a href="javascript:void(0)" id="hq_fullscreen_next"></a><a href="javascript:void(0)" id="hq_fullscreen_close"><span class="ico">@</span></a></div>');
	
	if (hq_options.popup_info == '1' && !smallDevice) {
		$('#hq_fullscreen').append('<a href="javascript:void(0)" id="hq_fullscreen_info"><span class="ico">i</span></a><div id="hq_popup"><div class="popup_content_block"><div class="window_controls"><a href="javascript:void(0)" class="popup_win_close"></a></div><div class="page_title"><h1 class="popup_title"></h1></div><div id="popup_content_block"><div class="customScrollBox popup_scroll" id="iscroll_wrapper"><div class="container" id="scroller"><div class="content"><h5 class="hq_info_posted">posted in: <span class="popup_info_place"></span></h5><h5 class="hq_info_date">date: <span class="popup_info_place"></span></h5><h5 class="hq_info_client">client: <span class="popup_info_place"></span></h5><h5 class="hq_info_web">Web: <span class="popup_info_place"></span></h5><article class="popup_content_place contentarea"></article></div><!-- .content --></div><div class="dragger_container"><div class="dragger"></div></div></div><a href="#" class="btn_win_up scrollUpBtn scroll_buttons"></a><a href="#" class="btn_win_down scrollDownBtn scroll_buttons"></a></div></div><!-- .popup_content_block --></div>');
	}
	if (hq_options.socials == '1' && !smallDevice) {
		$('#hq_fullscreen').append('<div class="hq_social_block side_block"><div class="block_ico ico_socials"><a href="javascript:void(0)"><span class="ico">2</span></a></div><div class="block_content"><ul class="social_list"><li><a href="#" class="social-facebook"><span class="ico cp_color">f</span></a></li><li><a href="#" class="social-tweeter"><span class="ico cp_color">></span></a></li><li><a href="#" class="social-flickr"><span class="ico cp_color">.</span></a></li><li><a href="#" class="social-vimeo"><span class="ico cp_color">v</span></a></li><li><a href="#" class="social-pinterest"><span class="ico cp_color">b</span></a></li><li><a href="#" class="social-dribbble"><span class="ico cp_coloro">4</span></a></li><li><a href="#" class="social-delicious"><span class="ico cp_color">6</span></a></li></ul></div></div><!-- .social_block -->');
		if (hq_options.popup_info == '0') $('#hq_fullscreen').find('.hq_social_block').css('top', '32px');
	}
	$('#hq_grid').css('position' , 'static');
	if (mobileDevice) {
		$('#hq_fullscreen').append('<a href="javascript:void(0)" id="hq_thmb_list_toggler"></a>');		
	}
	if (smallDevice) {
		$('#hq_grid').addClass('smallDevice');
		$('#hq_fullscreen_list').addClass('smallDevice');
	}
	//Set IMG Grid
	thisSlide = 0;
	while(thisSlide <= hq_options.slides.length-1){
		if (hq_options.slides[thisSlide].type != 'video') {
			$('#hq_grid').append('<div class="gallery_img_preview" data-thmb-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'" title="'+hq_options.slides[thisSlide].title+'" data-category="'+hq_options.slides[thisSlide].category+'"><div class="img_gallery_wrapper"></div><div class="img_gallery_caption"><h5 class="caption">'+hq_options.slides[thisSlide].title+'</h5><h5 class="category">'+hq_options.slides[thisSlide].category+'</h5></div></div>');
			
			$('#hq_fullscreen_list').append('<li data-count="'+thisSlide+'" data-src="'+hq_options.slides[thisSlide].image+'" class="image_type"></li>');
			$('#hq_thmb_list_scroller').append('<li data-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'"><div class="thumb_wrapper"></div></li>');
		}
		else if (!smallDevice) {
			$('#hq_grid').append('<div class="gallery_img_preview" data-thmb-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'" title="'+hq_options.slides[thisSlide].title+'" data-category="'+hq_options.slides[thisSlide].category+'"><div class="img_gallery_wrapper"></div><div class="img_gallery_caption"><h5 class="caption">'+hq_options.slides[thisSlide].title+'</h5><h5 class="category">'+hq_options.slides[thisSlide].category+'</h5></div><span class="post_type post_type_video"></span></div>');
			if (hq_options.slides[thisSlide].subtype == "youtube") player_class = "youtube_player";
			if (hq_options.slides[thisSlide].subtype == "vimeo") player_class = "vimeo_player";
			$('#hq_fullscreen_list').append('<li data-count="'+thisSlide+'" class="video_block"><div class="video_player '+player_class+'" data-src="'+hq_options.slides[thisSlide].src+'" allowfullscreen></div></li>');
			$('#hq_thmb_list_scroller').append('<li data-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'"><div class="thumb_wrapper"></div><span class="post_type post_type_video"></span></li>');
		} else if (smallDevice) {
			$('#hq_grid').append('<div class="gallery_img_preview" data-thmb-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'" title="'+hq_options.slides[thisSlide].title+'" data-category="'+hq_options.slides[thisSlide].category+'"><div class="img_gallery_wrapper"></div><div class="img_gallery_caption"><h5 class="caption">'+hq_options.slides[thisSlide].title+'</h5><h5 class="category">'+hq_options.slides[thisSlide].category+'</h5></div><span class="post_type post_type_video"></span></div>');
			if (hq_options.slides[thisSlide].subtype == "youtube") player_class = "youtube_player";
			if (hq_options.slides[thisSlide].subtype == "vimeo") player_class = "vimeo_player";
			$('#hq_fullscreen_list').append('<li data-count="'+thisSlide+'" class="video_block"><div class="video_player '+player_class+'" data-src="'+hq_options.slides[thisSlide].src+'" allowfullscreen></div><img src="'+hq_options.slides[thisSlide].thumb+'" class="video_preview"><a href="javascript:void(0)" class="play_btn"></a></li>');
			$('#hq_thmb_list_scroller').append('<li data-count="'+thisSlide+'"><img src="'+hq_options.slides[thisSlide].thumb+'"><div class="thumb_wrapper"></div><span class="post_type post_type_video"></span></li>');			
		}

		thisSlide++;
	}	
	$('#hq_grid').append('<div class="clear"></div>');
	$('#hq_fullscreen_list').find('li:first').addClass('current-slide');
	
	//KeyNavigation
	if(hq_options.key_navigation == '1') {
		$(document.documentElement).keyup(function (event) {
			if (!$('#hq_popup').hasClass('showed')) {
				if ((event.keyCode == 37) || (event.keyCode == 40)) {
					hq_base.prevSlide();		
				// Right Arrow or Up Arrow
				} else if ((event.keyCode == 39) || (event.keyCode == 38)) {
					hq_base.nextSlide();		
				}	
			}
		});	
	}
	
	//Navigation
	hq_gallery_prev.live('click', function(){
		hq_base.prevSlide();
	});
	hq_gallery_next.live('click', function(){
		hq_base.nextSlide();
	});
	
	//Img Zoom Click
	if(hq_options.click_zoom == '1' && !mobileDevice) {
		$('#hq_fullscreen_list li').live('click', function(e){
			if (!$(this).hasClass('video_block')) {
				zoomed_img = $(this).find('img');				
				$(this).toggleClass('zoomed');
				zoomed_img = $(this).find('img');				
				if ($(this).hasClass('zoomed')) {					
					unzoom_width = zoomed_img.width();
					unzoom_height = zoomed_img.height();
					unzoom_left = zoomed_img.css('left');
					unzoom_top = zoomed_img.css('top');
					if (zoomed_img.attr('data-width') > zoomed_img.width() || zoomed_img.attr('data-height') > zoomed_img.height()) {
						move_factor_x = (zoomed_img.attr('data-width')-$(window).width())/$(window).width();
						move_factor_y = (zoomed_img.attr('data-height')-$(window).height())/$(window).height();
						set_move_top = e.pageY*move_factor_y;
						set_move_left = e.pageX*move_factor_x;
						
						zoomed_img.animate({'width' : zoomed_img.attr('data-width')+'px', 'height' : zoomed_img.attr('data-height')+'px', 'top' : -set_move_top+'px', 'left' : -set_move_left+'px'},500);			} else {
						$(this).removeClass('zoomed');
					}
				} else {
					zoomed_img.stop().animate({'width' : unzoom_width+'px', 'height' : unzoom_height+'px', 'left' : unzoom_left, 'top' : unzoom_top},500, function(){
						hq_base.resizeSlide();
					});
				}
			}
		});
		$('.zoomed').live('mousemove', function(e) {												
			move_img = $(this).find('img');
			if (!move_img.is(':animated')) {
				move_factor_x = (move_img.width()-$(window).width())/$(window).width();
				move_factor_y = (move_img.height()-$(window).height())/$(window).height();
				set_move_top = e.pageY*move_factor_y;
				set_move_left = e.pageX*move_factor_x;
				move_img.css({'top' : -set_move_top+'px', 'left' : -set_move_left+'px'});
			}
		});
	}
	
	//Close FS mode
	hq_btn_close.live('click', function(){
		if ($('.current-slide').has('div.video_player')) $('.current-slide').find('div.video_player').empty();													 
		$('.current-slide').removeClass('current-slide');
		$('.zoomed').removeClass('zoomed');
		$('#hq_fullscreen').addClass('hided');
		$('#hq_grid').removeClass('hided');
		setTimeout("$('#hq_fullscreen').css('z-index','-100')",600);
	});
	
	//Show FS mode
	$('.gallery_img_preview').live('click', function(){
		hq_base.setImage(parseInt($(this).attr('data-thmb-count')));
	});
	$('#hq_thmb_list_scroller li').live('click', function(){
		hq_base.setImage(parseInt($(this).attr('data-count')));
	});
	
	hq_base.nextSlide = function() {
		$('.zoomed').removeClass('zoomed');
		next_slide = parseInt($('.current-slide').attr('data-count')) + 1;
		if (next_slide > hq_options.slides.length-1) {
			next_slide = 0;			
		}
		hq_base.setImage(next_slide);
	}
	
	hq_base.prevSlide = function() {
		$('.zoomed').removeClass('zoomed');
		prev_slide = parseInt($('.current-slide').attr('data-count')) - 1;
		if (prev_slide < 0) {
			prev_slide = hq_options.slides.length-1;
		}
		hq_base.setImage(prev_slide);
	}
	
	//ResizeImg
	hq_base.resizeSlide = function() {
		img4resize = $('.current-slide').find('img');		
		hq_full = $('#hq_fullscreen');
		var window_w = hq_full.width(),
			window_h = hq_full.height(),
			win_ratio = window_h/window_w,
			ratio = img4resize.attr('data-ratio'),
			offset;
		if (ratio < 1) {
			if (win_ratio < 1) {
				img4resize.css({'width' : '100%', 'height' : 'auto'}).css({'top' : ($(window).height()-img4resize.height())/2+'px', 'left' : '0'});
				if (img4resize.height() < window_h) {
					img4resize.css({'width' : 'auto', 'height' : '100%'}).css({'left' : ($(window).width()-img4resize.width())/2+'px', 'top' : '0'});
				}
			} else {
				img4resize.css({'width' : 'auto', 'height' : '100%'}).css({'left' : ($(window).width()-img4resize.width())/2+'px', 'top' : '0'});
			}			
		} else {
			img4resize.css({'width' : 'auto', 'height' : '100%'}).css({'left' : ($(window).width()-img4resize.width())/2+'px', 'top' : '0'});
		}
		setTimeout("$('.loading').removeClass('loading')",500);
	}
	
	$(window).resize(function(){
		hq_base.resizeSlide();
	});	

	//SetImg
	hq_base.setImage = function(set_img){
		//<img src="'+hq_options.slides[thisSlide].image+'" class="hq_img'+thisSlide+' hq_img_slide">
		if ($('.current-slide').has('div.video_player')) $('.current-slide').find('div.video_player').empty();
		$('.image_type').empty();
		$('.current-thumb').removeClass('current-thumb');
		$('.current-slide').removeClass('current-slide');
		$('#hq_fullscreen').css('z-index','100');
		set_slide = $('#hq_fullscreen_list').find('li[data-count="'+set_img+'"]');
		set_thmb = $('#hq_thmb_list_scroller').find('li[data-count="'+set_img+'"]');
		set_thmb.addClass('current-thumb');
		set_slide.addClass('current-slide');		
		$('#hq_fullscreen').removeClass('hided');
		$('#hq_grid').addClass('hided');
		if (set_slide.hasClass('video_block')) hq_base.videoPlayer();
		if (hq_options.popup_info == '1') hq_base.popup_update();
		if ($('.current-slide').hasClass('image_type')) {
			place_img = $('<img src="'+$(".current-slide").attr("data-src")+'" class="hq_img'+$(".current-slide").attr("data-count")+' hq_img_slide loading">');
			$('.current-slide').append(place_img);
			place_img.load(function(){				
				$(this).attr('data-width', $(this).width()).attr('data-height', $(this).height()).attr('data-ratio',($(this).height()/$(this).width()).toFixed(2));								
				hq_base.resizeSlide();				
			});
			
		}
		
	}
	
	//PopUpInfo
	hq_base.popup_update = function() {
		current_slide = $('.current-slide').attr('data-count');
		$('.popup_title').text(hq_options.slides[current_slide].title);
		$('.hq_info_posted').find('.popup_info_place').text(hq_options.slides[current_slide].category);
		$('.hq_info_date').find('.popup_info_place').text(hq_options.slides[current_slide].date);
		$('.hq_info_client').find('.popup_info_place').text(hq_options.slides[current_slide].client);
		$('.hq_info_web').find('.popup_info_place').text(hq_options.slides[current_slide].url);
		$('.popup_content_place').html(hq_options.slides[current_slide].description);
		if (mobileDevice) {		
			$('.popup_scroll').FingerScroll();
		}
	}
	
	// Video Player Function
	hq_base.videoPlayer = function() {
		if (!mobileDevice) {
			playerSlide = $('.current-slide').find('div.video_player');
			if (playerSlide.hasClass('youtube_player')) {
				//Start YouTube Play
				activePlayer = 'youtube';
				playerUrl = playerSlide.attr('data-src');
				playerSlide.prepend($('<div id="ytVideoPlayer"></div><div id="player_wrapper"></div><a href="javascript:void(0)" id="videoplay"></a>'));
				$('#player_wrapper').css('opacity', '1');					
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
			else {			
				playerSlide.empty();		
				playerUrl = playerSlide.attr('data-src');
				activePlayer = 'vimeo';
				
				playerSlide.prepend($('<div id="vmVideo"></div><div id="player_wrapper"></div><a href="javascript:void(0)" id="videoplay"></a>'));
				$('#vmVideo').append($('<iframe width="100%" height="100%" src="http://player.vimeo.com/video/'+playerUrl+'?api=1&amp;title=0&amp;byline=0&amp;portrait=0&autoplay=1&loop=0&controls=0&player_id=vimeoplayer" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>').attr('id', 'vimeoplayer'));
				$('#vmVideo iframe').each(function(){
					$f(this).addEvent('ready', vimeoApiReady);
				});
			}
		}
		else {
			//start mobile video
			playerSlide = $('.current-slide').find('div.video_player');
			if (!smallDevice) {
				if (playerSlide.hasClass('youtube_player')) {
					//Start YouTube Play
					activePlayer = 'youtube';
					playerUrl = playerSlide.attr('data-src');
					playerSlide.prepend($('<div class="mobile_video_wrapper"><iframe width="'+($(window).width()-60)+'" height="'+$(window).height()+'" src="http://www.youtube.com/embed/'+playerUrl+'?controls=0&showinfo=0&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe></div>'));
				}
				else {			
					playerSlide.empty();		
					playerUrl = playerSlide.attr('data-src');
					playerSlide.prepend($('<div class="mobile_video_wrapper"><iframe src="http://player.vimeo.com/video/'+playerUrl+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="'+($(window).width()-60)+'" height="'+$(window).height()+'"  frameborder="0" allowfullscreen></iframe></div>'));
				}		
			} else {
				if (playerSlide.hasClass('youtube_player')) {
					//Start YouTube Play
					activePlayer = 'youtube';
					playerUrl = playerSlide.attr('data-src');
					playerSlide.prepend($('<iframe width="60" height="50" src="http://www.youtube.com/embed/'+playerUrl+'?controls=0&showinfo=0&modestbranding=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>'));
				}
				else {			
					playerSlide.empty();		
					playerUrl = playerSlide.attr('data-src');
					playerSlide.prepend($('<iframe src="http://player.vimeo.com/video/'+playerUrl+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="60" height="50" frameborder="0" allowfullscreen></iframe>'));
				}
			}
		}
	}//EOF
	
}

$(document).ready(function() {
	$('#hq_thmb_list').width($(window).width())
		.mouseenter(function(){
			var h = $(this).width(),
				tlist = $('#hq_thmb_list_scroller');
				window._s_top = parseInt(tlist.css('left'));
				window._sh = setInterval(function(){
				if (
					(window._s_top >= 0 && window._sp > 0) || 
					(window._s_top < 0 && window._s_top > -(tlist.width() - h)) || 
					(window._sp < 0 && window._s_top <= -(tlist.width() - h))
				) {
					var sign = (window._sp >= 0),
						val = Math.pow(window._sp * 15, 2),
						val = (sign)?val:-val;
					window._s_top -= val;
					if (window._s_top > 0){
						window._s_top = 0;
					}
					if (window._s_top < -(tlist.width() - h)){
						window._s_top = -(tlist.width() - h);
					}
					tlist.stop().animate({
						left: window._s_top
					}, 500);
				}
			}, 100);
		}).mouseleave(function(){
			clearInterval(window._sh);
		}).mousemove(function(e){
			var y = e.pageX,
				h = $(this).width(),
				p = y / h;

			if (y > $(window).width()*0.8) {
				window._sp = Math.round((p - 0.5) * 50) / 50;						
			}
			else if (y < $(window).width()*0.2) {
				window._sp = Math.round((p - 0.5) * 50) / 50;
			}
			else {window._sp =0}			
	});
		
	$('#hq_fullscreen').find('.block_ico').live('click', function(){
		$(this).parent('.hq_social_block').toggleClass('social_toggled');		
	});	
	
	$('#hq_fullscreen_info').live('click', function(){
		$('#hq_popup').fadeIn(400);
		$('#hq_popup').addClass('showed');
		$('#hq_fadder').css('z-index', '250').stop().animate({'opacity' : '0.6'});
	});
	$('.popup_win_close').live('click', function(){
		$('#hq_popup').fadeOut(300);
		$('#hq_popup').removeClass('showed');
		$('#hq_fadder').stop().animate({'opacity' : '0'},function(){
			$('#hq_fadder').css('z-index', '-100');
		});
	});
	$('#hq_fadder').live('click', function(){
		$('#hq_popup').fadeOut(300);
		$('#hq_popup').removeClass('showed');
		$('#hq_fadder').stop().animate({'opacity' : '0'},function(){
			$('#hq_fadder').css('z-index', '-100');
		});
	});
});
$(document).ready(function(){
	$('#videoplay').live('click', function(){
		if ($(this).hasClass('pause')) {			
			if ($('.current-slide').find('div.video_player').hasClass('youtube_player')) {
				$(this).removeClass('pause');
				stopVideo();			
			}
		}
		else {			
			if ($('.current-slide').find('div.video_player').hasClass('youtube_player')) {
				$(this).addClass('pause');
				playVideo();	
			}
			
		}
	});	
});
/* Window Load
-----------------*/
$(window).load(function(){
	$('#hq_popup').css('top',($(window).height()-530)/2+'px');
	if (mobileDevice) {		
		$('.dragger_container').hide();		
	}
	$('#hq_fullscreen_list').GalleryFingers();
});
/* Window Resize
-----------------*/
$(window).resize(function(){
	$('#hq_thmb_list').width($(window).width());
	$('#hq_popup').css('top',($(window).height()-530)/2+'px');
	
});

jQuery.fn.GalleryFingers = function() {
    var scrollStartPos = 0;
    $(this).bind('touchstart', function(event) {
        var e = event.originalEvent;
        start_touch_pos = parseInt(e.touches[0].pageX);
    });
    $(this).bind('touchmove', function(event) {									   
        var e = event.originalEvent;
		check_next = start_touch_pos-250;
		check_prev = start_touch_pos+250;
		if (parseInt(e.touches[0].pageX) < check_next) {
			$('#hq_fullscreen_next').click();
		}
		else if (parseInt(e.touches[0].pageX) > check_prev) {
			$('#hq_fullscreen_prev').click();
		}
		e.preventDefault();
    });
    return this;
};