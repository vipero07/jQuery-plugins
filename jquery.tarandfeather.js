(function ($){
	if(!$.tarString && Storage){
		$.tarString = function(str, len){
		//take len characters out of a string and "tar" them
			if(str.length > len){
				var startPos = ~~((Math.random() * (str.length - len))),
					endPos = startPos + len + 1;
					str = str.substring(startPos, endPos);
			}
			localStorage.tarString = str;
			return true;
		}
		
		$.featherString = function(str){
		//true means the feathers stuck to the "tar", and the post is close enough to the same as the previous one
			var result = false,
				tarString = localStorage.tarString;
			if(tarString && str.length >= tarString.length){
			//the reason for checking lengths is to see if the initial string was "please"
			//and the new string is "please sir, I want some more"
				result = str.indexOf(tarString) > -1;
			}
			return result;
		}
		
		$.tarAndFeatherString = function(str, len){
		//true means the post was tar and feathered, and shouldn't be posted to the server.
			var result = false;
			if($.featherString(str)){
				result = true;
			}
			//default randomize len between 10 and 20 characters if not set
			len = typeof len == 'number' ? len : ~~(Math.random() * 11) + 10;
			//always tar post so the random section being compared differs each time.
			$.tarString(str, len);
			return result;
		}
	}
})(jQuery);
