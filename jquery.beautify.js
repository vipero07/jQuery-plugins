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
                        $self.val(ui.value);
                    }
                });
                $self.attr('type', 'text')
                    .change(function () {
                        $slider.slider('value', $self.val());
                    })
                    .after($slider);
            });
        },
        beautifyAll = function(){
            beautifyRange();
        };
        switch(element){
            case 'range':
                beautifyRange();
                break;
            default:
                beautifyAll();
        }
        return true;
    };
})(jQuery);
