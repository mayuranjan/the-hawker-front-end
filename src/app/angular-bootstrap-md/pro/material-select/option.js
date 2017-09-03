var Option = (function () {
    function Option(option) {
        this.wrappedOption = option;
        this.disabled = false;
        this.highlighted = false;
        this.selected = false;
        this.shown = true;
        this.group = false;
    }
    Object.defineProperty(Option.prototype, "value", {
        get: function () {
            return this.wrappedOption.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "label", {
        get: function () {
            return this.wrappedOption.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Option.prototype, "icon", {
        get: function () {
            if (this.wrappedOption.icon !== "" && this.wrappedOption.icon !== undefined) {
                return this.wrappedOption.icon;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return Option;
}());
export { Option };
//# sourceMappingURL=option.js.map