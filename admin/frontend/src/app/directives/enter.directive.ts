import { Directive, ElementRef } from '@angular/core';
declare var window: any;
@Directive({
  selector: '[appEnter]'
})
export class EnterDirective {

  constructor(private el: ElementRef) {
    this.init();
   }

  init() {
    // Get the input field
    const input = this.el.nativeElement;

    // Execute a function when the user releases a key on the keyboard
    window.addEventListener('keyup', function (event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        input.click();
      }
    });
  }

}
