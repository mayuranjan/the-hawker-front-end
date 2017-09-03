import { OnInit, Directive, ElementRef, Renderer, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[charCounter]'
})


export class charCounter implements OnInit {
    

    @Input() public maxChar: number = 20;
    public textContainer: any;

    constructor(private _elRef: ElementRef, private _renderer: Renderer) {}

    ngOnInit() {
        // Inititalise a new <span> element for the count display and render it below the host component.
        this.textContainer =  this._renderer.createElement(this._elRef.nativeElement.parentElement, 'p');
        this._renderer.setElementClass(this.textContainer, "chars", true);
        this.textContainer.innerHTML = "0/" + this.maxChar;
        this._renderer.setElementStyle(this.textContainer, "display", "none");
    }


    @HostListener('keyup', ['$event']) onKeyUp() {
       this.textContainer.innerHTML = this._elRef.nativeElement.value.length + "/" + this.maxChar;

       if(this._elRef.nativeElement.value.length > this.maxChar) {
           this._renderer.setElementClass(this._elRef.nativeElement, "invalid", true);
       } else {
            this._renderer.setElementClass(this._elRef.nativeElement, "invalid", false);
       }
    }

    @HostListener('blur', ['$event']) hide() {
        this._renderer.setElementStyle(this.textContainer, "display", "none");
    }

    @HostListener('focus', ['$event']) show() {
        this._renderer.setElementStyle(this.textContainer, "display", "block");
    }
    
}