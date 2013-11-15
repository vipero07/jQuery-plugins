(function ($) {
  var today = new Date();
  $.fn.UtcToLocal = function () {
      /// <summary>converts UTC time to loacl</summary>
      var self = this;
      $('time', self).each(function () {
          var time = $(this), utcTime = new Date(Date.parse(time.attr('datetime')) - (today.getTimezoneOffset() * 60 * 1000)),
              dateString = utcTime.toISOString();
          time.attr('datetime', dateString).text(dateString);
      });
      return self;
  };
})(jQuery);
