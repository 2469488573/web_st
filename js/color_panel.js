
$(window).load(function() {
	if($.cookie("hq_colors")) {
		default_color = $.cookie("hq_colors");
		color_vars = {'@base' : '#'+$.cookie("hq_colors")}
	}
	else {
		default_color = '1fafbc';
		color_vars = {'@base' : '#1fafbc'}
	}	
	less.modifyVars(color_vars);
	$('.color_picker').ColorPicker({flat: true}).ColorPickerSetColor(default_color);;
	$('.color_picker').mouseup(function(){
		set_color($('.colorpicker_hex').find('input').val());
	});						
	function set_color(color_val) {
		$.cookie("hq_colors", color_val);
		color_vars['@base'] = '#'+color_val;
		less.modifyVars(color_vars);
	}
});
