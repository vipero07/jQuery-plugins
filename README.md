#jQuery-plugins
Just a random assortment of some jq plugins

##jquery.beautify.js
Currently only modifys input type range to jQuery UI slider elements with visible input elements,
mostly because the way HTML5 handles input type range elements is terrible. I plan on adding more jQuery UI
functionality to this like a replacement for window.alert() and window.confirm().

##jquery.ajaxifyForms.js
This makes normal forms AJAXy and returns a jQuery deferred object, for more information
http://api.jquery.com/category/deferred-object/ please note this deferred object is only fired once
what this means is you need to wire up the form to a handeler function each time it is fired. This
is far from the best method for ajaxifying forms, and it was just a simple workaround for a minor
issue on a project.
