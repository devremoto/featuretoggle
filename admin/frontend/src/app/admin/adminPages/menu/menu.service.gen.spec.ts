import { TestBed } from '@angular/core/testing';
import { ToasterService } from 'angular2-toaster';

import { FeatureToggle } from '../../../models/FeatureToggle';
import { FeatureToggleService } from '../../../services/feature-toogle.service';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  beforeEach(() => {
    const toasterServiceStub = { pop: () => ({}) };
    const featureToggleStub = { refid: '{}', name: '{}', _id: '{}' };
    const featureToggleServiceStub = {
      getAll: () => ({ subscribe: () => ({}) }),
      save: () => ({ subscribe: () => ({}) }),
      removeById: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: ToasterService, useValue: toasterServiceStub },
        { provide: FeatureToggle, useValue: featureToggleStub },
        { provide: FeatureToggleService, useValue: featureToggleServiceStub }
      ]
    });
    spyOn(MenuService.prototype, 'initialize');
    service = TestBed.get(MenuService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('addFeature', () => {
    it('makes expected calls', () => {
      const toasterServiceStub: ToasterService = TestBed.get(ToasterService);
      const featureToggleStub = {
        refid: '{}',
        name: '{}',
        _id: '{}',
        enabled: true,
        expiration: new Date(),
        level: 0
      };
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(toasterServiceStub, 'pop');
      spyOn(featureToggleServiceStub, 'save');
      service.addFeature(featureToggleStub);
      expect(toasterServiceStub.pop).toHaveBeenCalled();
      expect(featureToggleServiceStub.save).toHaveBeenCalled();
    });
  });
  describe('deleteFeature', () => {
    it('makes expected calls', () => {
      const toasterServiceStub: ToasterService = TestBed.get(ToasterService);
      const featureToggleStub = {
        refid: '{}',
        name: '{}',
        _id: '{}',
        enabled: true,
        expiration: new Date(),
        level: 0
      };
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(toasterServiceStub, 'pop');
      spyOn(featureToggleServiceStub, 'removeById');
      service.deleteFeature(featureToggleStub);
      expect(toasterServiceStub.pop).toHaveBeenCalled();
      expect(featureToggleServiceStub.removeById).toHaveBeenCalled();
    });
  });
  describe('addNode', () => {
    it('makes expected calls', () => {
      const toasterServiceStub: ToasterService = TestBed.get(ToasterService);
      const featureToggleStub: FeatureToggle = TestBed.get(FeatureToggle);
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(toasterServiceStub, 'pop');
      spyOn(featureToggleServiceStub, 'save');
      service.addNode(featureToggleStub);
      expect(toasterServiceStub.pop).toHaveBeenCalled();
      expect(featureToggleServiceStub.save).toHaveBeenCalled();
    });
  });
  describe('saveNode', () => {
    it('makes expected calls', () => {
      const toasterServiceStub: ToasterService = TestBed.get(ToasterService);
      const featureToggleStub = {
        refid: '{}',
        name: '{}',
        _id: '{}',
        enabled: true,
        expiration: new Date(),
        level: 0
      };
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(toasterServiceStub, 'pop');
      spyOn(featureToggleServiceStub, 'save');
      service.saveNode(featureToggleStub, featureToggleStub);
      expect(toasterServiceStub.pop).toHaveBeenCalled();
      expect(featureToggleServiceStub.save).toHaveBeenCalled();
    });
  });
  describe('deleteNode', () => {
    it('makes expected calls', () => {
      const toasterServiceStub: ToasterService = TestBed.get(ToasterService);
      const featureToggleStub: FeatureToggle = TestBed.get(FeatureToggle);
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(toasterServiceStub, 'pop');
      spyOn(featureToggleServiceStub, 'save');
      service.deleteNode(featureToggleStub);
      expect(toasterServiceStub.pop).toHaveBeenCalled();
      expect(featureToggleServiceStub.save).toHaveBeenCalled();
    });
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(MenuService.prototype.initialize).toHaveBeenCalled();
    });
  });
  describe('initialize', () => {
    it('makes expected calls', () => {
      const featureToggleServiceStub: FeatureToggleService = TestBed.get(
        FeatureToggleService
      );
      spyOn(featureToggleServiceStub, 'getAll');
      (<jasmine.Spy>service.initialize).and.callThrough();
      service.initialize();
      expect(featureToggleServiceStub.getAll).toHaveBeenCalled();
    });
  });
});
