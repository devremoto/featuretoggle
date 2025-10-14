import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true
    }
  ]
})
export class Switch implements ControlValueAccessor {
  isChecked: boolean = false;

  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() labelPosition: 'left' | 'right' = 'right';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = 'primary';
  @Input() labelOn: string = '';
  @Input() labelOff: string = '';

  onChange = (value: boolean) => { };
  onTouched = () => { };

  writeValue(value: boolean): void {
    this.isChecked = value;
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggle(value: boolean): void {
    this.isChecked = value;
    this.onChange(this.isChecked);
    this.onTouched();
  }

  toggle(): void {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked);
    this.onTouched();
  }

}
