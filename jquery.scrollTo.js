(function ($) {
	var scrollSettings = { duration: 2000, top: 0, left: 0 };
	$.scrollTo = function (options) {
	        /// <summary>Scrolls window to location defined by top and left</summary>
	        /// <param name="options" type="Object"></param>
	        
	        if ($.isPlainObject(options)) {
	            $.extend(scrollSettings, options);
	        } else if ($.isNumeric(options)) {
	            scrollSettings.duration = options;
	        }
	        $('html, body').animate({
	            scrollTop: scrollSettings.top,
	            scrollLeft: scrollSettings.left
	        }, scrollSettings.duration);
	    };
	    
	    var fnScrollSettings = { focus: true };
	    $.fn.scrollTo = function(options){
	        /// <summary>Scrolls window to element and calls focus to element, accepts duration in ms, this is chainable</summary>
	        /// <returns type="Object">jquery object</returns>
	        var self = this,
			    offsets = self.offset();
	        if($.isPlainObject(options)){
	            $.extend(fnScrollSettings, options);
	        }else if($.isNumeric(options)){
	            fnScrollSettings.duration = options;
	        }
	        $.extend(fnScrollSettings, offsets);
	        $.scrollTo(fnScrollSettings);
	        if(fnScrollSettings.focus){
	            self.focus();
	        }
	        return self;
	    };
})(jQuery);
