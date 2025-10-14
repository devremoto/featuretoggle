import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePicker } from './date-picker';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

describe('DatePicker', () => {
  let component: DatePicker;
  let fixture: ComponentFixture<DatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.allowClear).toBe(false);
    expect(component.autoClose).toBe(true);
    expect(component.firstDayOfWeek).toBe(1);
    expect(component.format).toBe('yyyy-MM-dd');
    expect(component.label).toBe('');
    expect(component.lang).toBe('en');
    expect(component.placeholder).toBe('Select a date');
    expect(component.showWeekNumbers).toBe(false);
  });

  it('should clear date when clearDate is called', () => {
    spyOn(component.dateChange, 'emit');
    component.selectedDate = { year: 2024, month: 6, day: 1 };
    component.clearDate();
    expect(component.selectedDate).toBeNull();
    expect(component.dateChange.emit).toHaveBeenCalledWith(null);
  });

  it('should update language on ngOnInit and ngOnChanges', () => {
    component.lang = 'fr';
    component.ngOnInit();
    expect(component['i18nService'].language).toBe('fr');
    component.lang = 'en';
    component.ngOnChanges({ lang: { currentValue: 'en', previousValue: 'fr', firstChange: false, isFirstChange: () => false } });
    expect(component['i18nService'].language).toBe('en');
  });

  it('should emit dateChange and call onChange on onDateSelect', () => {
    spyOn(component.dateChange, 'emit');
    const date = { year: 2024, month: 6, day: 1 } as NgbDate;
    const onChangeSpy = spyOn<any>(component, 'onChange');
    component.onDateSelect(date);
    expect(component.selectedDate).toEqual(date);
    expect(component.dateChange.emit).toHaveBeenCalledWith(date);
    expect(onChangeSpy).toHaveBeenCalledWith('2024-06-01');
  });

  it('should emit null if onDateSelect is called with null', () => {
    spyOn(component.dateChange, 'emit');
    const onChangeSpy = spyOn<any>(component, 'onChange');
    component.onDateSelect(null);
    expect(component.selectedDate).toBeNull();
    expect(component.dateChange.emit).toHaveBeenCalledWith(null);
    expect(onChangeSpy).toHaveBeenCalledWith(null);
  });

  it('should register onChange and emit selectedDate', () => {
    const fn = jasmine.createSpy('onChange');
    spyOn(component.dateChange, 'emit');
    component.selectedDate = { year: 2024, month: 6, day: 1 };
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
    expect(component.dateChange.emit).toHaveBeenCalledWith(component.selectedDate);
  });

  it('should register onTouched', () => {
    const fn = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn);
    expect(component['onTouched']).toBe(fn);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
    component.setDisabledState(false);
    expect(component.disabled).toBe(false);
  });

  it('should writeValue with null/empty/undefined', () => {
    component.writeValue(null);
    expect(component.selectedDate).toBeNull();
    component.writeValue('');
    expect(component.selectedDate).toBeNull();
    component.writeValue(undefined);
    expect(component.selectedDate).toBeNull();
  });

  it('should writeValue with valid NgbDateStruct', () => {
    const date = { year: 2024, month: 6, day: 1 };
    component.writeValue(date);
    expect(component.selectedDate).toEqual(date);
  });

  it('should writeValue with valid Date object', () => {
    const jsDate = new Date(2024, 5, 1); // month is 0-based
    component.writeValue(jsDate);
    expect(component.selectedDate).toEqual({ year: 2024, month: 6, day: 1 });
  });

  it('should writeValue with valid string', () => {
    component.writeValue('2024-06-01');
    expect(component.selectedDate).toEqual({ year: 2024, month: 6, day: 1 });
    component.format = 'dd/MM/yyyy';
    component.writeValue('01/06/2024');
    expect(component.selectedDate).toEqual({ year: 2024, month: 6, day: 1 });
  });

  it('should return today from getter', () => {
    const today = { year: 2024, month: 6, day: 1 } as NgbDate;
    spyOn(component['calendar'], 'getToday').and.returnValue(today);
    expect(component.today).toEqual(today);
  });

  it('should format date to string according to format', () => {
    component.format = 'yyyy-MM-dd';
    const date = { year: 2024, month: 6, day: 1 };
    expect((component as any).formatDateToString(date)).toBe('2024-06-01');
    component.format = 'dd/MM/yyyy';
    expect((component as any).formatDateToString(date)).toBe('01/06/2024');
  });

  it('should parse string by format', () => {
    expect((component as any).parseStringByFormat('2024-06-01')).toEqual({ year: 2024, month: 6, day: 1 });
    expect((component as any).parseStringByFormat('01/06/2024')).toEqual({ year: 2024, month: 6, day: 1 });
    expect((component as any).parseStringByFormat('06/01/2024')).toEqual({ year: 2024, month: 1, day: 6 });
    expect((component as any).parseStringByFormat('01-06-2024')).toEqual({ year: 2024, month: 6, day: 1 });
    expect((component as any).parseStringByFormat('06-01-2024')).toEqual({ year: 2024, month: 1, day: 6 });
    expect((component as any).parseStringByFormat('invalid')).toBeNull();
  });


});
