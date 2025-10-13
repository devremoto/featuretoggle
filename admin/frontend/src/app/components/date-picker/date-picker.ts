import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true
    }
  ]
})
export class DatePicker implements ControlValueAccessor {
  //#region Fields · private
  private onChange = (value: any) => {
    this.selectedDate = value;
  };
  private onTouched = () => { };
  //#endregion Fields · private

  //#region Fields · public
  public disabled = false;
  public selectedDate: NgbDateStruct | null = null;
  //#endregion Fields · public

  //#region @Input properties
  @Input() autoClose: boolean | 'inside' | 'outside' = true;
  @Input() displayFormat: string = 'yyyy-MM-dd'
  @Input() firstDayOfWeek: number = 1;
  @Input() label: string = '';
  @Input() maxDate!: NgbDateStruct;
  @Input() minDate!: NgbDateStruct;
  @Input() placeholder: string = 'Select a date';
  @Input() showWeekNumbers: boolean = false;
  @Input() startDate!: NgbDateStruct;
  //#endregion @Input properties

  //#region @Output properties
  @Output() dateChange = new EventEmitter<NgbDateStruct | null>();
  //#endregion @Output properties

  //#region Getters · public
  get today(): NgbDateStruct {
    return this.calendar.getToday();
  }
  //#endregion Getters · public

  //#region Constructor
  constructor(
    private calendar: NgbCalendar
  ) { }
  //#endregion Constructor

  //#region Methods · public
  onDateSelect(date: NgbDate | null): void {
    this.selectedDate = date;
    this.onTouched();
    if (date) {
      const dateString = this.formatDateToString(date);
      console.log('DatePicker - Selected date:', dateString);
      this.onChange(dateString);
    } else {
      this.onChange(null);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
    this.dateChange.emit(this.selectedDate);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedDate = this.parseInputValue(value);
    } else {
      this.selectedDate = null;
    }
  }
  //#endregion Methods · public

  //#region Methods · private
  private formatDateToString(date: NgbDateStruct): string {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseInputValue(value: any): NgbDateStruct | null {
    if (!value) return null;
    try {
      if (value instanceof Date) {
        return {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate()
        };
      } else if (typeof value === 'string') {
        const parts = value.split('-');
        if (parts.length === 3) {
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const day = parseInt(parts[2], 10);
          if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            return { year, month, day };
          }
        }
      } else if (value.year && value.month && value.day) {
        return value;
      }
    } catch (error) {
      console.warn('DatePicker: Invalid date value', value, error);
    }
    return null;
  }
  //#endregion Methods · private
}