import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../auth/account.service';

import { AuthService } from '../../../auth/AuthService';
import { Config } from 'src/app/config';


declare var window: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {



  userData: any;
    constructor(
        private _authService: AuthService, private config: Config
    ) {
      // window.__theme = 'bs4';
    }
    public disabled = false;
    public status: { isopen: boolean } = { isopen: false };

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    ngOnInit(): void {
        if (this.config.useAuthorityServer) {
            this.userData = this._authService.user.profile;
        }
        if (this.userData && !this.userData.picture) {
            this.userData.picture = 'assets/admin/img/avatars/6.jpg';
        }
    }

    logout(): void {
        this.userData = null;
        this._authService.fullLogout('admin');
    }


}


