(function ($) {
    $.beautify = function (element) {
        /// <summary>Makes all elements of set type look the same, and use jqueryui</summary>
        /// <param name="element" type="String">range is the only accepted "element" right now</param>
        /// <returns type="Boolean"></returns>
        var beautifyRange = function () {
            $('input[type="range"]').each(function () {
                var $self = $(this),
                    $slider = $(document.createElement('div')),
                    pInt = parseInt;
                $slider.slider({
                    range: 'min',
                    value: pInt($self.val()) || 0,
                    min: pInt($self.attr('min')) || 0,
                    max: pInt($self.attr('max')) || 100,
                    step: pInt($self.attr('step')) || 1,
                    slide: function (e, ui) {
                        var val = ui.value;
                        $self.val(val);
                        $(ui.handle).text(val).css('width','auto');
                    },
                    stop: function (e, ui) {
                        $(ui.handle).text('').css('width', '1.2em');
                    }
                });
                $self.attr('type', 'hidden')
                    .after($slider);
            });
        },
        beautifyConfirm = function(){
            window.confirm = function(message, options){
            	/// <summary>overrides confirm with jquery ui with callback ability</summary>
            	/// <param name="message" type=""></param>
            	/// <param name="options" type=""></param>
            	
            	//These are defaults
            	var settings = {
            		title: 'Confirm',
            		buttons: {Ok: 'OK', Cancel: 'Cancel'},
            		callback: false,
            		zIndex: 999
            	};
            	if(options){
            		$.extend(settings,options);
            	}
            	
            	var confirmEle = $(document.createElement('div'))
            		.css({ display: 'none', 'z-index': settings.zIndex })
            		.html(message),
            		callback = settings.callback,
            		buttons = settings.buttons;
            		
            	$('body').append(confirmEle);
            	
            	confirmEle.dialog({
            		resizable: false,
            		title: settings.title,
            		modal: true,
            		height: 'auto',
            		width: 'auto',
            		buttons: [
            			{
            				text: buttons.Ok,
            				click: function () {
            					if (callback && $.isFunction(callback)) {
            						callback(true);
            					}
            					confirmEle.dialog("close");
            				}
            			}, {
            				text: buttons.Cancel,
            				click: function () {
            				    if (callback && $.isFunction(callback)) {
            						callback(false);
            					}
            					confirmEle.dialog("close");
            				}
            			}
            		],
            		close: function () {
            			confirmEle.remove();
            			return false;
            		}
        	    });
            };
        },
        beautifyAll = function(){
            beautifyRange();
            beautifyConfirm();
        };
        if(typeof(element) === 'string'){
            element = element.toLowerCase();
        }
        switch(element){
            case 'range':
                beautifyRange();
                break;
            case 'confirm':
                beautifyConfirm();
                break;
            default:
                beautifyAll();
        }
        return true;
    };
})(jQuery);
