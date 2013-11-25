(function ($) {
    $.fn.scrollEvents = function () {
        /// <summary>This is to handle all scrolling events in one place</summary>
        var didScroll = false,
        $element = $(this).scroll(function () {
            //check this variable with a timeout because the scroll event fires way too frequently
            didScroll = true;
        }),
        scrolled = {
            last: 0,
            current: $element.scrollTop(),
            down: false,
            up: false,
            update: function () {
                var self = this,
                    last = self.last = self.current,
                    current = self.current = $element.scrollTop();
                self.down = current > last;
                self.up = current < last;
            }
        },
        scrollDirection = function () {
            //check if the window scrolled
            if (didScroll) {
                scrolled.update();
                if (scrolled.down) {
                    $element.trigger("scrolldown", scrolled.current);
                } else if (scrolled.up) {
                    $element.trigger("scrollup", scrolled.current);
                }
                //TODO: save current page "location" in history //http://blog.gesteves.com/2011/09/22/better-infinite-scrolling-with-the-html5-history-api/
                didScroll = false;
            }
            //call yourself again
            setTimeout(scrollDirection, 200);
        };

        //initialize scroll
        setTimeout(scrollDirection, 0);
        return $element;
    };
})(jQuery);
