import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeatureToggle } from '../../models/FeatureToggle';

@Component({
    selector: 'app-tree-view',
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.css'],
    standalone: false
})
export class TreeViewComponent {
    @Input() data: FeatureToggle[] = [];
    @Input() level: number = 0;

    @Output() nodeSelected = new EventEmitter<FeatureToggle>();
    @Output() nodeDeleted = new EventEmitter<FeatureToggle>();
    @Output() nodeAdded = new EventEmitter<FeatureToggle>();

    expandedNodes: Set<string> = new Set();

    isExpanded(node: FeatureToggle): boolean {
        return node.opened;
    }

    toggleNode(node: FeatureToggle): void {
        node.opened = !node.opened;
    }

    hasChildren(node: FeatureToggle): boolean {
        return !!(node.children && node.children.length > 0);
    }

    onSelectNode(node: FeatureToggle): void {
        this.nodeSelected.emit(node);
    }

    onDeleteNode(node: FeatureToggle): void {
        this.nodeDeleted.emit(node);
    }

    onAddNode(node: FeatureToggle): void {
        this.nodeAdded.emit(node);
    }

    getPaddingLeft(): string {
        return (this.level + 10) + 'px';
    }
}