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
            window.confirm = function (message, options) {
                /// <summary>overrides confirm with jquery ui with callback ability</summary>
                /// <param name="message" type=""></param>
                /// <param name="options" type=""></param>
            
                //These are defaults
                var settings = {
                    title: 'Confirm',
                    buttons: { Ok: 'OK', Cancel: 'Cancel' },
                    callback: false,
                    zIndex: 999,
                    dialogSettings: false
                };
                if (options) {
                    $.extend(settings, options);
                }
            
                var dialogEle = $(document.createElement('div'))
                    .css({ display: 'none', 'z-index': settings.zIndex })
                    .html(message),
                    callback = settings.callback,
                    buttons = settings.buttons,
                    dialogSettings = {
                        resizable: false,
                        modal: true,
                        height: 'auto',
                        width: 'auto',
                        title: settings.title,
                        buttons: [
                            {
                                text: buttons.Cancel,
                                click: function () {
                                    if (callback && $.isFunction(callback)) {
                                        callback(false);
                                    }
                                    dialogEle.dialog("close");
                                }
                            }, {
                                text: buttons.Ok,
                                click: function () {
                                    if (callback && $.isFunction(callback)) {
                                        callback(true);
                                    }
                                    dialogEle.dialog("close");
                                }
                            }
                        ],
                        close: function () {
                            dialogEle.remove();
                            return false;
                        }
                    };
                if (settings.dialogSettings) {
                    $.extend(dialogSettings, settings.dialogSettings);
                }
                $('body').append(dialogEle);
                dialogEle.dialog(dialogSettings);
                return dialogEle;
            };
        },
        beautifyAlert = function(){
            window.alert = function(message, options){
            	/// <summary>overrides alert with jquery ui with callback ability</summary>
            	/// <param name="message" type=""></param>
            	/// <param name="options" type=""></param>
            	
            	//These are defaults
            	var settings = {
            		title: 'Alert',
            		buttons: {Ok: 'Close'},
            		callback: false,
            		zIndex: 999
            	};
            	if(options){
            		$.extend(settings,options);
            	}
            	
            	var dialogEle = $(document.createElement('div'))
            		.css({ display: 'none', 'z-index': settings.zIndex })
            		.html(message),
            		callback = settings.callback,
            		buttons = settings.buttons;
            		
            	$('body').append(dialogEle);
            	
            	dialogEle.dialog({
            		resizable: false,
            		modal: true,
            		height: 'auto',
            		width: 'auto',
            		title: settings.title,
            		buttons: [
            			{
            				text: buttons.Ok,
            				click: function () {
            					if (callback && $.isFunction(callback)) {
            						callback(true);
            					}
            					dialogEle.dialog("close");
            				}
            			}
            		],
            		close: function () {
            			dialogEle.remove();
            			return false;
            		}
        	    });
            };
        },
        beautifyAll = function(){
            beautifyRange();
            beautifyConfirm();
            beautifyAlert();
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
            case 'alert':
                beautifyAlert();
                break;
            default:
                beautifyAll();
        }
        return true;
    };
})(jQuery);
