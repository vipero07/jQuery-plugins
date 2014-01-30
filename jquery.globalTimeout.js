(function ($){
	if(!$.globalTimeout){
		var defaults = { rate: 200, max: false, name: "timeout" },
		timeoutVar, $window = $(window), total, clear = false;
		
		$.globalTimeout = function(options){
			if($.isNumeric(options)){
				defaults.rate = options;
			}else if($.isPlainObject(options)){
				$.extend(defaults, options);
			}else if(options == "clear"){
				clear = true;
			}
			
			total = 0;
			if(clear){
				clearTimeout(timeoutVar);
				clear = false;
			}else{
				clearTimeout(timeoutVar);
				var timeoutFunction;
				
				if(defaults.max){
					timeoutFunction = function(){
						$window.trigger(defaults.name);
						total++;
						if(total < defaults.max){
							timeoutVar = setTimeout(timeoutFunction, defaults.rate);
						}else{
							total = 0;
						}
					};
				}else{
					timeoutFunction = function(){
						$window.trigger(defaults.name);
						timeoutVar = setTimeout(timeoutFunction, defaults.rate);
					};
				}
				timeoutFunction();
			}
		};
	}
})(jQuery);
