import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
} from '@angular/core';

// TODO(josephperrott): Benchpress tests.
// TODO(josephperrott): Add ARIA attributes for progressbar "for".


/**
 * <md-progress-bar> component.
 */
@Component({
  selector: 'md-progress-bar, mat-progress-bar',
  host: {
    'role': 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[class.mat-primary]': 'color == "primary"',
    '[class.mat-accent]': 'color == "accent"',
    '[class.mat-warn]': 'color == "warn"',
    '[class.mat-progress-bar]': 'true',
  },
  template: `<!-- The background div is named as such because it appears below the other divs and is not sized based on values. -->
    <div class="mat-progress-bar-background mat-progress-bar-element"></div>
    <div class="mat-progress-bar-buffer mat-progress-bar-element" [ngStyle]="_bufferTransform()"></div>
    <div class="mat-progress-bar-primary mat-progress-bar-fill mat-progress-bar-element" [ngStyle]="_primaryTransform()"></div>
    <div class="mat-progress-bar-secondary mat-progress-bar-fill mat-progress-bar-element"></div>
  `,
  styles: [`
    :host {
      display:block;
      height:5px;
      overflow:hidden;
      position:relative;
      transform:translateZ(0);
      transition:opacity 250ms linear;
      width:100%;
    }
    :host .mat-progress-bar-element,:host .mat-progress-bar-fill::after {
      height:100%;
      position:absolute;
      width:100%;
    }
    :host .mat-progress-bar-background {
      background-repeat:repeat-x;
      background-size:10px 4px;
      display:none;
    }
    :host .mat-progress-bar-buffer {
      transform-origin:top left;
      transition:transform 250ms ease,stroke .3s cubic-bezier(.35,0,.25,1);
    }
    :host .mat-progress-bar-secondary {
      display:none;
    } 
    :host .mat-progress-bar-fill {
      animation:none;
      transform-origin:top left;
      transition:transform 250ms ease,stroke .3s cubic-bezier(.35,0,.25,1);
    }
    :host .mat-progress-bar-fill::after {
      animation:none;
      content:'';
      display:inline-block;
      left:0;
    }
    :host[mode=query] {
      transform:rotateZ(180deg);
    }
    :host[mode=indeterminate] .mat-progress-bar-fill,:host[mode=query] .mat-progress-bar-fill {
      transition:none;
    }
    :host[mode=indeterminate] .mat-progress-bar-primary,:host[mode=query] .mat-progress-bar-primary {
      animation:mat-progress-bar-primary-indeterminate-translate 2s infinite linear;
      left:-145.166611%;
    }
    :host[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after,:host[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after {
      animation:mat-progress-bar-primary-indeterminate-scale 2s infinite linear;
    }
    :host[mode=indeterminate] .mat-progress-bar-secondary,:host[mode=query] .mat-progress-bar-secondary {
      animation:mat-progress-bar-secondary-indeterminate-translate 2s infinite linear;
      left:-54.888891%;
      display:block;
    }
    :host[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after,:host[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after {
      animation:mat-progress-bar-secondary-indeterminate-scale 2s infinite linear;
    }
    :host[mode=buffer] .mat-progress-bar-background {
      animation:mat-progress-bar-background-scroll 250ms infinite linear;
      display:block;
    }
    :host-context([dir=rtl]) {
      transform:rotateY(180deg);
    }
    @keyframes mat-progress-bar-primary-indeterminate-translate {
      0% {
        transform:translateX(0);
      }
      20% {
        animation-timing-function:cubic-bezier(.5,0,.70173,.49582);
        transform:translateX(0);
      }
      59.15% {
        animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);
        transform:translateX(83.67142%);
      }
      100% {
        transform:translateX(200.61106%);
      }
    }
    @keyframes mat-progress-bar-primary-indeterminate-scale {
      0% {
        transform:scaleX(.08);
      }
      36.65% {
        animation-timing-function:cubic-bezier(.33473,.12482,.78584,1);
        transform:scaleX(.08);
      }
      69.15% {
        animation-timing-function:cubic-bezier(.06,.11,.6,1);
        transform:scaleX(.66148);
      } 
      100% {
        transform:scaleX(.08);
      }
    }
    @keyframes mat-progress-bar-secondary-indeterminate-translate {
      0% {
        animation-timing-function:cubic-bezier(.15,0,.51506,.40969);
        transform:translateX(0);
      }
      25% {
        animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);
        transform:translateX(37.65191%);
      }
      48.35% {
        animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);
        transform:translateX(84.38617%);
      }
      100% {
        transform:translateX(160.27778%);
      }
    }
    @keyframes mat-progress-bar-secondary-indeterminate-scale {
      0% {
        animation-timing-function:cubic-bezier(.15,0,.51506,.40969);
        transform:scaleX(.08);
      }
      19.15% {
        animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);
        transform:scaleX(.4571)
      } 
      44.15% {
        animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);
        transform:scaleX(.72796);
      }
      100% {
        transform:scaleX(.08);
      }
    }
    @keyframes mat-progress-bar-background-scroll {
      to {
        transform:translateX(-10px)
      }
    }  
    `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdProgressBar {
  /** Color of the progress bar. */
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  private _value: number = 0;

  /** Value of the progressbar. Defaults to zero. Mirrored to aria-valuenow. */
  @Input()
  @HostBinding('attr.aria-valuenow')
  get value() { return this._value; }
  set value(v: number) { this._value = clamp(v || 0); }

  private _bufferValue: number = 0;

  /** Buffer value of the progress bar. Defaults to zero. */
  @Input()
  get bufferValue() { return this._bufferValue; }
  set bufferValue(v: number) { this._bufferValue = clamp(v || 0); }

  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  @Input()
  @HostBinding('attr.mode')
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

  /** Gets the current transform value for the progress bar's primary indicator. */
  _primaryTransform() {
    let scale = this.value / 100;
    return {transform: `scaleX(${scale})`};
  }

  /**
   * Gets the current transform value for the progress bar's buffer indicator.  Only used if the
   * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
   */
  _bufferTransform() {
    if (this.mode == 'buffer') {
      let scale = this.bufferValue / 100;
      return {transform: `scaleX(${scale})`};
    }
  }
}

/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}