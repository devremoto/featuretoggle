import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TreeViewComponent } from '../../../components/tree-view/tree-view.component';
import { FeatureToggle } from '../../../models/FeatureToggle';
import { MenuService } from './menu.service';
/**
 * Feature Toggle Menu Component with Custom Tree View
 * Replaces the Angular Material Tree with a simple custom tree component
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [],
  imports: [TreeViewComponent],
})
export class MenuComponent {
  //#region Fields · public
  selectedNode: FeatureToggle | null = null;
  treeData: FeatureToggle[] = [];
  //#endregion Fields · public

  //#region Constructor
  constructor(
    private database: MenuService,
    private _toasterService: ToastrService
  ) {

    database.onSave.subscribe(data => {
      if (data) {
        this.saveNode(data as FeatureToggle);
      }
    });

    database.dataChange.subscribe(data => {
      this.treeData = data;
    });
  }
  //#endregion Constructor

  //#region Methods · public
  addFeature() {
    const node = new FeatureToggle();
    node.name = `feature ${this.treeData.length + 1}`;
    if (!this.validateInsert(node)) {
      return;
    }
    this.treeData.push(node);
    this.database.addFeature(node);
  }

  addNewItem(parentNode: FeatureToggle) {
    const newNode = new FeatureToggle();
    newNode.level = (parentNode.level ?? 0) + 1;
    if (!this.validateInsert(newNode)) {
      return;
    }
    if (!parentNode.children) {
      parentNode.children = [];
    }
    newNode.name = `${parentNode.name}.${parentNode.children.length + 1}`;
    parentNode.children.push(newNode);
    parentNode.opened = true;
    const root = this.getRoot(parentNode);
    this.database.addNode(root);
  }

  containsRefId(array: FeatureToggle[], refid: string): number {
    const index = array.findIndex(x => x.refid === refid);
    return index;
  }

  deleteNode(node: FeatureToggle) {
    const parentNode = this.getParentNode(node);
    if (parentNode && parentNode.children) {
      const index = parentNode.children.findIndex(x => x.refid === node.refid);
      if (index >= 0) {
        parentNode.children.splice(index, 1);
        const root = this.getRoot(parentNode);
        this.database.deleteNode(root);
      }
    } else {

      const index = this.treeData.findIndex(x => x.refid === node.refid);
      if (index >= 0) {
        this.treeData.splice(index, 1);
        this.database.deleteFeature(node);
      }
    }
  }

  findNodeByName(nodes: FeatureToggle[], name: string): FeatureToggle | null {
    for (const node of nodes) {
      if (node.name === name) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeByName(node.children, name);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  getParentNode(targetNode: FeatureToggle): FeatureToggle | null {
    return this.findParentInNodes(this.treeData, targetNode);
  }

  getRoot(node: FeatureToggle): FeatureToggle {
    let search = this.getParentNode(node);
    let root = this.getParentNode(node);
    while (search) {
      search = this.getParentNode(search);
      if (search) {
        root = search;
      }
    }
    return root || node;
  }

  saveNode(node: FeatureToggle) {
    if (!this.validateSave(node)) {
      return;
    }
    if (this.selectedNode) {
      const parentNode = this.getParentNode(node);
      if (parentNode) {
        const index = this.containsRefId(parentNode.children ?? [], node.refid ?? '');
        if (index >= 0) {
          if (parentNode.children) {
            parentNode.children[index] = node;
          }
          const root = this.getRoot(parentNode);
          this.database.saveNode(root, node);
          this.selectNode(node);
        }
      } else {
        const index = this.containsRefId(this.treeData, node.refid ?? '');
        if (index >= 0) {
          this.treeData[index] = node;
          this.database.saveNode(node, node);
          this.selectNode(node);
        }
      }
    }
  }

  selectNode(node: FeatureToggle) {
    this.selectedNode = { ...node };
    this.database.onSelect.next(this.selectedNode);
  }

  validateInsert(node: FeatureToggle): boolean {
    let msg;
    if (this.findNodeByName(this.treeData, node.name)) {
      msg = `Already exists a feature called "${node.name}"`;
    }
    if (msg) {
      this._toasterService.error(msg, 'Error');
      return false;
    }
    return true;
  }

  validateSave(node: FeatureToggle): boolean {
    let msg;
    const existingNode = this.findNodeByName(this.treeData, node.name);
    if (existingNode && existingNode.refid !== node.refid) {
      msg = `Already exists a feature called "${node.name}"`;
    }
    if (msg) {
      this._toasterService.error(msg, 'Error');
      return false;
    }
    return true;
  }
  //#endregion Methods · public

  //#region Methods · private
  private findParentInNodes(nodes: FeatureToggle[], targetNode: FeatureToggle): FeatureToggle | null {
    for (const node of nodes) {
      if (node.children) {

        if (node.children.some(child => child.refid === targetNode.refid)) {
          return node;
        }

        const found = this.findParentInNodes(node.children, targetNode);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
  //#endregion Methods · private
}