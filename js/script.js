var ie = false;
var mobileDevice = false;
if(
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i))
{
	mobileDevice = true;
}
if ($.browser.msie && $.browser.version < 9) { 
    ie = true;	
}
var deviceAgent = navigator.userAgent.toLowerCase();
var int = setInterval(scrollUpdate, 500);
$(document).ready(function() {
	if (mobileDevice) {		
		$('.color_picker_block').hide();
		$('.ctrl_panel').css('top', '-164px');
		$('.btn_thmb_toggle').css('display', 'block');

		$('.btn_thmb_toggle').click(function(){
			$(this).toggleClass('toggled');
			if ($(this).hasClass('toggled')) {
				$('#thumb-tray').stop().animate({'height' : '126px'},300);
				$('#thumbs-scroller').stop().animate({'bottom' : '0px', 'opacity' : '1'}, 500);
				$('#progress-back').stop().animate({'bottom' : '126px', 'opacity' : '1'}, 500);				
			}
			else {
				$('#thumb-tray').stop().animate({'height' : '10px'},300);
				$('#thumbs-scroller').stop().animate({'bottom' : '-116px', 'opacity' : '0.4'}, 500);
				$('#progress-back').stop().animate({'bottom' : '10px', 'opacity' : '0.4'}, 500);		
			}
		});
	}
	else {
		$('#thumb-tray').hover(function(){
			$(this).stop().animate({'height' : '126px'},300);
			$('#thumbs-scroller').stop().animate({'bottom' : '0px', 'opacity' : '1'}, 500);
			$('#progress-back').stop().animate({'bottom' : '126px', 'opacity' : '1'}, 500);
		},
		function(){
			$(this).stop().animate({'height' : '10px'},300);
			if (!ie) {
				$('#thumbs-scroller').stop().animate({'bottom' : '-116px', 'opacity' : '0.4'}, 500);
				$('#progress-back').stop().animate({'bottom' : '10px', 'opacity' : '0.4'}, 500);		
			}
			else {
				$('#thumbs-scroller').stop().animate({'bottom' : '-116px'}, 500);
				$('#progress-back').stop().animate({'bottom' : '10px'}, 500);			
			}
		});		
	}

	if (mobileDevice) {
		$('#hq_thmb_list_toggler').live('click',function(){
			$(this).toggleClass('toggled');
			if ($(this).hasClass('toggled')) {
				$('#hq_thmb_list').stop().animate({'bottom' : '0px', 'opacity' : '1'}, 500);
			}
			else {
				$('#hq_thmb_list').stop().animate({'bottom' : '-116px', 'opacity' : '0.4'}, 500);
			}
		});
	}
	else {
		$('#hq_thmb_list').hover(function(){
			$(this).stop().animate({'bottom' : '0px', 'opacity' : '1'}, 500);
		},
		function(){
			$(this).stop().animate({'bottom' : '-116px', 'opacity' : '0.4'}, 500);
		});		
	}

	$('.prettyPhoto').prettyPhoto();
	
	//header toggler
	$('.btn_toggle').removeClass('pressed');
	$('header').addClass('hided');
	if (mobileDevice) {
		$('.btn_toggle').click(function(){
			$(this).toggleClass('pressed');
			if ($(this).hasClass('pressed')) {
				$('header').stop().animate({'left' : '0px'}, 300, function(){
					$.cookie("menu_status", 'showed');				
				});			
			}
			else {
				$('header').stop().animate({'left' : '-210px'}, 300, function(){
					$.cookie("menu_status", 'hided');			
				});
				
			}
		});		
	}

	//Menu SetUp and animation
	$('.menu').find('li:has(ul)').addClass('has-menu');
	$('.menu').children('li.has-menu').addClass('level1');
	$('.menu').find('li.level1').find('ul.sub-menu').children('li.has-menu').addClass('level2');
	
	$('.menu').find('li.has-menu').children('a').addClass('menu-toggler');
	$('.menu-toggler').click(function(){
		if($(this).parent('li').find('ul.sub-menu').css('display') != 'block') {
			if($(this).parent('li').hasClass('level1')) {
				$('.sub-menu').slideUp(500);
				$('.sub-menu').parent('li').removeClass('opened');
				$(this).parent('li').children('.sub-menu').slideDown(500);
				$(this).parent('li').addClass('opened');
			}
			else {
				$('.level2').find('.sub-menu').slideUp(500);
				$('.sub-menu').parent('li').removeClass('opened');
				$(this).parent('li').children('.sub-menu').slideDown(500);
				$(this).parent('li').addClass('opened');
			}
		}			
	});
	//MobileMenu
	if (mobileDevice && $('.menu').html()) {
		$('body').append('<nav class="mobile_header"><div class="toggler_wrapper"><a href="index.html" class="logo"><img src="img/logo.png" alt=""></a><ul class="mobile_menu"></ul></div><a href="javascript:void(0)" class="btn_toggle"></a></nav>');
		$('ul.mobile_menu').append($('.menu').html());
		$('.mobile_header').find('.btn_toggle').live('click', function(){
			$('.toggler_wrapper').slideToggle(500);
			$(this).toggleClass('pressed');
		});
		$('ul.mobile_menu').find('li.has-menu').find('a').live('click', function(){
			$(this).parent('li.has-menu').children('.sub-menu').slideToggle(500);
		});
	}    	
	
	//SidePanel Toggler
	$('.ctrl_panel .block_ico').click(function(){
		side_block = $(this).parent('div.side_block');
		if (parseInt(side_block.css('left')) < 0) {
			side_block.stop().animate({'left' : '0px'},300);
		}
		else {
			$('div.side_block').stop().animate({'left' : '0px'},300, function(){		
				side_block.stop().animate({'left' : '-224px'},500);
			});			
		}
	});
	
	//Input and Textarea Click-Clear
	$('input[type=text]').focus(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val() === $(this).attr('title')) {
				$(this).val('');
		}   
		}).blur(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val().length === 0) {
			$(this).val($(this).attr('title'));
		}                        
	});	
	$('textarea').focus(function() {
		if ($(this).text() === $(this).attr('title')) {
				$(this).text('');
			}        
		}).blur(function() {
		if ($(this).text().length === 0) {
			$(this).text($(this).attr('title'));
		}                        
	});
	$('.content').find('.form_field').each(function(){
		$(this).width($(this).parent('form').width()-11);				
	});
	
	//FeedBack Form
	$('.feedback_go').click(function(){
		var par = $(this).parents(".feedback_form");
		var name = par.find(".field-name").val();
		var email = par.find(".field-email").val();
		var message = par.find(".field-message").val();
		var subject = par.find(".field-subject").val();
		if (email.indexOf('@') < 0) {			
			email = "mail_error";
		}
		if (email.indexOf('.') < 0) {			
			email = "mail_error";
		}
		$.ajax({
			url: "mail.php",
			type: "POST",
			data: { name: name, email: email, message: message, subject: subject },
			success: function(data) {
				$('.ajaxanswer').hide().empty().html(data).show("slow");
		  }
		});
	});
	//Scroller
	$('.btn_win_up').mousedown(function(){
		$('.content_area').find('.scrollUpBtn').mousedown();
	});
	$('.btn_win_down').mousedown(function(){
		$('.content_area').find('.scrollDownBtn').mousedown();
	});
	
	//Wrapped Img Shortcode
	$('img.wrapped_zoomer').each(function(){
		set_caption = $(this).attr('title');
		set_href = $(this).attr('data-href');
		if ($(this).hasClass('alignright')) set_align = "alignright";
		if ($(this).hasClass('alignleft')) set_align = "alignleft";
		$(this).wrap('<div class="zoomer_wrapper '+set_align+'"></div>');
		$(this).after('<div class="fader"><span class="fader_caption">'+set_caption+'</span><a href="'+set_href+'" class="wrapped_prettyPhoto"><span class="ico">l</span></a></div>');
		$('.wrapped_prettyPhoto').prettyPhoto();
	});
	
	//MapToggler
	$('.map_toggler_block').find('a').click(function(){
		$(this).toggleClass('toggled');
		if ($(this).hasClass('toggled')) {
			$(this).text('Show map');
		}
		else {
			$(this).text('Hide map');
		}
		$('.map_container').slideToggle();
	});
	
	//Portfolio
	$('.portfolio_content').each(function(){
		$(this).css('margin-top', -($(this).height()/2)+'px');	
	});
	var $container = $('.portfolio_block');
	$('.btn_load_more').click(function() {
		var count = $(this).attr('data-count');
		var $newEls = $(fakeElement.getGroup(count));
		$container.isotope('insert', $newEls, function() {
			$container.isotope('reLayout');
			$('.portfolio_content').each(function(){
				$(this).css('margin-top', -($(this).height()/2)+'px');	
			});			
		});
		return false;
	});	
});	

