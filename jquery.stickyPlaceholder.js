// Sticky Placeholders jQuery Plugin
// This is to make it so placeholders stay even when the input box is clicked, this fixes IE issues and allows for placeholder styleing
(function ($) {
    var alterParent = function (options, event) {
        var label = $(this).data('label');

        if (event && event.type === 'focusin') {
            label.css({
                'opacity': options.placeholderFocusOpacity,
                'filter': "alpha(opacity=" + (options.placeholderFocusOpacity * 100) + ")"
            });
        } else if (event && event.type === 'focusout') {
            label.css({
                'opacity': options.placeholderOpacity,
                'filter': "alpha(opacity=" + (options.placeholderOpacity * 100) + ")"
            });
        }

        if (event && event.type !== 'keydown') {
            toggleLabel(this, label);
        } else {
            // Use timeout to catch val() just after the key is pressed
            // Using keyup is too slow.   
            setTimeout(function () {
                toggleLabel(input, label);
            }, 0);
        }
    };

    var toggleLabel = function (input, label) {
        if ($(input).val()) {
            label.hide();
        } else {
            label.show();
        }
    };
    
    var addValues = function (obj) {
        var total = 0;
        $.each(obj, function(prop, val) {
            total += parseInt(val, 10);
        });
        return total;
    };
    
    var getPaddingPx = function (element, direction) {
        return addValues($(element).css(['border-' + direction + '-width', 'margin-' + direction, 'padding-' + direction])) + 'px ';
    };

    $.fn.stickyPlaceholders = function (options) {
        var defaults = {
            wrapperClass: 'sticky-placeholder-wrapper',
            labelClass: 'sticky-placeholder-label',
            placeholderAttr: 'placeholder',
            dataAttr: 'data-sticky-placeholder',
            placeholderColor: '#000',
            placeholderOpacity: 0.5,
            placeholderFocusOpacity: 0.25
        };
        options = $.extend(defaults, options);

        return this.each(function () {
            var self = this,
                $input = $(self),
                placeholder = $input.attr(options.placeholderAttr),
                wrapper = $(document.createElement('span')).addClass(options.wrapperClass),
                label = $(document.createElement('label')).attr({ 'class': options.labelClass, 'for': $input.attr('id'), 'title': $input.attr('title') })
                    .text(placeholder)
                    .css($.extend(
                        {
                            'color': options.placeholderColor,
                            'opacity': options.placeholderOpacity,
                            'filter': "alpha(opacity=" + (options.placeholderOpacity * 100) + ")",
                            'padding': getPaddingPx($input, 'top') +
                                getPaddingPx($input, 'right') +
                                0 + ' ' +
                                getPaddingPx($input, 'left'),
                            'line-height': self.currentStyle ? self.currentStyle.lineHeight : $input.css('line-height')
                        },
                        $input.css(['font-family', 'font-weight', 'font-size', 'width', 'height'])
                    ));

            $input.wrap(wrapper).before(label)
                .data('label', label) // store a reference to each input's label
                .removeAttr('placeholder'); // remove the placeholder attribute to avoid conflcits
                
            // If the dataAttr is set and it's not equal to the placeholderAttr
            if (options.dataAttr && options.placeholderAttr !== options.dataAttr) {
                $input.attr(options.dataAttr, placeholder);
            }

           //IE FIX and autofill fix
            setTimeout(function () {
                var inVal = $input.val();
                if (inVal == placeholder) {
                    $input.val("");
                } else if (inVal) {
                    // hide the placeholder if the input already has a value (autofilled)
                    label.hide();
                }
            }, 100);
            
            label.on('mousedown mouseup focus', function (e) {
                $input.trigger(e.type);
                return false;
            });

            $input.bind('keydown input focusin focusout', function (event) {
                alterParent.call(self, options, event);
            });

            // call alterParent initially without an event to set up the wrapper elements
            alterParent.call(self, options);
        });
    };
})(jQuery);
