import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Breadcrumb } from '../../models/Breadcrumb';
import { BreadcrumbsService } from './breadcrumbs.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: '[app-breadcrumbs]',
    templateUrl: './breadcrumb.component.html',
    imports: [NgClass, RouterLink]
})
export class BreadcrumbsComponent implements OnInit {

  @Input() public fixed: boolean = false;
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
    public service: BreadcrumbsService,
    public el: ElementRef) { }

  public ngOnInit(): void {
    this.isFixed(this.fixed);
    this.service.breadcrumbs.subscribe((crumbs: Breadcrumb[]) => {
      this.breadcrumbs = crumbs;
    });
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) { document.querySelector('body')!.classList.add('breadcrumb-fixed'); }
  }
}
