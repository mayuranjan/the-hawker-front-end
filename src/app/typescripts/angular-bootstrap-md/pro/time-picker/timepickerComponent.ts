import {Component, ViewChild, Input, ElementRef, Renderer, OnInit, AfterViewInit} from '@angular/core';


@Component ({
  selector: 'time-picker',
  template: `
    <div class="md-form">
        <label>{{ label }}
            <input [placeholder]="placeholder" [value]="endHours" type="text" class="form-control timepicker" (focus)="openBtnClicked()">
        </label>
        <div class="clockpicker picker" [hidden]="!showClock" [ngClass]="{'picker--opened': showClock, 'darktheme': darktheme}">
            <div class="picker__holder">
            <div class="picker__frame">
                <div class="picker__wrap">
                <div class="picker__box">
                    <div class="picker__date-display">
                    <div class="clockpicker-display">
                        <div class="clockpicker-display-column">
                        <span class="clockpicker-span-hours text-primary" [ngClass]="{'text-primary': showHours}" (click)="showHoursClock()">
                        {{ selectedHours.h }}</span>:<span class="clockpicker-span-minutes" [ngClass]="{'text-primary': !showHours}"
                            (click)="showMinutesClock()">{{selectedHours.m }}</span>
                        </div>
                        <div class="clockpicker-display-column clockpicker-display-am-pm" *ngIf="twelvehour">
                        <div class="clockpicker-span-am-pm">{{ selectedHours.ampm }}</div>
                        </div>
                    </div>
                    </div>
                    <div class="picker__calendar-container">
                    <!--<div class="clockpicker-plate" (mousedown)="changeTick($event)" #plate>-->
                    <div class="clockpicker-plate" #plate>
                        <div class="clockpicker-canvas">
                        <svg class="clockpicker-svg" width="270" height="270" #svg>
                            <g transform="translate(135,135)" #g>
                            <line x1="0" y1="0" x2="77.94228634059948" y2="-45.00000000000001" #hand></line>
                            <circle class="clockpicker-canvas-fg" r="5" cx="95.26279441628824" cy="-55.000000000000014" #fg></circle>
                            <circle class="clockpicker-canvas-bg" r="20" cx="95.26279441628824" cy="-55.000000000000014" #bg></circle>
                            <circle class="clockpicker-canvas-bearing" cx="0" cy="0" r="2" #bearing></circle>
                            </g>
                        </svg>
                        </div>
                        <div class="clockpicker-dial clockpicker-hours" #hoursPlate [ngClass]="{'clockpicker-dial-out': !showHours}" [ngStyle]="{'visibility': !showHours ? 'hidden' : 'visible'}">
                        <div *ngFor="let tick of hoursTicks" class="clockpicker-tick" style="font-size: 140%;" [ngStyle]="{'left': tick.left+'px', 'top': tick.top+'px'}"
                            id="{{ tick.hour }}">
                            {{ tick.hour }}
                        </div>
                        </div>
                        <div class="clockpicker-dial clockpicker-minutes" #minutesPlate [ngClass]="{'clockpicker-dial-out': showHours}" [ngStyle]="{'visibility': showHours ? 'hidden' : 'visible'}">
                        <div *ngFor="let tick of minutesTicks" class="clockpicker-tick" style="font-size: 120%;" [ngStyle]="{'left': tick.left+'px', 'top': tick.top+'px'}">
                            {{ tick.min }}
                        </div>
                        </div>
                    </div>
                    <div class="clockpicker-am-pm-block" *ngIf="twelvehour">
                        <button type="button" class="btn-floating btn-flat clockpicker-button am-button" [ngClass]="{'active': selectedHours.ampm=='AM'}"
                        (click)="setAmPm('AM')">
                        AM
                        </button>
                        <button type="button" class="btn-floating btn-flat clockpicker-button pm-button active" [ngClass]="{'active': selectedHours.ampm=='PM'}"
                        (click)="setAmPm('PM')">
                        PM
                        </button>
                    </div>
                    </div>
                    <div class="picker__footer">
                    <button type="button" class="btn-flat clockpicker-button" (click)="closeBtnClicked()">
                        Done
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  `
})

