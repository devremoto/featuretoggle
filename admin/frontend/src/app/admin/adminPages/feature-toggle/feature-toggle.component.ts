import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';

import { Environment } from '../../../models/Environment';
import { FeatureToggle } from '../../../models/FeatureToggle';
import { User } from '../../../models/User';
import { MenuService } from '../menu/menu.service';
import { NotificationService } from './../../../services/notification.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.css'],
  providers: [],
  standalone: false
})
export class FeatureToggleComponent implements OnInit {
  toCalendar(input: string) {
    return this.formatter.parse(input)
  }

  fromDate(date: Date | null) {
    if (date == null) {
      date = new Date();
    }
    return new NgbDate(date!.getFullYear(), date!.getMonth() + 1, date!.getDate());
  }
  formatter = inject(NgbDateParserFormatter);
  calendar = inject(NgbCalendar);
  selectedNode: FeatureToggle | null = null;
  @ViewChild('nodeName', { static: false }) nodeName!: ElementRef;
  date: { year: number; month: number; day: number } = { year: 0, month: 0, day: 0 };

  init() {
    this._notification.on('list').subscribe(result => {
      console.log(result);
    });
  }

  constructor(
    private _menuService: MenuService,
    private _notification: NotificationService
  ) {
    this._menuService.onSelect.subscribe((data: FeatureToggle | null) => {
      this.selectNode(data);
    });
    this.init();
  }
  /**
   * Method called when the component starts
   */
  ngOnInit() {
    // this.init();
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    debugger;
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  saveForm(nodeedit: FeatureToggle | null) {
    //nodeedit!.expiration = new Date(`${this.date.year}-${this.date.month}-${this.date.day}`);
    this._menuService.save(nodeedit);
  }

  /**
   * It selects a node to be presented on the html form
   * @param node node to be edited
   */
  selectNode(node: FeatureToggle | null) {
    if (node == null) {
      this.selectedNode = null;
      return;
    }
    this.selectedNode = node;
    if (node?.expiration == null) {
      node!.expiration = new Date();
    }
    if (!(node.expiration instanceof Date)) {
      node!.expiration = new Date(node?.expiration);
    }
    this.date = { year: node?.expiration?.getFullYear() || 0, month: node!.expiration!.getMonth() + 1 || 0, day: node?.expiration?.getDate() || 0 };
    const timeout = setTimeout(() => {
      if (this.nodeName) {
        this.nodeName.nativeElement.select();
      }
      clearTimeout(timeout);
    }, 100);
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

  setExpiration(node: any, $event: any) {
    if (node.expiration == null) {
      node.expiration = this.calendar.getToday();
    }
    var date = { year: node.expiration.year, month: node.expiration.month, day: node.expiration.day };
    node.expiration = new Date(`${date.year}-${date.month}-${date.day}`);
  }
}
