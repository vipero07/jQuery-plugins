(function ($) {
  var kilo = 1000, suffix = ' kMBTPEZY';
  $.humanReadable = function (number) {
      /// <summary>Formats numbers to be human readable</summary>
      /// <param name="number" type="decimal"></param>
      /// <returns type="String"></returns>
      var retValue = false;
      if (typeof number == "number") {
          if (number < kilo) {
              retValue = number.toString();
          } else {
              var e = (Math.log(number) / Math.log(kilo)) | 0;
              retValue = Number((number / Math.pow(kilo, e)).toString().slice(0, 3)) + suffix.charAt(e);
          }
      }
      return retValue;
  };
})(jQuery);
