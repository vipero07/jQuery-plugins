(function ($){
	if(!$.globalTimeout){
		var defaults = { rate: 200, max: false, name: "timeout", clear = false },
		timeoutVar = [], $window = $(window), total, clear = false;
		
		$.globalTimeout = function(options){
			if($.isNumeric(options)){
				defaults.rate = options;
			}else if($.isPlainObject(options)){
				$.extend(defaults, options);
			}else if(options == "clear"){
				clear = true;
			}
			
			total = 0;
			if(clear || defaults.clear){
				clearTimeout(timeoutVar[defaults.name]);
				clear = false;
			}else{
				var timeoutFunction, name = defaults.name, rate = defaults.rate, max = defaults.max;
				clearTimeout(timeoutVar[name]);
				
				if(max){
					timeoutFunction = function(){
						$window.trigger(name);
						total++;
						if(total < max){
							timeoutVar[name] = setTimeout(timeoutFunction, rate);
						}else{
							total = 0;
						}
					};
				}else{
					timeoutFunction = function(){
						$window.trigger(name);
						timeoutVar[name] = setTimeout(timeoutFunction, rate);
					};
				}
				timeoutFunction();
			}
		};
	}
})(jQuery);
