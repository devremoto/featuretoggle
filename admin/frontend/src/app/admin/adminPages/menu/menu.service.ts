import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { BehaviorSubject } from 'rxjs';

import { FeatureToggle } from '../../../models/FeatureToggle';
import { FeatureToggleService } from '../../../services/feature-toogle.service';
import { NotificationService } from './../../../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dataChange = new BehaviorSubject<FeatureToggle[]>([]);
  tree: FeatureToggle[];
  get data(): FeatureToggle[] {
    return this.dataChange.value;
  }
  onSelect = new BehaviorSubject<FeatureToggle>(<FeatureToggle>{});
  get select(): FeatureToggle {
    return this.onSelect.value;
  }
  onSave = new BehaviorSubject<FeatureToggle>(<FeatureToggle>{});
  get saveHandler(): FeatureToggle {
    return this.onSave.value;
  }

  constructor(
    private _service: FeatureToggleService,
    private _toasterService: ToasterService,
    private _notification: NotificationService
  ) {
    this.initialize();
    this.dataChange.subscribe(data => {
      this.tree = data;
    });
    this._notification.on('update').subscribe(result => {
      this.initialize();
    });
  }

  initialize() {
    this._service.getAll().subscribe(data => {
      this.tree = data;
      this.onSelect.next(null);
      this.dataChange.next(this.tree);
    });
  }

  save(node: FeatureToggle): any {
    this.onSave.next(node);
  }

  addFeature(node: FeatureToggle) {
    this._service.save(node, false).subscribe(
      result => {
        const index = this.data.findIndex(x => x.refid === node.refid);
        this.data[index] = result;
        this.tree[index] = result;
        this.dataChange.next(this.data);
        this.onSelect.next(null);
        this._toasterService.pop(
          'success',
          `Feature "${node.name}" created successfully`
        );
      },
      error => {
        console.log(error);
        this._toasterService.pop(
          'error',
          `Error creating feature "${node.name}"`
        );
      }
    );
    //
  }

  deleteFeature(node: FeatureToggle) {
    this._service.removeById(node._id).subscribe(
      result => {
        this.onSelect.next(null);
        this._toasterService.pop(
          'success',
          `Feature "${node.name}" removed successfully`
        );
      },
      error => {
        console.log(error);
        this._toasterService.pop(
          'error',
          `Error removing feature "${node.name}"`
        );
      }
    );
    this.dataChange.next(this.data);
  }

  addNode(root: FeatureToggle) {
    this._service.save(root, true).subscribe(
      result => {
        this.onSelect.next(null);
        this._toasterService.pop('success', `Feature created successfully`);
      },
      error => {
        this._toasterService.pop('error', JSON.stringify(error));
      }
    );
    this.dataChange.next(this.data);
  }

  saveNode(root: FeatureToggle, node: FeatureToggle) {
    this._service.save(root, true).subscribe(
      result => {
        this._toasterService.pop(
          'success',
          `Feature "${node.name}" saved successfully`
        );
      },
      error => {
        this._toasterService.pop('error', JSON.stringify(error));
      }
    );
    this.dataChange.next(this.data);
  }

  deleteNode(root: FeatureToggle) {
    this._service.save(root, true).subscribe(
      result => {
        this.dataChange.next(this.data);
        this.onSelect.next(null);
        this._toasterService.pop('success', 'Item removed');
      },
      error => {
        this._toasterService.pop('error', JSON.stringify(error));
      }
    );
  }
}
