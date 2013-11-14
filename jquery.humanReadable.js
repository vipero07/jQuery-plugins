(function ($) {
  $.humanReadable = function (number) {
      /// <summary>Formats numbers to be human readable</summary>
      /// <param name="number" type="decimal"></param>
      /// <returns type="String"></returns>
      var retValue = false;
      if (typeof number == "number") {
          var kilo = 1000;
          if (number < kilo) {
              retValue = number;
          } else {
              var s = ' kMBTPEZY',
                  e = Math.floor(Math.log(number) / Math.log(kilo));
              retValue = Number((number / Math.pow(kilo, e)).toString().substring(0, 3)) + s.charAt(e);
          }
      }
      return retValue;
  };
})(jQuery);
