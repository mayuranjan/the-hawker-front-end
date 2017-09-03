import { Component, ViewChild, Input, ElementRef, Renderer } from '@angular/core';
var ClockPicker = (function () {
    function ClockPicker(elem, renderer) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.twelvehour = false;
        this.darktheme = false;
        this.placeholder = "";
        this.label = "";
        this.duration = 300;
        this.showClock = false;
        this.showHours = false;
        this.dialRadius = 135;
        this.outerRadius = 110;
        this.innerRadius = 80;
        this.tickRadius = 20;
        this.diameter = this.dialRadius * 2;
        this.hoursTicks = [];
        this.minutesTicks = [];
        this.selectedHours = { 'h': "12", "m": "00", 'ampm': 'AM' };
        this.endHours = "";
        this.touchSupported = 'ontouchstart' in window;
        this.mousedownEvent = 'mousedown' + (this.touchSupported ? ' touchstart' : '');
        this.mousemoveEvent = 'mousemove' + (this.touchSupported ? ' touchmove' : '');
        this.mouseupEvent = 'mouseup' + (this.touchSupported ? ' touchend' : '');
        renderer.listenGlobal(this.elem.nativeElement, "click", function (event) {
            if (_this.showClock && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.showClock = false;
            }
            if (event.target.classList.contains("picker__holder")) {
                _this.showClock = false;
            }
        });
    }
    ClockPicker.prototype.ngOnInit = function () {
        this.generateTick();
    };
    ClockPicker.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.renderer.listenGlobal(this.plate.nativeElement, this.mousedownEvent, function (event) {
            _this.mousedown(event, false);
        });
    };
    ClockPicker.prototype.checkDraw = function () {
        var value;
        var isHours = this.showHours;
        if (isHours) {
            value = parseInt(this.selectedHours.h);
        }
        else {
            value = parseInt(this.selectedHours.m);
        }
        var unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius, xd = Math.sin(radian) * radius, yd = -Math.cos(radian) * radius;
        this.setHand(xd, yd, false, false);
    };
    ClockPicker.prototype.mousedown = function (e, space) {
        var _this = this;
        var offset = this.plate.nativeElement.getBoundingClientRect(), isTouch = /^touch/.test(e.type), x0 = offset.left + this.dialRadius, y0 = offset.top + this.dialRadius, dx = (isTouch ? e.originalEvent.touches[0] : e).clientX - x0, dy = (isTouch ? e.originalEvent.touches[0] : e).clientY - y0, z = Math.sqrt(dx * dx + dy * dy), moved = false;
        if (space && (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius))
            return;
        e.preventDefault();
        e.stopPropagation();
        if (this.showHours) {
            this.setHand(dx, dy, true, false);
        }
        else {
            this.setHand(dx, dy, false, false);
        }
        var mousemoveEventMethod = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var isTouch = /^touch/.test(e.type), x = event.clientX - x0, y = event.clientY - y0;
            if (!moved && x === dx && y === dy)
                return;
            moved = true;
            _this.setHand(x, y, false, true);
        };
        var mouseupEventMethod = function (event) {
            document.removeEventListener(_this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            var isTouch = /^touch/.test(e.type), x = event.clientX - x0, y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy)
                _this.setHand(x, y, false, false);
            _this.showMinutesClock();
            document.removeEventListener(_this.mouseupEvent, mouseupEventMethod);
        };
        document.addEventListener(this.mousemoveEvent, mousemoveEventMethod);
        document.addEventListener(this.mouseupEvent, mouseupEventMethod);
    };
    ClockPicker.prototype.openBtnClicked = function () {
        this.showClock = true;
        this.showHours = true;
        this.checkDraw();
    };
    ClockPicker.prototype.closeBtnClicked = function () {
        var h = this.selectedHours.h;
        var m = this.selectedHours.m;
        var ampm = this.selectedHours.ampm;
        if (this.twelvehour) {
            this.endHours = h + ":" + m + ampm;
        }
        else {
            this.endHours = h + ":" + m;
        }
        this.showClock = false;
    };
    ClockPicker.prototype.setHour = function (hour) {
        this.selectedHours.h = hour;
    };
    ClockPicker.prototype.setMinute = function (min) {
        this.selectedHours.m = min;
    };
    ClockPicker.prototype.setAmPm = function (ampm) {
        this.selectedHours.ampm = ampm;
    };
    ClockPicker.prototype.showHoursClock = function () {
        this.showHours = true;
        this.checkDraw();
    };
    ClockPicker.prototype.showMinutesClock = function () {
        this.showHours = false;
        this.checkDraw();
    };
    ClockPicker.prototype.generateTick = function () {
        if (this.twelvehour) {
            for (var i = 1; i < 13; i++) {
                var radian = i / 6 * Math.PI;
                var radius = this.outerRadius;
                var tick = {
                    'hour': i,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        else {
            for (var i = 0; i < 24; i++) {
                var radian = i / 6 * Math.PI;
                var inner = i > 0 && i < 13;
                var radius = inner ? this.innerRadius : this.outerRadius;
                var h = void 0;
                if (i === 0) {
                    h = "0" + i.toString();
                }
                else {
                    h = i;
                }
                var tick = {
                    'hour': h,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = i / 30 * Math.PI;
            var min = i.toString();
            if (i < 10) {
                min = "0" + i.toString();
            }
            var tick = {
                'min': min,
                'left': this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                'top': this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }
    };
    ClockPicker.prototype.setHand = function (x, y, roundBy5, draging) {
        var radian = Math.atan2(x, -y), isHours = this.showHours, unit = Math.PI / (isHours || roundBy5 ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = isHours && z < (this.outerRadius + this.innerRadius) / 2, radius = inner ? this.innerRadius : this.outerRadius, value;
        if (this.showHours) {
            value = parseInt(this.selectedHours.h);
        }
        else {
            value = parseInt(this.selectedHours.m);
        }
        if (this.twelvehour) {
            radius = this.outerRadius;
        }
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            }
            else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }
        else {
            if (isHours) {
                if (value === 12)
                    value = 0;
                value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            else {
                if (roundBy5)
                    value *= 5;
                if (value === 60)
                    value = 0;
            }
        }
        if (isHours)
            this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
        else {
            if (value % 5 == 0)
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
            else
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
        }
        var cx1 = Math.sin(radian) * (radius - this.tickRadius), cy1 = -Math.cos(radian) * (radius - this.tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this.showHours) {
            if (value < 10) {
                this.setHour("0" + value.toString());
            }
            else {
                this.setHour(value.toString());
            }
        }
        else {
            if (value < 10) {
                this.setMinute("0" + value.toString());
            }
            else {
                this.setMinute(value.toString());
            }
        }
    };
    ClockPicker.prototype.offset = function (obj) {
        var left = 0, top = 0;
        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return { left: left, top: top };
    };
    return ClockPicker;
}());
export { ClockPicker };
ClockPicker.decorators = [
    { type: Component, args: [{
                selector: 'time-picker',
                template: "\n    <div class=\"md-form\">\n        <label>{{ label }}\n            <input [placeholder]=\"placeholder\" [value]=\"endHours\" type=\"text\" class=\"form-control timepicker\" (focus)=\"openBtnClicked()\">\n        </label>\n        <div class=\"clockpicker picker\" [hidden]=\"!showClock\" [ngClass]=\"{'picker--opened': showClock, 'darktheme': darktheme}\">\n            <div class=\"picker__holder\">\n            <div class=\"picker__frame\">\n                <div class=\"picker__wrap\">\n                <div class=\"picker__box\">\n                    <div class=\"picker__date-display\">\n                    <div class=\"clockpicker-display\">\n                        <div class=\"clockpicker-display-column\">\n                        <span class=\"clockpicker-span-hours text-primary\" [ngClass]=\"{'text-primary': showHours}\" (click)=\"showHoursClock()\">\n                        {{ selectedHours.h }}</span>:<span class=\"clockpicker-span-minutes\" [ngClass]=\"{'text-primary': !showHours}\"\n                            (click)=\"showMinutesClock()\">{{selectedHours.m }}</span>\n                        </div>\n                        <div class=\"clockpicker-display-column clockpicker-display-am-pm\" *ngIf=\"twelvehour\">\n                        <div class=\"clockpicker-span-am-pm\">{{ selectedHours.ampm }}</div>\n                        </div>\n                    </div>\n                    </div>\n                    <div class=\"picker__calendar-container\">\n                    <!--<div class=\"clockpicker-plate\" (mousedown)=\"changeTick($event)\" #plate>-->\n                    <div class=\"clockpicker-plate\" #plate>\n                        <div class=\"clockpicker-canvas\">\n                        <svg class=\"clockpicker-svg\" width=\"270\" height=\"270\" #svg>\n                            <g transform=\"translate(135,135)\" #g>\n                            <line x1=\"0\" y1=\"0\" x2=\"77.94228634059948\" y2=\"-45.00000000000001\" #hand></line>\n                            <circle class=\"clockpicker-canvas-fg\" r=\"5\" cx=\"95.26279441628824\" cy=\"-55.000000000000014\" #fg></circle>\n                            <circle class=\"clockpicker-canvas-bg\" r=\"20\" cx=\"95.26279441628824\" cy=\"-55.000000000000014\" #bg></circle>\n                            <circle class=\"clockpicker-canvas-bearing\" cx=\"0\" cy=\"0\" r=\"2\" #bearing></circle>\n                            </g>\n                        </svg>\n                        </div>\n                        <div class=\"clockpicker-dial clockpicker-hours\" #hoursPlate [ngClass]=\"{'clockpicker-dial-out': !showHours}\" [ngStyle]=\"{'visibility': !showHours ? 'hidden' : 'visible'}\">\n                        <div *ngFor=\"let tick of hoursTicks\" class=\"clockpicker-tick\" style=\"font-size: 140%;\" [ngStyle]=\"{'left': tick.left+'px', 'top': tick.top+'px'}\"\n                            id=\"{{ tick.hour }}\">\n                            {{ tick.hour }}\n                        </div>\n                        </div>\n                        <div class=\"clockpicker-dial clockpicker-minutes\" #minutesPlate [ngClass]=\"{'clockpicker-dial-out': showHours}\" [ngStyle]=\"{'visibility': showHours ? 'hidden' : 'visible'}\">\n                        <div *ngFor=\"let tick of minutesTicks\" class=\"clockpicker-tick\" style=\"font-size: 120%;\" [ngStyle]=\"{'left': tick.left+'px', 'top': tick.top+'px'}\">\n                            {{ tick.min }}\n                        </div>\n                        </div>\n                    </div>\n                    <div class=\"clockpicker-am-pm-block\" *ngIf=\"twelvehour\">\n                        <button type=\"button\" class=\"btn-floating btn-flat clockpicker-button am-button\" [ngClass]=\"{'active': selectedHours.ampm=='AM'}\"\n                        (click)=\"setAmPm('AM')\">\n                        AM\n                        </button>\n                        <button type=\"button\" class=\"btn-floating btn-flat clockpicker-button pm-button active\" [ngClass]=\"{'active': selectedHours.ampm=='PM'}\"\n                        (click)=\"setAmPm('PM')\">\n                        PM\n                        </button>\n                    </div>\n                    </div>\n                    <div class=\"picker__footer\">\n                    <button type=\"button\" class=\"btn-flat clockpicker-button\" (click)=\"closeBtnClicked()\">\n                        Done\n                    </button>\n                    </div>\n                </div>\n                </div>\n            </div>\n            </div>\n        </div>\n    </div>\n  "
            },] },
];
ClockPicker.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
ClockPicker.propDecorators = {
    'hoursPlate': [{ type: ViewChild, args: ['hoursPlate',] },],
    'minutesPlate': [{ type: ViewChild, args: ['minutesPlate',] },],
    'plate': [{ type: ViewChild, args: ['plate',] },],
    'svg': [{ type: ViewChild, args: ['svg',] },],
    'g': [{ type: ViewChild, args: ['g',] },],
    'hand': [{ type: ViewChild, args: ['hand',] },],
    'fg': [{ type: ViewChild, args: ['fg',] },],
    'bg': [{ type: ViewChild, args: ['bg',] },],
    'bearing': [{ type: ViewChild, args: ['bearing',] },],
    'twelvehour': [{ type: Input, args: ['twelvehour',] },],
    'darktheme': [{ type: Input, args: ['darktheme',] },],
    'placeholder': [{ type: Input, args: ['placeholder',] },],
    'label': [{ type: Input, args: ['label',] },],
    'duration': [{ type: Input, args: ['duration',] },],
    'showClock': [{ type: Input, args: ['showClock',] },],
};
//# sourceMappingURL=timepickerComponent.js.map