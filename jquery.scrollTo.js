(function ($) {
	$.fn.scrollTo = function(options){
	  /// <summary>Scrolls window to element and calls focus to element, accepts speed in ms, this is chainable</summary>
    /// <returns type="Object">jquery object</returns>
		var self = this,
		    offsets = self.offset(),
		    settings = {
		      duration: 2000,
		      focus: true
		    };
		if($.isPlainObject(options)){
		  $.extend(settings, options);
		}else if($.isNumeric(options)){
			settings.duration = options;
		}
		$('html, body').animate({
			scrollTop: offsets.top,
			scrollLeft: offsets.left
		}, settings.duration);
		if(settings.focus){
		  self.focus();
		}
		return self;
	};
})(jQuery);
