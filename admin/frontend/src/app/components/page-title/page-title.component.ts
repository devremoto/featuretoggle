import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.css'],
    imports: [BreadcrumbsComponent]
})
export class PageTitleComponent implements OnInit {
    @Input() title: string = '';
    @Input() description: string = '';

    constructor() { }

    ngOnInit() {
    }

}