export class ClockPicker implements OnInit, AfterViewInit {
    @ViewChild('hoursPlate') public hoursPlate: ElementRef;
    @ViewChild('minutesPlate') public minutesPlate: ElementRef;

    @ViewChild('plate') public plate: ElementRef;
    @ViewChild('svg') public svg: ElementRef;
    @ViewChild('g') public g: ElementRef;
    @ViewChild('hand') public hand: ElementRef;
    @ViewChild('fg') public fg: ElementRef;
    @ViewChild('bg') public bg: ElementRef;
    @ViewChild('bearing') public bearing: ElementRef;

    @Input('twelvehour') public twelvehour = false;
    @Input('darktheme') public darktheme = false;
    @Input('placeholder') public placeholder: String = "";
    @Input('label') public label = "";
    @Input('duration') public duration = 300;
    @Input('showClock') public showClock = false;

    showHours: boolean = false;

    dialRadius = 135;
    outerRadius = 110;
    innerRadius = 80;
    tickRadius = 20;
    diameter = this.dialRadius * 2;

    hoursTicks: any = [];
    minutesTicks: any = [];
    // twelvehour: boolean = false;
    selectedHours: any = {'h': "12","m": "00", 'ampm': 'AM'};
    endHours: string = "";


    touchSupported: any = 'ontouchstart' in window;
    mousedownEvent: any = 'mousedown' + ( this.touchSupported ? ' touchstart' : '');
    mousemoveEvent: any = 'mousemove' + ( this.touchSupported ? ' touchmove' : '');
    mouseupEvent: any = 'mouseup' + ( this.touchSupported ? ' touchend' : '');


    constructor(public elem: ElementRef,public renderer: Renderer) {
        renderer.listenGlobal(this.elem.nativeElement, "click", (event: any) => {

            if(this.showClock && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showClock = false;
            } 
            if(event.target.classList.contains("picker__holder")) {
                this.showClock = false;
            }
        });
    }

    ngOnInit() {
        this.generateTick();
    }

    ngAfterViewInit() { 
        this.renderer.listenGlobal(this.plate.nativeElement, this.mousedownEvent, (event: any) => {
            this.mousedown(event, false);
        });
    }
    

    checkDraw() { 
        let value;
        let isHours = this.showHours;
        if(isHours) {
            value = parseInt(this.selectedHours.h);
        } else {
            value = parseInt(this.selectedHours.m);
        }

        
        let unit = Math.PI / (isHours ? 6 : 30),
        radian = value * unit,
        radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius,
        xd = Math.sin(radian) * radius,
        yd = - Math.cos(radian) * radius;
        this.setHand(xd, yd, false, false);     
    }

    mousedown(e: any, space: any) {
        let offset = this.plate.nativeElement.getBoundingClientRect(),
            isTouch = /^touch/.test(e.type),
            x0 = offset.left + this.dialRadius,
            y0 = offset.top + this.dialRadius,
            dx = (isTouch ? e.originalEvent.touches[0] : e).clientX - x0,
            dy = (isTouch ? e.originalEvent.touches[0] : e).clientY - y0,
            z = Math.sqrt(dx * dx + dy * dy),
            moved = false;

        if (space && (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius))
            return;
        e.preventDefault();
        e.stopPropagation();


        if(this.showHours) {
            this.setHand(dx, dy, true, false);
        } else {
            this.setHand(dx, dy, false, false);
        }
        
        var mousemoveEventMethod = (event: any) => {
            event.preventDefault();
            event.stopPropagation();
            let isTouch = /^touch/.test(e.type),
                    x =  event.clientX - x0,
                    y = event.clientY - y0;
            if (! moved && x === dx && y === dy)
                return;
            moved = true;

            this.setHand(x, y, false, true);
        };

        var mouseupEventMethod = (event: any) => {
            document.removeEventListener(this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            var isTouch = /^touch/.test(e.type),
                    x = event.clientX - x0,
                    y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy)
                this.setHand(x, y, false, false);

            this.showMinutesClock() 
            document.removeEventListener(this.mouseupEvent, mouseupEventMethod);  
        };

        document.addEventListener(this.mousemoveEvent, mousemoveEventMethod);

        document.addEventListener(this.mouseupEvent, mouseupEventMethod);

    }

