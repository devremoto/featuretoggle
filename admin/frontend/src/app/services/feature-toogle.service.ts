import { Injectable } from '@angular/core';
import { FeatureToggle } from '../models/FeatureToggle';
import { HttpService } from './HttpService';
import { BaseService } from './BaseService';


@Injectable({providedIn: 'root'})
export class FeatureToggleService extends BaseService<FeatureToggle> {

    constructor(protected _http: HttpService) {
      super(_http);
      this._controller = 'featureToggles';
    }


}
