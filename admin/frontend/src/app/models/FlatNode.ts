import { FeatureToggle } from './FeatureToggle';
export class FlatNode extends FeatureToggle {
  expandable: boolean = false;
  name: string = '';
  level: number = 0;
}
