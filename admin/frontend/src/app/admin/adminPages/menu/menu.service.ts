import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

import { FeatureToggle } from '../../../models/FeatureToggle';
import { FeatureToggleService } from '../../../services/feature-toogle.service';
import { NotificationService } from './../../../services/notification.service';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  //#region Fields · public
  dataChange = new BehaviorSubject<FeatureToggle[]>([]);
  onSave = new BehaviorSubject<FeatureToggle | null>(null);
  onSelect = new BehaviorSubject<FeatureToggle | null>(null);
  tree: FeatureToggle[] = [];
  //#endregion Fields · public

  //#region Getters · public
  get data(): FeatureToggle[] {
    return this.dataChange.value;
  }
  get saveHandler(): FeatureToggle | null {
    return this.onSave.value;
  }
  get select(): FeatureToggle | null {
    return this.onSelect.value;
  }
  //#endregion Getters · public

  //#region Constructor
  constructor(
    private _service: FeatureToggleService,
    private _toasterService: ToastrService,
    private _notification: NotificationService
  ) {

    this.initialize();
    this.dataChange.subscribe(data => {
      this.tree = data;
    });
  }
  //#endregion Constructor

  //#region Methods · public
  addFeature(node: FeatureToggle | null) {
    this._service.save(node!, false).subscribe({
      next: result => {
        const index = this.data.findIndex(x => x.refid === node!.refid);
        this.data[index] = result;
        this.tree[index] = result;
        this.dataChange.next(this.data);
        this.onSelect.next(node);
        this._toasterService.success(
          `Feature "${node!.name}" created successfully`
        );
      },
      error: error => {
        this._toasterService.error(
          `Error creating feature "${node!.name}"`
        );
      }
    });
  }

  addNode(root: FeatureToggle) {
    this._service.save(root, true).subscribe({
      next: () => {
        this.onSelect.next(root.children![root.children!.length - 1]);
        this._toasterService.success('Feature created successfully');
      },
      error: error => {
        this._toasterService.error(JSON.stringify(error));
      }
    });
    //root.opened = true;
    this.dataChange.next(this.data);
  }

  deleteFeature(node: FeatureToggle) {
    if (node._id) {
      this._service.removeById(node._id).subscribe({
        next: () => {
          this.onSelect.next(null);
          this._toasterService.success(
            `Feature "${node.name}" removed successfully`
          );
        },
        error: error => {
          this._toasterService.error(
            `Error removing feature "${node.name}"`
          );
        }
      });
    } else {
      console.error('Feature _id is undefined, cannot remove.');
      this._toasterService.error(
        `Error removing feature "${node.name}": missing _id`
      );
    }
    this.dataChange.next(this.data);
  }

  deleteNode(root: FeatureToggle) {
    this._service.save(root, true).subscribe({
      next: () => {
        this.dataChange.next(this.data);
        this.onSelect.next(null);
        this._toasterService.success('Item removed');
      },
      error: error => {
        this._toasterService.error(JSON.stringify(error));
      }
    });
  }

  initialize() {
    setTimeout(() => {
      this._service.getAll()
        .pipe(
          map(data => {
            return data;
          })
        )
        .subscribe(data => {
          this.tree = data;
          this.onSelect.next(null);
          this.dataChange.next(this.tree);
        });
    }, 100);
  }

  save(node: FeatureToggle | null): any {
    this.onSave.next(node);
  }

  saveNode(root: FeatureToggle, node: FeatureToggle) {
    this._service.save(root, true).subscribe({
      next: () => {
        this._toasterService.success(
          `Feature "${node.name}" saved successfully`
        );
      },
      error: error => {
        this._toasterService.error(JSON.stringify(error));
      }
    });
    this.dataChange.next(this.data);
  }
  //#endregion Methods · public
}