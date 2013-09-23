(function ($) {
    $.fn.ajaxifyForms = function () {
        /// <summary>Makes all non-ajaxy forms in a container ajaxy
        /// This shouldn't be used if possible...</summary>
        /// <returns type="Object">jquery deferred object</returns>
        var def = new $.Deferred();
        $(this).on('submit', 'form', function () {
            var form = $(this),
                result;
            if (form.attr('method') != 'post') {
                result = $.get(form.attr('action'), form.serialize());
            } else {
                result = $.post(form.attr('action'), form.serialize());
            }
            result.done(function (data, textStatus, jqXHR) {
                def.resolve(data, textStatus, jqXHR);
            }).fail(function (data, textStatus, jqXHR) {
                def.reject(data, textStatus, jqXHR);
            });
            return false;
        });
        return def.promise();
    };
})(jQuery);
