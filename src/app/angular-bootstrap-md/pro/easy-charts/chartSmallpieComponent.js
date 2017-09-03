import { Component, ElementRef, Input } from '@angular/core';
var EasyPieChartComponent = (function () {
    function EasyPieChartComponent(el) {
        this.element = el;
        var options = {
            barColor: '#ef1e25',
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
        this.options = Object.assign(options, this.options);
    }
    EasyPieChartComponent.prototype.ngOnInit = function () {
        this.element.nativeElement.innerHTML = "";
        this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
        this.pieChart.update(this.percent);
    };
    EasyPieChartComponent.prototype.ngOnChanges = function (changes) {
        if (!changes['percent'].isFirstChange()) {
            this.pieChart.update(this.percent);
        }
    };
    return EasyPieChartComponent;
}());
export { EasyPieChartComponent };
EasyPieChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'easy-pie-chart',
                template: '<div>Loading</div>'
            },] },
];
EasyPieChartComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
EasyPieChartComponent.propDecorators = {
    'percent': [{ type: Input, args: ['percent',] },],
    'options': [{ type: Input, args: ['options',] },],
};
//# sourceMappingURL=chartSmallpieComponent.js.map