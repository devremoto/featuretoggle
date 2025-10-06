import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: '[app-breadcrumbs]',
  standalone: false,
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbsComponent implements OnInit {

  @Input() fixed: boolean = false;
  public breadcrumbs: Object[] = [];

  constructor(
    public service: BreadcrumbsService,
    public el: ElementRef) { }

  public ngOnInit(): void {
    this.isFixed(this.fixed);
    this.service.breadcrumbs.subscribe((crumbs: Object[]) => {
      this.breadcrumbs = crumbs;
    });
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) { document.querySelector('body')!.classList.add('breadcrumb-fixed'); }
  }
}
