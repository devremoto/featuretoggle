import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { DatePicker } from '../../../components/forms/date-picker/date-picker';
import { Environment } from '../../../models/Environment';
import { FeatureToggle } from '../../../models/FeatureToggle';
import { User } from '../../../models/User';
import { MenuComponent } from '../menu/menu.component';
import { MenuService } from '../menu/menu.service';
import { Switch } from "src/app/components/forms/switch/switch";
@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.css'],
  providers: [],
  imports: [CommonModule, MenuComponent, FormsModule, DatePicker, Switch]
})
export class FeatureToggleComponent implements OnInit {
  //#region Fields · public
  calendar = inject(NgbCalendar);
  date: { year: number; month: number; day: number } = { year: 0, month: 0, day: 0 };
  formatter = inject(NgbDateParserFormatter);
  selectedNode: FeatureToggle | null = null;
  //#endregion Fields · public

  //#region @View queries
  @ViewChild('nodeName', { static: false }) nodeName!: ElementRef;
  //#endregion @View queries

  //#region Constructor
  constructor(
    private _menuService: MenuService
  ) {
    this._menuService.onSelect.subscribe((data: FeatureToggle | null) => {
      this.selectNode(data);
    });
  }
  //#endregion Constructor

  //#region Angular lifecycle
  ngOnInit() {

  }
  //#endregion Angular lifecycle

  //#region Methods · public
  addEnvironment(environments: Environment[]) {
    environments.push(new Environment());
  }

  addUser(users: User[]) {
    users.push(new User());
  }

  fromDate(date: Date | null) {
    if (date == null) {
      date = new Date();
    }
    return new NgbDate(date!.getFullYear(), date!.getMonth() + 1, date!.getDate());
  }

  removeEnvironment(environments: Environment[], environment: Environment) {
    environments.splice(environments.indexOf(environment), 1);
  }

  removeUser(users: User[], user: User) {
    users.splice(users.indexOf(user), 1);
  }

  saveForm(nodeedit: FeatureToggle | null) {

    this._menuService.save(nodeedit);
  }

  selectNode(node: FeatureToggle | null) {
    if (node == null) {
      this.selectedNode = null;
      return;
    }
    this.selectedNode = node;
    if (!(node.expiration instanceof Date)) {
      node!.expiration = new Date(node!.expiration!);
    }
    this.date = { year: node?.expiration?.getFullYear() || 0, month: node!.expiration!.getMonth() + 1 || 0, day: node?.expiration?.getDate() || 0 };
    const timeout = setTimeout(() => {
      if (this.nodeName) {
        this.nodeName.nativeElement.select();
      }
      clearTimeout(timeout);
    }, 100);
  }

  setExpiration(node: any, $event: any) {
    if (node.expiration == null) {
      node.expiration = this.calendar.getToday();
    }
    var date = { year: node.expiration.year, month: node.expiration.month, day: node.expiration.day };
    node.expiration = new Date(`${date.year}-${date.month}-${date.day}`);
  }

  toCalendar(input: string) {
    return this.formatter.parse(input)
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    debugger;
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
  //#endregion Methods · public
}