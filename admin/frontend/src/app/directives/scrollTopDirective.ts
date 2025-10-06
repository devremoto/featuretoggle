import { Directive, ElementRef, HostListener, Input, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Directive({
    selector: '[scroll-top]',
    standalone: false
})
export class ScrollTopDirective implements AfterViewInit {
    @Input('scroll-top') to?: string;
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        $(this.el.nativeElement).click(() => {
            if (this.to) {
                $('#' + this.to).animate({ scrollTop: 0 }, 600);
            } else {
                $('html, body').animate({ scrollTop: 0 }, 600);
            }
            return false;
        });
    }
}
