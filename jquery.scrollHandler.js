(function ($) {
    $.scrollHandler = function (downCallback, upCallback) {
        /// <summary>This is to handle all scrolling events in one place</summary>
        /// <param name="downCallback" type="function">calls function whenever window scrolls down</param>
        /// <param name="upCallback" type="function">calls function whenever window scrolls up</param>
        var didScroll = false,
        $window = $(window).scroll(function () {
            //check this variable at an interval because the scroll event fires way too frequently
            didScroll = true;
        }),
        scrolled = {
            last: 0,
            current: 0,
            down: false,
            up: false,
            update: function () {
                var self = this;
                self.last = self.current;
                self.current = $window.scrollTop();
                self.down = self.current > self.last;
                self.up = self.current < self.last;
            }
        };

        setInterval(function () {
            //check if the window scrolled
            if (didScroll) {
                scrolled.update();
                if (scrolled.down) {
                    if (typeof downCallback == "function") {
                        downCallback.call();
                    }
                }else if (scrolled.up) {
                    if (typeof upCallback == "function") {
                        upCallback.call();
                    }
                }
                //TODO: save current page "location" in history //http://blog.gesteves.com/2011/09/22/better-infinite-scrolling-with-the-html5-history-api/
                didScroll = false;
            }
        }, 150);
    };
})(jQuery);
