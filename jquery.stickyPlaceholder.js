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
            (function (input) {
                setTimeout(function () {
                    toggleLabel(input, label);
                }, 0);
            })(this);
        }
    };

    var toggleLabel = function (input, label) {
        if ($(input).val()) {
            label.hide();
        } else {
            label.show();
        }
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
                label = $(document.createElement('label')).attr({ 'class': options.labelClass, 'for': $input.attr('id') })
                    .text(placeholder)
                    .css($.extend(
                        {
                            'color': options.placeholderColor,
                            'opacity': options.placeholderOpacity,
                            'filter': "alpha(opacity=" + (options.placeholderOpacity * 100) + ")",
                            'margin': (parseInt($input.css('border-top-width'), 10) + parseInt($input.css('margin-top'), 10)) + 'px ' +
                                (parseInt($input.css('border-left-width'), 10) + parseInt($input.css('margin-left'), 10)) + 'px ' +
                                0 + ' ' +
                                (parseInt($input.css('border-right-width'), 10) + parseInt($input.css('margin-right'), 10)) + 'px ',
                            'line-height': self.currentStyle ? self.currentStyle.lineHeight : $input.css('line-height')
                        },
                        $input.css(['font-family', 'font-weight', 'font-size', 'padding-top', 'padding-left', 'padding-right', 'text-transform', 'width', 'height'])
                    ));

            $input.wrap(wrapper).after(label)
                .data('label', label) // store a reference to each input's label
                .removeAttr('placeholder'); // remove the placeholder attribute to avoid conflcits

            // If the dataAttr is set and it's not equal to the placeholderAttr
            if (options.dataAttr && options.placeholderAttr !== options.dataAttr) {
                $input.attr(options.dataAttr, placeholder);
            }

            //IE FIX
            if ($input.val() == placeholder) {
                $input.val("");
            } else if ($input.val()) {
                // hide the placeholder if the input already has a value
                label.hide();
            }

            $input.bind('keydown input focusin focusout', function (event) {
                alterParent.call(self, options, event);
            });

            // prevent click/dblclick from selecting the label text
            label.bind('mousedown', function (e) {
                e.preventDefault();
            });

            // call alterParent initially without an event to set up the wrapper elements
            alterParent.call(self, options);
        });
    };
})(jQuery);
