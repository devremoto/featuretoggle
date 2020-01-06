import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Environment } from '../../../models/Environment';
import { FeatureToggle } from '../../../models/FeatureToggle';
import { User } from '../../../models/User';
import { MenuService } from '../menu/menu.service';
import { NotificationService } from './../../../services/notification.service';

@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.css']
})
export class FeatureToggleComponent implements OnInit {
  selectedNode: FeatureToggle;
  @ViewChild('nodeName') nodeName: ElementRef;

  init() {
    this._notification.on('update').subscribe(result => {
      console.log(result);
    });
  }

  constructor(
    private _menuService: MenuService,
    private _notification: NotificationService
  ) {
    this._menuService.onSelect.subscribe(data => {
      this.selectNode(data);
    });
  }
  /**
   * Method called when the component starts
   */
  ngOnInit() {
    this.init();
  }

  saveForm(nodeedit: FeatureToggle) {
    this._menuService.save(nodeedit);
  }

  /**
   * It selects a node to be presented on the html form
   * @param node node to be edited
   */
  selectNode(node: FeatureToggle) {
    this.selectedNode = node;
    if (this.nodeName) {
      this.nodeName.nativeElement.select();
    }
  }

  /**
   *
   * @param users It adds a user into node users array
   */
  addUser(users: User[]) {
    users.push(new User());
  }

  /**
   * It removes a user form uses array
   * @param users
   * @param user
   */
  removeUser(users: User[], user: User) {
    users.splice(users.indexOf(user), 1);
  }

  /**
   *
   * @param environments
   */
  addEnvironment(environments: Environment[]) {
    environments.push(new Environment());
  }

  removeEnvironment(environments: Environment[], environment: Environment) {
    environments.splice(environments.indexOf(environment), 1);
  }
}
