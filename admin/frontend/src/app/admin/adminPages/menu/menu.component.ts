import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  standalone: false,
  animations: [],
})
export class MenuComponent {
  /** Tree data source */
  treeData: FeatureToggle[] = [];

  /** Currently selected node */
  selectedNode: FeatureToggle | null = null;

  constructor(
    private database: MenuService,
    private _toasterService: ToastrService
  ) {
    // Subscribe to save events
    database.onSave.subscribe(data => {
      if (data) {
        this.saveNode(data as FeatureToggle);
      }
    });

    // Subscribe to data changes
    database.dataChange.subscribe(data => {
      this.treeData = data;
    });
  }

  addFeature() {
    const node = new FeatureToggle();
    node.name = `feature ${this.treeData.length + 1}`;
    if (!this.validateInsert(node)) {
      return;
    }
    this.treeData.push(node);
    this.database.addFeature(node);
  }

  /** Add a new child node to the specified parent */
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

  /** Save the node to database */
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
        }
      } else {
        const index = this.containsRefId(this.treeData, node.refid ?? '');
        if (index >= 0) {
          this.treeData[index] = node;
          this.database.saveNode(node, node);
        }
      }
    }
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
      // Root level node
      const index = this.treeData.findIndex(x => x.refid === node.refid);
      if (index >= 0) {
        this.treeData.splice(index, 1);
        this.database.deleteFeature(node);
      }
    }
  }

  selectNode(node: FeatureToggle) {
    this.selectedNode = { ...node };
    this.database.onSelect.next(this.selectedNode);
  }

  /**
   * Find a node by name in the tree (recursive search)
   */
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

  /**
   * Find the parent node of a specific node
   */
  getParentNode(targetNode: FeatureToggle): FeatureToggle | null {
    return this.findParentInNodes(this.treeData, targetNode);
  }

  private findParentInNodes(nodes: FeatureToggle[], targetNode: FeatureToggle): FeatureToggle | null {
    for (const node of nodes) {
      if (node.children) {
        // Check if targetNode is a direct child
        if (node.children.some(child => child.refid === targetNode.refid)) {
          return node;
        }
        // Recursively search in children
        const found = this.findParentInNodes(node.children, targetNode);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  /**
   * Get the root element of a specific node
   */
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
}
