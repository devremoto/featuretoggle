import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: '[app-breadcrumbs]',
  template:
    `
    <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs | async" let-last = last>
      <li class="breadcrumb-item"
          *ngIf="breadcrumb.label.title && (breadcrumb.url.slice(-1) == '/' || last)"
          [ngClass]="{active: last}">
        <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
        <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
      </li>
      <ng-content></ng-content>
    </ng-template>`
})
export class BreadcrumbsComponent implements OnInit {

  @Input() fixed: boolean;
  public breadcrumbs;

  constructor(
    public service: BreadcrumbsService,
    public el: ElementRef) { }

  public ngOnInit(): void {
    this.isFixed(this.fixed);
    this.breadcrumbs = this.service.breadcrumbs;
  }

  isFixed(fixed: boolean): void {
    if (this.fixed) { document.querySelector('body').classList.add('breadcrumb-fixed'); }
  }
}
