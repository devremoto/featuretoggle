import { Directive, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
declare var ProgressBar: any;
declare var $: any;

@Directive({
  selector: '[appProgressCircle]'
})
export class ProgressCircleDirective implements OnInit, AfterViewInit {
  @Input('appProgressCircle') options: any = {
    progressbar: 'circle',
    color: '#fff',
    trailColor: '#fff',
    to: { 'color': '#ffd200', 'width': 3 },
    from: { 'color': '#3498db', 'width': 3 },

    value: 1,
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: false
    },
    step: function (state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      const value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value + '%');
      }
    }
  };
  constructor(private el: ElementRef) {

  }
  ngOnInit() {
    // this.animate();
  }

  ngAfterViewInit() {
    this.animate();
  }


  animate() {
    const options = this.options;
    $(this.el.nativeElement).each(function (key, obj) {
      const bar = new ProgressBar.Circle(obj, options);
      bar.animate(options.value);
    });
  }
}
