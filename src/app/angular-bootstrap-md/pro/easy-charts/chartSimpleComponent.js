import { Component, Input } from '@angular/core';
var SimpleChartComponent = (function () {
    function SimpleChartComponent() {
        this.options = {
            barColor: null,
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true
            }
        };
    }
    SimpleChartComponent.prototype.ngOnInit = function () {
        this.options.barColor = "#" + this.barColor;
    };
    return SimpleChartComponent;
}());
export { SimpleChartComponent };
SimpleChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'simple-chart',
                template: "\n    <span class=\"min-chart\">\n      <span class=\"percent\">{{ percent }}</span>\n      <easy-pie-chart [percent]=\"percent\" [options]=\"options\"></easy-pie-chart>\n    </span>\n  ",
                styles: []
            },] },
];
SimpleChartComponent.ctorParameters = function () { return []; };
SimpleChartComponent.propDecorators = {
    'percent': [{ type: Input, args: ['percent',] },],
    'barColor': [{ type: Input, args: ['barColor',] },],
};
//# sourceMappingURL=chartSimpleComponent.js.map