$(window).load(function(){
	content_setup();	
	//temp form HTML
	$('.accordion').accordion({
		autoHeight: false,
		active: 0,
		collapsible: true
	});
	$('.shortcode_toggles_item_title').click(function(){
		$(this).next().slideToggle();
		$(this).toggleClass('ui-state-active');
	});
	$('.commentlist').find('.stand_comment').each(function(){
		set_width = $(this).width() - $(this).find('.commentava').width() - 25;
		$(this).find('.thiscommentbody').width(set_width);
	});	
	//$('.shortcode_accordion_shortcode .shortcode_accordion_item_title').first().css('border-top', '0px');	
	//End Of Temp
	
	/*Gallery Caption Update*/
	$('.gallery_img_preview').find('img').each(function(){
		gallery_item_parent = $(this).parent('.gallery_img_preview');
		gallery_item_caption = gallery_item_parent.find('.img_gallery_caption');
		gallery_item_caption.css('margin-top',-(gallery_item_caption.height()/2)+'px');
	});
	
	//Run SuperSized finger control
	if (mobileDevice) {				
		set_filter_width = 0;
		$('.optionset').find('li').each(function(){
			set_filter_width = set_filter_width+$(this).width()+2;
		});
		$('.navigation_scroll').MenuScroll();
		setTimeout("$('.optionset').width(set_filter_width)", 600);
		setTimeout("$('#options').width(set_filter_width)", 600);
		setTimeout("$('#options').TabScroll()", 700);
		setTimeout("$('.optionset').animate({'opacity' : '1'},300)",800);
	}	
	setTimeout("$('.preloader').animate({'opacity' : '0'},600)", 1000);
	setTimeout("$('.content_block').animate({'opacity' : '1'},600)", 1000);
	setTimeout("$('.gallery_block').animate({'opacity' : '1'},600)", 1000);
	setTimeout("$('.ctrl_panel').animate({'opacity' : '1'},600)", 1000);
	setTimeout("$('header').animate({'opacity' : '1'},600)", 1000);
	
	
	//IE BugFix
	if (ie) {
		$('#thumbs-scroller').css('opacity', '1');
		$('#progress-back').css('opacity', '1');
	}	
	else {
		$('#thumbs-scroller').css('opacity', '0.4');
		$('#progress-back').css('opacity', '0.4');		
	}
	
	if (mobileDevice) {		
		$('#iscroll_wrapper').FingerScroll();		
	}	
	if ($('.columns1').html()) {
		$('.portfolio_block').isotope('reLayout');
	}
});
$(window).resize(function(){
	content_setup();
});

