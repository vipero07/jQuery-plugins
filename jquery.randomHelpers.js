(function ($) {
    var $window = $(window);
    $.fn.onScreen = function () {
        var self = this;
        return ((self.offset().top + self.height()) <= ($window.scrollTop() + $window.height())) ? true : false;
    }
    $.fn.isAbove = function (element) {
        var self = this, $element = $(element);
        return (self.offset().top <= ($element.offset().top + $element.height())) ? true : false;
    }
    $.isTooDark = function (hex) {
        /// <summary>Checks the brightness of a Hex Color Used for fonts against background color, returns true if too dark</summary>
        /// <param name="hex" type="String">like '#FF33AA'</param>
        /// <returns type="Boolean"></returns>
        hex = hex.substring(1); //remove #
        var rgb = parseInt(hex, 16), //convert to decimal
            r = (rgb >> 16) & 0xff, //red
            g = (rgb >> 8) & 0xff, //green
            b = (rgb >> 0) & 0xff; //blue
        // per ITU-R BT.709, luma of 40 is too dark
        return ((0.2126 * r + 0.7152 * g + 0.0722 * b) < 40) ? true : false;
    }
    $.toHumanNumber = function (number) {
        /// <summary>Formats numbers to be human readable</summary>
        /// <param name="number" type="decimal"></param>
        /// <returns type="String"></returns>
        var kilo = 1000, absolute = 1;
        if (number < 0) {
            absolute = -1;
            number = number * absolute;
        }            
        if (number < kilo) return ' ' + number * absolute;
        var s = ' kMBTPEZY',
            precision = 2,
            e = Math.floor(Math.log(number) / Math.log(kilo));
        if (number.toString().length % 3 == 0) {
            precision = 3;
        }
        //TODO: fix precision so it doesn't round up i.e. 1950 votes != 2000
        return $.isNumber(number) ? ' ' + ((number.toPrecision(precision) / Math.pow(kilo, e)) * absolute) + s.charAt(e) : 0; //s[e];
    }
})(jQuery);
