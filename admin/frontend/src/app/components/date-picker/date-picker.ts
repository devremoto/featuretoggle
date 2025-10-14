import { NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, inject, Injectable, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbCalendar, NgbInputDatepicker, NgbDatepickerModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18N_VALUES } from './I18N_VALUES';
// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language: keyof typeof I18N_VALUES = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  private _i18n = inject(I18n);

  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES[this._i18n.language as keyof typeof I18N_VALUES].weekdays[weekday - 1];
  }
  getWeekLabel(): string {
    return I18N_VALUES[this._i18n.language as keyof typeof I18N_VALUES].weekLabel;
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language as keyof typeof I18N_VALUES].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true
    },
    I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ],
  imports: [NgClass, NgbInputDatepicker, FormsModule, NgbDatepickerModule]
})
export class DatePicker implements ControlValueAccessor, OnInit, OnChanges {
  //#region Fields · private
  private onChange = (value: any) => {
    // Don't modify selectedDate here - it should only be set by writeValue or onDateSelect
  };
  private onTouched = () => { };
  //#endregion Fields · private

  //#region Fields · public
  public disabled = false;
  public selectedDate: NgbDateStruct | null = null;
  //#endregion Fields · public

  //#region @Input properties
  @Input() allowClear: boolean = false;
  @Input() autoClose: boolean | 'inside' | 'outside' = true;
  @Input() firstDayOfWeek: number = 1;
  @Input() format: string = 'yyyy-MM-dd';
  @Input() label: string = '';
  @Input() lang: string = 'en';
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

  get displayDate(): NgbDateStruct | null {
    return this.selectedDate;
  }
  //#endregion Getters · public

  //#region Constructor
  constructor(
    private calendar: NgbCalendar,
    private i18nService: I18n
  ) { }
  //#endregion Constructor

  //#region Lifecycle methods
  ngOnInit(): void {
    this.updateLanguage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateLanguage();
    }
  }
  //#endregion Lifecycle methods

  //#region Methods · public
  clearDate(): void {
    this.selectedDate = null;
    this.onTouched();
    this.onChange(null);
    this.dateChange.emit(null);
  }

  updateLanguage(): void {
    // Update the I18n service language based on the input property
    if (this.lang && this.lang in I18N_VALUES) {
      this.i18nService.language = this.lang as keyof typeof I18N_VALUES;
    } else {
      // Fallback to 'en' if lang is not supported
      this.i18nService.language = 'en';
    }
  }

  onDateSelect(date: NgbDate | null): void {
    this.selectedDate = date;
    this.onTouched();

    if (date && date.year && date.month && date.day) {
      const dateString = this.formatDateToString(date);
      this.onChange(dateString);
      this.dateChange.emit(date);
    } else {
      this.onChange(null);
      this.dateChange.emit(null);
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
    if (value === null || value === undefined || value === '') {
      this.selectedDate = null;
    } else {
      this.selectedDate = this.parseInputValue(value);
    }
  }
  //#endregion Methods · public

  //#region Methods · private
  private formatDateToString(date: NgbDateStruct): string {
    const year = date.year.toString();
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');

    // Use the format input property to determine output format
    let formattedDate = this.format;

    // Replace format tokens
    formattedDate = formattedDate.replace(/yyyy/g, year);
    formattedDate = formattedDate.replace(/MM/g, month);
    formattedDate = formattedDate.replace(/dd/g, day);

    // Fallback to default format if no tokens found
    if (formattedDate === this.format && !formattedDate.includes(year)) {
      return `${year}-${month}-${day}`;
    }

    return formattedDate;
  }

  private parseInputValue(value: any): NgbDateStruct | null {
    if (!value || value === '' || value === null || value === undefined) {
      return null;
    }

    try {
      if (value instanceof Date) {
        // Check for invalid dates (like 1970-01-01 from epoch 0)
        if (value.getTime() === 0 || isNaN(value.getTime())) {
          return null;
        }
        return {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate()
        };
      } else if (typeof value === 'string') {
        // Handle empty or whitespace strings
        if (value.trim() === '') {
          return null;
        }

        // Parse based on format property
        return this.parseStringByFormat(value.trim());
      } else if (value && typeof value === 'object' && value.year && value.month && value.day) {
        // Validate NgbDateStruct
        if (value.year > 1900 && value.month >= 1 && value.month <= 12 && value.day >= 1 && value.day <= 31) {
          return value;
        }
      }
    } catch (error) {
      console.warn('DatePicker: Invalid date value', value, error);
    }

    return null;
  }

  private parseStringByFormat(value: string): NgbDateStruct | null {
    // Support multiple common date formats
    const formats = [
      this.format,
      'yyyy-MM-dd',
      'dd/MM/yyyy',
      'MM/dd/yyyy',
      'dd-MM-yyyy',
      'MM-dd-yyyy'
    ];

    for (const format of formats) {
      const result = this.tryParseWithFormat(value, format);
      if (result) {
        return result;
      }
    }

    return null;
  }

  private tryParseWithFormat(value: string, format: string): NgbDateStruct | null {
    try {
      let year = 0, month = 0, day = 0;

      if (format === 'yyyy-MM-dd' && value.includes('-')) {
        const parts = value.split('-');
        if (parts.length === 3) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        }
      } else if (format === 'dd/MM/yyyy' && value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 3) {
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      } else if (format === 'MM/dd/yyyy' && value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 3) {
          month = parseInt(parts[0], 10);
          day = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      } else if (format === 'dd-MM-yyyy' && value.includes('-')) {
        const parts = value.split('-');
        if (parts.length === 3) {
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      } else if (format === 'MM-dd-yyyy' && value.includes('-')) {
        const parts = value.split('-');
        if (parts.length === 3) {
          month = parseInt(parts[0], 10);
          day = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      }

      // Validate the parsed values
      if (!isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year > 1900 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return { year, month, day };
      }
    } catch (error) {
      // Ignore parsing errors and try next format
    }

    return null;
  }
  //#endregion Methods · private
}