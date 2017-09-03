export function computedStyle(element, styleProp) {
    var el;
    el = (typeof element === 'string') ? document.querySelector(element) : element;
    var value, defaultView = (el.ownerDocument || document).defaultView;
    if (defaultView && defaultView.getComputedStyle) {
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }
    else if (el['currentStyle']) {
        styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
        });
        value = el['currentStyle'][styleProp];
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function (value) {
                var oldLeft = el.style.left, oldRsLeft = el['runtimeStyle'].left;
                el['runtimeStyle'].left = el['currentStyle'].left;
                el.style.left = value || 0;
                value = el.style['pixelLeft'] + "px";
                el.style.left = oldLeft;
                el['runtimeStyle'].left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
}
//# sourceMappingURL=computed-style.js.map