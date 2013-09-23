(function ($) {
    $.beautify = function (element) {
        /// <summary>Makes all elements of set type look the same</summary>
        /// <param name="element" type="String">range is the only accepted "element" right now</param>
        /// <returns type="Boolean"></returns>
        if (element === "range") {
            $('input[type="range"]').each(function () {
                var self = $(this),
                    slider = $(document.createElement('div'));
                slider.slider({
                    range: "min",
                    value: parseInt(self.val()) || 0,
                    min: parseInt(self.attr('min')) || 0,
                    max: parseInt(self.attr('max')) || 100,
                    step: parseInt(self.attr('step')) || 1,
                    slide: function (e, ui) {
                        self.val(ui.value);
                    }
                });
                self.val(slider.slider("value"))
                    .attr('type', 'text')
                    .change(function () {
                        slider.slider('value', $(this).val());
                    })
                    .after(slider);
            });
        }
        return this;
    };
})(jQuery);
