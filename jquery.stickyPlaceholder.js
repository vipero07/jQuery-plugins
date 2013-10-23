// Sticky Placeholders jQuery Plugin
// This is to make it so placeholders stay even when the input box is clicked, this fixes IE issues and allows for placeholder styleing
(function ($) {
    var alterParent = function (options, event) {
        var label = $(this).data('label');

        if (event && event.type === 'focusin') {
            label.css('opacity', options.placeholderFocusOpacity);
        } else if (event && event.type === 'focusout') {
            label.css('opacity', options.placeholderOpacity);
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
            wrapperDisplay: 'block',
            labelClass: 'sticky-placeholder-label',
            placeholderAttr: 'placeholder',
            dataAttr: 'data-sticky-placeholder',
            placeholderColor: '#000',
            placeholderOpacity: 0.5,
            placeholderFocusOpacity: 0.25
        };
        options = $.extend(defaults, options);

        return this.each(function () {
            var input = $(this),
                placeholder = input.attr(options.placeholderAttr),
                wrapper = $(this).wrap('<span class="' + options.wrapperClass + '" />').parent().css({ 'position': 'relative', 'display': options.wrapperDisplay }),
                label = $('<label class="' + options.labelClass + '" for="' + input.attr('id') + '">' + placeholder + '</label>').appendTo(wrapper),
                labelStyle;

            // store a reference to each input's label
            input.data('label', label);

            // remove the placeholder attribute to avoid conflcits
            input.removeAttr('placeholder');

            // If the dataAttr is set and it's not equal to the placeholderAttr
            if (options.dataAttr && options.placeholderAttr !== options.dataAttr) {
                input.attr('data-sticky-placeholder', placeholder);
            }

            labelStyle = {
                'color': options.placeholderColor,
                'font-family': input.css('font-family'),
                'font-weight': input.css('font-weight'),
                'font-size': input.css('font-size'),
                'left': parseInt(input.css('border-left-width'), 10) + parseInt(input.css('margin-left'), 10),
                'line-height': this.currentStyle ? this.currentStyle.lineHeight : input.css('line-height'),
                // fix for an IE/jQuery bug returning 1px when the line-height doesn't have a unit: http://bugs.jquery.com/ticket/2671
                'opacity': options.placeholderOpacity,
                'filter': "alpha(opacity=" + (options.placeholderOpacity*100) + ")",
                'padding': input.css('padding'), //fixes for keeping text in the box
                'padding-bottom': 0,
                'text-transform': input.css('text-transform'),
                'top': parseInt(input.css('border-top-width'), 10) + parseInt(input.css('margin-top'), 10),
                'width': input.css('width'), //keeps text in box
                'height': input.css('height') //keeps text in box
            };
            label.css(labelStyle);

            //IE FIX for dynamically inserted textareas
            if (input.val() == placeholder) {
                input.val("");
            }
            // hide the placeholder if the input already has a value
            if (input.val()) {
                label.hide();
            }

            $(this).bind('keydown input focusin focusout', function (event) {
                alterParent.call(this, options, event);
            });

            // prevent click/dblclick from selecting the label text
            label.bind('mousedown', function (e) {
                e.preventDefault();
            });

            // call alterParent initially without an event to set up the wrapper elements
            alterParent.call(this, options);
        });
    };
})(jQuery);