function content_setup() {
	$('.content_block').height($(window).height()-85);
	$('#content_block').height($(window).height()-135);
	$('#gallery_block').height($(window).height());
	$('gallery_block').height($(window).height());
	$('#navigation_block').height($(window).height()-380);
	$('.navigation_scroll').height($(window).height()-380);
}

function scrollUpdate() {	
	if ($('#content_block').html()) {
		if (!mobileDevice) $("#content_block").mCustomScrollbar("vertical",400,"easeOutCirc",1.05,"auto","yes","yes",10); 	
	}
	if ($('#gallery_block').html()) {
		if (!mobileDevice) $("#gallery_block").mCustomScrollbar("vertical",400,"easeOutCirc",1,"auto","yes","yes",10); 
		$('#gallery_block').find('.container').width($(window).width()-35);
		if(mobileDevice) {
			if ($(window).width() > 500) {
				$('#gallery_block').find('.container').width($(window).width()-26);
			}
			else {
				$('#gallery_block').find('.container').width($(window).width()).height($(window).height()-26);
			}
		}
	}
	if ($('#navigation_block').html()) {
		if (!mobileDevice) $("#navigation_block").mCustomScrollbar("vertical",400,"easeOutCirc",1,"auto","yes","yes",10);
	}
	if ($('#popup_content_block').html()) {
		if (!mobileDevice) $("#popup_content_block").mCustomScrollbar("vertical",400,"easeOutCirc",1,"auto","yes","yes",10); 
	}
};

jQuery.fn.FingerScroll = function() {
    var scrollStartPos = 0;
    $(this).bind('touchstart', function(event) {
        var e = event.originalEvent;
        scrollStartPos = $(this).scrollTop() + e.touches[0].pageY;
    });
    $(this).bind('touchmove', function(event) {									   
        var e = event.originalEvent;		
        $(this).scrollTop(scrollStartPos - e.touches[0].pageY);
        e.preventDefault();
    });
    return this;
};

jQuery.fn.MenuScroll = function() {
    var scrollStartPos = 0;
    $(this).bind('touchstart', function(event) {
        var e = event.originalEvent;
        scrollStartPos = $(this).scrollTop() + e.touches[0].pageY;
    });
    $(this).bind('touchmove', function(event) {									   
        var e = event.originalEvent;		
        $(this).scrollTop(scrollStartPos - e.touches[0].pageY);
        e.preventDefault();
    });
    return this;
};

jQuery.fn.TabScroll = function() {
	var scrollStartPos = 0;
	max_scroll = -1*($(this).width()-$('.filter_navigation').width());
	$(this).css('right', max_scroll+'px');
    $(this).bind('touchstart', function(event) {										
        var e = event.originalEvent;
        scrollStartPos = parseInt($(this).css('right')) + e.touches[0].pageX;
    });
    $(this).bind('touchmove', function(event) {										   	
        var e = event.originalEvent;			
        $(this).css('right', (scrollStartPos - e.touches[0].pageX)+'px');
		if (parseInt($(this).css('right')) > 0) {
			$(this).css('right', '0px');
		}
		if (parseInt($(this).css('right')) < max_scroll) {
			$(this).css('right', max_scroll+'px');
		}
        e.preventDefault();
    });
    return this;	
};