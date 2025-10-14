import { Directive, ElementRef, HostListener, Input, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Directive({ selector: '[replace]' })
export class ReplaceDirective implements AfterViewInit {
    userRoles = ['operator'];

    constructor(private el: ElementRef) {

    }

    ngAfterViewInit() {
        this.performReplace();
    }

    private performReplace() {

        const el = $(this.el.nativeElement);
        const parent = $(el[0].parentElement);
        const inner = el.html();
        el.detach();
        parent.append(inner);
    }
}
