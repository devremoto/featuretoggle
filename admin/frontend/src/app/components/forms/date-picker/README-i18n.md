## Date Picker Component - Internationalization (i18n) Implementation

The Date Picker component now supports full internationalization with dynamic language switching through the `@Input() lang` property.

### ✅ **Internationalization Features:**

#### **1. Multi-Language Support**
Supports 8 languages out of the box:
- **English (en)** - Default
- **French (fr)** 
- **Portuguese (pt)**
- **Spanish (es)**
- **Italian (it)**
- **Chinese (cn)**
- **Japanese (jp)**
- **German (de)**

#### **2. Dynamic Language Switching**
- Language changes instantly when `@Input() lang` property changes
- Automatic fallback to English for unsupported languages
- Real-time calendar updates without page reload

#### **3. Localized Calendar Elements**
- **Weekday labels**: Monday, Tuesday, etc. in selected language
- **Month names**: January, February, etc. in selected language  
- **Week label**: "wk", "sem", "周", etc. based on language

### **Usage Examples:**

#### **English (Default):**
```html
<date-picker 
    label="Select Date" 
    [(ngModel)]="selectedDate"
    lang="en">
</date-picker>
```

#### **French:**
```html
<date-picker 
    label="Sélectionner une date" 
    [(ngModel)]="selectedDate"
    lang="fr"
    format="dd/MM/yyyy">
</date-picker>
```

#### **Portuguese (Brazilian):**
```html
<date-picker 
    label="Selecionar Data" 
    [(ngModel)]="selectedDate"
    lang="pt"
    format="dd/MM/yyyy">
</date-picker>
```

#### **Spanish:**
```html
<date-picker 
    label="Seleccionar Fecha" 
    [(ngModel)]="selectedDate"
    lang="es"
    format="dd/MM/yyyy">
</date-picker>
```

#### **German:**
```html
<date-picker 
    label="Datum auswählen" 
    [(ngModel)]="selectedDate"
    lang="de"
    format="dd.MM.yyyy">
</date-picker>
```

#### **Chinese:**
```html
<date-picker 
    label="选择日期" 
    [(ngModel)]="selectedDate"
    lang="cn"
    format="yyyy年MM月dd日">
</date-picker>
```

#### **Japanese:**
```html
<date-picker 
    label="日付を選択" 
    [(ngModel)]="selectedDate"
    lang="jp"
    format="yyyy年MM月dd日">
</date-picker>
```

### **Dynamic Language Switching Example:**

```typescript
export class MyComponent {
  selectedDate: string = '';
  currentLanguage: string = 'en';
  
  switchLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}
```

```html
<div class="language-selector">
  <button (click)="switchLanguage('en')" [class.active]="currentLanguage === 'en'">English</button>
  <button (click)="switchLanguage('fr')" [class.active]="currentLanguage === 'fr'">Français</button>
  <button (click)="switchLanguage('pt')" [class.active]="currentLanguage === 'pt'">Português</button>
  <button (click)="switchLanguage('es')" [class.active]="currentLanguage === 'es'">Español</button>
  <button (click)="switchLanguage('de')" [class.active]="currentLanguage === 'de'">Deutsch</button>
</div>

<date-picker 
    label="Select Date" 
    [(ngModel)]="selectedDate"
    [lang]="currentLanguage">
</date-picker>
```

### **Implementation Details:**

#### **1. I18N_VALUES Configuration:**
```typescript
const I18N_VALUES = {
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    weekLabel: 'sem'
  },
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekLabel: 'wk'
  }
  // ... other languages
};
```

#### **2. I18n Service:**
```typescript
@Injectable()
export class I18n {
  language: keyof typeof I18N_VALUES = 'en'; // Dynamic language property
}
```

#### **3. Custom NgbDatepickerI18n:**
```typescript
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  private _i18n = inject(I18n);

  getWeekdayLabel(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  
  getWeekLabel(): string {
    return I18N_VALUES[this._i18n.language].weekLabel;
  }
}
```

#### **4. Component Integration:**
```typescript
export class DatePicker implements ControlValueAccessor, OnInit, OnChanges {
  @Input() lang: string = 'en';
  
  constructor(private i18nService: I18n) { }
  
  ngOnInit(): void {
    this.updateLanguage();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lang']) {
      this.updateLanguage();
    }
  }
  
  updateLanguage(): void {
    if (this.lang && this.lang in I18N_VALUES) {
      this.i18nService.language = this.lang as keyof typeof I18N_VALUES;
    } else {
      this.i18nService.language = 'en'; // Fallback
    }
  }
}
```

### **API Reference:**

#### **Input Properties:**
```typescript
@Input() lang: string = 'en';                     // Language code for calendar localization
@Input() format: string = 'yyyy-MM-dd';           // Date format string
@Input() allowClear: boolean = false;             // Show clear button
@Input() label: string = '';                      // Field label
@Input() placeholder: string = 'Select a date';   // Input placeholder
// ... other existing properties
```

### **Supported Language Codes:**
- `'en'` - English (default)
- `'fr'` - French
- `'pt'` - Portuguese  
- `'es'` - Spanish
- `'it'` - Italian
- `'cn'` - Chinese
- `'jp'` - Japanese
- `'de'` - German

### **Language Pack Structure:**
Each language pack includes:
- **weekdays**: Array of 7 weekday abbreviations (Monday to Sunday)
- **months**: Array of 12 month abbreviations (January to December)
- **weekLabel**: Week label for week numbers display

### **Adding New Languages:**

To add a new language, extend the `I18N_VALUES` object:

```typescript
const I18N_VALUES = {
  // ... existing languages
  ru: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekLabel: 'нед'
  }
};
```

### **Best Practices:**

1. **Language Fallback**: Always provide English as fallback for unsupported languages
2. **Format Consistency**: Use appropriate date formats for each locale (dd/MM/yyyy for Europe, MM/dd/yyyy for US)
3. **Real-time Updates**: Language changes are applied immediately without requiring component recreation
4. **Performance**: Language switching is lightweight and doesn't affect component performance

This internationalization implementation provides a robust, scalable solution for multi-language date picker support with seamless language switching capabilities.