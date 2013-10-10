(function ($) {
	$.scrollTo = function (options) {
	        /// <summary>Scrolls window to location defined by top and left</summary>
	        /// <param name="options" type="Object"></param>
	        var settings = { duration: 2000, top: 0, left: 0 };
	        if ($.isPlainObject(options)) {
	            $.extend(settings, options);
	        } else if ($.isNumeric(options)) {
	            settings.duration = options;
	        }
	        $('html, body').animate({
	            scrollTop: settings.top,
	            scrollLeft: settings.left
	        }, settings.duration);
	    };
	    $.fn.scrollTo = function(options){
	        /// <summary>Scrolls window to element and calls focus to element, accepts duration in ms, this is chainable</summary>
	        /// <returns type="Object">jquery object</returns>
	        var self = this,
			    offsets = self.offset(),
			    settings = {
			        focus: true
			    };
	        if($.isPlainObject(options)){
	            $.extend(settings, options);
	        }else if($.isNumeric(options)){
	            settings.duration = options;
	        }
	        $.extend(settings, offsets);
	        $.scrollTo(settings);
	        if(settings.focus){
	            self.focus();
	        }
	        return self;
	    };
})(jQuery);
