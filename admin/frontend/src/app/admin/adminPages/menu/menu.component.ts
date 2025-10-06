import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';

import { FeatureToggle } from '../../../models/FeatureToggle';
import { FlatNode } from '../../../models/FlatNode';
import { MenuService } from './menu.service';

/**
 * The component used here is the Tree From Angular Materisl
 * In order to get more info, go to:
 * https://material.angular.io/components/tree/
 */

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false
})
export class MenuComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode, FeatureToggle>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FeatureToggle, FlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FlatNode | null = null;

  /** The new item's name */
  newItemName = 'sdfsdf';

  treeControl: FlatTreeControl<FlatNode>;

  treeFlattener: MatTreeFlattener<FeatureToggle, FlatNode>;

  dataSource: MatTreeFlatDataSource<FeatureToggle, FlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);
  selectedNode: any;

  constructor(
    private database: MenuService,
    private _toasterService: ToastrService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    database.onSave.subscribe(data => {
      this.saveNode(<FlatNode>data);
    });
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: FeatureToggle): FeatureToggle[] => node.children ?? [];

  hasChild(_: number, _nodeData: FlatNode) {
    return _nodeData.children && _nodeData.children.length;
  }

  hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FeatureToggle, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : new FlatNode();
    if (node._id) {
      flatNode._id = node._id;
    }
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.refid = node.refid;
    flatNode.children = node.children;
    flatNode.environments = node.environments;
    flatNode.users = node.users;
    flatNode.enabled = node.enabled;
    flatNode.tempName = node.name;
    flatNode.expandable = !!(node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }
    const startIndex =
      this.treeControl.dataNodes.findIndex(x => x.refid === node.refid) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  addFeature() {
    const node = new FeatureToggle();
    node.name = `feature ${this.dataSource.data.length + 1}`;
    if (!this.validateInsert(node)) {
      return;
    }
    this.dataSource.data.push(<FlatNode>node);
    this.database.addFeature(node);
    this.treeControl.expand(<FlatNode>node);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: FlatNode) {
    const newNode = new FeatureToggle();
    if (!this.validateInsert(newNode)) {
      return;
    }
    if (!node.children) {
      node.children = [];
    }
    newNode.name = `${node.name}.${node.children.length + 1}`;
    newNode.level = node.level + 1;
    node.children.push(newNode);
    const root = this.getRoot(node);
    this.database.addNode(root);
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: FlatNode) {
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
        const index = this.containsRefId(this.dataSource.data, node.refid ?? '');
        if (index >= 0) {
          this.dataSource.data[index] = node;
          this.database.saveNode(node, node);
        }
      }
    }
  }
  validateInsert(node: FeatureToggle) {
    let msg;
    if (this.treeControl.dataNodes.find(x => x.name === node.name)) {
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
    if (
      this.treeControl &&
      this.treeControl.dataNodes &&
      this.treeControl.dataNodes.find(
        x => x.name === node.name && x.refid !== node.refid
      )
    ) {
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
  deleteNode(node: FlatNode) {
    if (node.level === 0) {
      const index = this.dataSource.data.findIndex(x => x.refid === node.refid);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
        this.database.deleteFeature(node);
        this.treeControl.expand(node);
      }
    } else {
      const parentNode = this.getParentNode(node);
      if (parentNode && parentNode.children) {
        const index = parentNode.children.findIndex(x => x.refid === node.refid);
        if (index >= 0) {
          parentNode.children.splice(index, 1);
          const root = this.getRoot(parentNode);
          this.database.deleteNode(root);
          this.treeControl.expand(parentNode);
        }
      }
    }
  }

  selectNode(node: FlatNode) {
    this.selectedNode = { ...node };
    this.database.onSelect.next(this.selectedNode);
  }

  /**
   * It gets the root element of a specific node
   * @param node
   */
  getRoot(node: FeatureToggle): FeatureToggle {
    let search = this.getParent(node);
    let root = this.getParent(node);
    while (search) {
      search = this.getParent(search);
      if (search) {
        root = search;
      }
    }
    return root || node;
  }

  /**
   * It gets respective parent of the specific node
   * @param node current node
   */
  getParent(node: FeatureToggle) {
    return this.getParentNode(<FlatNode>node);
  }
}
