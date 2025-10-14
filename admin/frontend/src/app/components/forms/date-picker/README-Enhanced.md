## Date Picker Component - Format and Language Support

The Date Picker component now supports custom date formats and language settings.

### ✅ **New Features:**

#### **1. Format Input Property**
- **@Input() format: string = 'yyyy-MM-dd'**
- Controls both input parsing and output formatting
- Supports multiple date formats

#### **2. Language Input Property**
- **@Input() lang: string = 'en'**
- Sets the language/locale for the date picker
- Falls back to system locale if not specified

### **Supported Formats:**

1. **'yyyy-MM-dd'** (default) - ISO format: 2024-12-25
2. **'dd/MM/yyyy'** - European format: 25/12/2024
3. **'MM/dd/yyyy'** - US format: 12/25/2024
4. **'dd-MM-yyyy'** - European with dashes: 25-12-2024
5. **'MM-dd-yyyy'** - US with dashes: 12-25-2024

### **Usage Examples:**

#### **Basic Usage (Default Format):**
```html
<date-picker 
    label="Select Date" 
    [(ngModel)]="selectedDate">
</date-picker>
```

#### **Custom Format - European Style:**
```html
<date-picker 
    label="Date de naissance" 
    [(ngModel)]="birthDate"
    format="dd/MM/yyyy"
    lang="fr"
    [allowClear]="true">
</date-picker>
```

#### **Custom Format - US Style:**
```html
<date-picker 
    label="Birth Date" 
    [(ngModel)]="birthDate"
    format="MM/dd/yyyy"
    lang="en-US"
    placeholder="Select birth date">
</date-picker>
```

#### **Custom Format with Dashes:**
```html
<date-picker 
    label="Event Date" 
    [(ngModel)]="eventDate"
    format="dd-MM-yyyy"
    lang="en-GB">
</date-picker>
```

### **Implementation Details:**

#### **Component Features:**
1. **CustomDateParserFormatter Class:**
   - Handles parsing and formatting based on format input
   - Supports multiple date formats automatically
   - Robust error handling for invalid dates

2. **Format-Aware Input Field:**
   - Placeholder automatically updates to show expected format
   - Input validation based on selected format
   - Real-time formatting as user types

3. **Calendar Integration:**
   - Calendar dates formatted according to format property
   - Language setting affects calendar display
   - Consistent formatting between input and calendar

#### **Auto-Detection Features:**
- **Multi-Format Parsing:** Tries multiple formats if primary format fails
- **Intelligent Validation:** Validates dates based on format structure
- **Fallback Support:** Falls back to default format if parsing fails

### **API Reference:**

#### **Input Properties:**
```typescript
@Input() format: string = 'yyyy-MM-dd';           // Date format string
@Input() lang: string = 'en';                     // Language/locale
@Input() allowClear: boolean = false;             // Show clear button
@Input() autoClose: boolean = true;               // Auto-close calendar
@Input() label: string = '';                      // Field label
@Input() placeholder: string = 'Select a date';   // Input placeholder
@Input() disabled: boolean = false;               // Disable component
@Input() minDate: NgbDateStruct;                  // Minimum date
@Input() maxDate: NgbDateStruct;                  // Maximum date
@Input() showWeekNumbers: boolean = false;        // Show week numbers
```

#### **Output Properties:**
```typescript
@Output() dateChange = new EventEmitter<NgbDateStruct | null>();
```

### **Advanced Examples:**

#### **Form Integration:**
```typescript
export class MyComponent {
  selectedDate: string = '';
  
  onDateChanged(date: NgbDateStruct | null) {
    if (date) {
      console.log('Date selected:', date);
    }
  }
}
```

```html
<form #myForm="ngForm">
  <date-picker 
    name="eventDate"
    label="Event Date"
    [(ngModel)]="selectedDate"
    format="dd/MM/yyyy"
    lang="fr"
    [allowClear]="true"
    (dateChange)="onDateChanged($event)"
    required>
  </date-picker>
</form>
```

#### **Reactive Forms:**
```typescript
import { FormControl, FormGroup } from '@angular/forms';

export class MyComponent {
  myForm = new FormGroup({
    birthDate: new FormControl('')
  });
}
```

```html
<form [formGroup]="myForm">
  <date-picker 
    formControlName="birthDate"
    label="Birth Date"
    format="MM/dd/yyyy"
    lang="en-US">
  </date-picker>
</form>
```

### **CSS Customization:**

The component maintains all existing CSS classes and styling capabilities:

```css
.custom-calendar {
  /* Calendar popup styles */
}

.calendar-header {
  /* Clear button header styles */
}

.btn-clear-calendar {
  /* Clear button in calendar styles */
}
```

### **Migration Notes:**

- **Removed:** `displayFormat` input property (consolidated into `format`)
- **Enhanced:** Format parsing now supports multiple formats automatically
- **Backward Compatible:** Default behavior unchanged for existing implementations
- **New Features:** Language support and enhanced format flexibility

This enhanced date picker provides a much more flexible and internationalization-ready solution while maintaining full backward compatibility with existing code.