    openBtnClicked(): void {
        this.showClock = true;
        this.showHours = true;   
        this.checkDraw()
    }

    closeBtnClicked() {
        let h =  this.selectedHours.h;
        let m = this.selectedHours.m;
        let ampm =  this.selectedHours.ampm;

        if(this.twelvehour) {
            this.endHours = h+":"+m+ampm;
        } else {
            this.endHours = h + ":"+ m
        }
        this.showClock = false;
    }

    setHour(hour: String) {
        this.selectedHours.h = hour;
    }
    
    setMinute(min: String) {
        // event.stopPropagation();
        this.selectedHours.m = min;
    }

    setAmPm(ampm: String) {
        // event.stopPropagation();
        this.selectedHours.ampm = ampm;
    }

    showHoursClock() {
        this.showHours = true;
        this.checkDraw()
    }

    showMinutesClock() {
        this.showHours = false;
        this.checkDraw()
    }


    generateTick() {
        if(this.twelvehour) {
            for(let i = 1; i < 13; i++) {
                let radian = i / 6 * Math.PI;
                let radius = this.outerRadius;

                let tick = {
                    'hour': i,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        } else {
            for(let i = 0; i < 24; i++) {
                let radian = i / 6 * Math.PI;
                let inner = i > 0 && i < 13;
                let radius = inner ? this.innerRadius : this.outerRadius;
                let h;

                if(i === 0) {
                    h = "0"+i.toString();
                } else {
                    h = i;
                }

                let tick = {
                    'hour': h,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }  
        }

        for(let i = 0; i < 60; i+=5) {
            let radian = i / 30 * Math.PI;
            let min = i.toString();
            if(i < 10) {
                min = "0"+i.toString();
            }
            let tick = {
                'min': min,
                'left': this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                'top': this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }

       
    }

    setHand(x: any, y: any, roundBy5: any, draging: any) {

        let radian = Math.atan2(x, - y),
            isHours = this.showHours,
            unit = Math.PI / (isHours || roundBy5? 6 : 30),
            z = Math.sqrt(x * x + y * y),
            inner = isHours && z < (this.outerRadius + this.innerRadius) / 2,
            radius = inner ? this.innerRadius : this.outerRadius,
            value;


        if(this.showHours) {
            value = parseInt(this.selectedHours.h);
        } else {
            value = parseInt(this.selectedHours.m);
        }
            
        if(this.twelvehour) {
            radius = this.outerRadius;
        }

        if(radian < 0) {
            radian = Math.PI * 2 + radian;
        }

        value = Math.round(radian / unit);
        radian = value * unit;

        if(this.twelvehour) {
            if(isHours) {
                if(value === 0) {
                    value = 12;
                }
            } else {
                if(roundBy5) {
                    value *= 5;
                }
                if(value === 60) {
                    value = 0;
                }
            } 
        } else {
            if(isHours) {
				if(value === 12)
					value = 0;
				value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			} else {
				if(roundBy5)
					value *= 5;
				if(value === 60)
					value = 0;
			}
        }

        if(isHours)
			this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
		else {
			if(value % 5 == 0)
				this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
			else
				this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
		}

        let cx1 = Math.sin(radian) * (radius - this.tickRadius),
            cy1 = - Math.cos(radian) * (radius - this.tickRadius),
		    cx2 = Math.sin(radian) * radius,
			cy2 = - Math.cos(radian) * radius;

        this.hand.nativeElement.setAttribute('x2', cx1);
		this.hand.nativeElement.setAttribute('y2', cy1);
		this.bg.nativeElement.setAttribute('cx', cx2);
		this.bg.nativeElement.setAttribute('cy', cy2);
		this.fg.nativeElement.setAttribute('cx', cx2);
		this.fg.nativeElement.setAttribute('cy', cy2);

        if(this.showHours) {
            if(value < 10) {
                this.setHour("0"+value.toString());
            } else {
                this.setHour(value.toString());
            }          
        } else {
            if(value < 10) {
                this.setMinute("0"+value.toString());
            } else {
                this.setMinute(value.toString());
            }   
        }  
    }

    offset(obj :any) {
        var left= 0,
            top = 0;

            if(obj.offsetParent) {
                do {
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                } while(obj = obj.offsetParent);
            }
        return {left, top};
    }
} 