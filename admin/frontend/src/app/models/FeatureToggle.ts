import { Guid } from 'guid-typescript';

import { Environment } from './Environment';
import { User } from './User';

export class FeatureToggle {
  _id?: string;
  refid?: string;
  name: string;
  enabled: boolean;
  expiration: Date | null = null;
  environments: Environment[];
  users: User[];
  children: FeatureToggle[];
  tempName?: string;
  level: number = 0;
  opened: boolean = false;
  constructor() {
    this.name = 'new item';
    this.enabled = true;
    this.users = [];
    this.environments = [];
    this.children = [];
    this.refid = Guid.create().toString();
  }
}
