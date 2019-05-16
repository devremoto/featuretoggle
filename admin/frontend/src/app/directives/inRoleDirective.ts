import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { AccountService } from '../auth/account.service';
import { Config } from '../config';

declare var $: any;

@Directive({
  selector: '[inRole]'
})
export class InRoleDirective implements OnInit {
  userRoles = [];
  @Input('inRole') roles: Array<string> = [];

  constructor(
    private el: ElementRef,
    private _accountService: AccountService,
    private _config: Config
  ) {
    this.setUserRoles();
  }

  ngOnInit() {
    this.checkRoles();
  }

  setUserRoles() {
    this.userRoles = [];
    const data = this._accountService.userInfo();
    if (!data) {
      return;
    }
    const role = data.role || data.roles;
    if (typeof role === 'string') {
      this.userRoles.push(this._accountService.userInfo().role);
    } else {
      this.userRoles = role;
    }
  }

  private checkRoles() {
    let i = 0;
    // this.el.nativeElement.style.display = "none";
    if (!this._config.useAuthorityServer) {
      return;
    }

    if (this.userRoles) {
      this.roles.forEach((obj, index) => {
        if (this.userRoles && this.userRoles.indexOf(this.roles[index]) >= 0) {
          i++;
          return;
        }
      });
    }
    if (i === 0) {
      const el = $(this.el.nativeElement);
      el.detach();
    }
  }
}
