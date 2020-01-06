import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureToggleComponent } from './feature-toggle.component';

describe('FeatureToggleComponent', () => {
  let component: FeatureToggleComponent;
  let fixture: ComponentFixture<FeatureToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
