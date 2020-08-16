# MatPhoneCodeValidator

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14. This package can be used to implement phone code and phone number validation. this library uses a widely used and valid google phone code library [`google-libphonenumber`](https://www.npmjs.com/package/google-libphonenumber) to validate the phone code and mobile number.


# Install

Run this command in you angualr project `npm i mat-phone-code-validator --save`


# Usage
Import the module,
> import { MatPhoneCodeValidatorModule } from 'mat-phone-code-validator';

Add it to the module imports in the module.ts file
> imports: [
    MatPhoneCodeValidatorModule
  ],

Full sample `module.ts` below,
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Impot the module like this */
import { MatPhoneCodeValidatorModule } from 'mat-phone-code-validator';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPhoneCodeValidatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
Create a form control in `component.ts`
```typescript
  phone = new FormGroup({
    code: new FormControl('', [Validators.required]),
    number: new FormControl('', [(control) => {
          if (!control.value) {
              return {req: 'Please enter the mobile number'};
          }
        },
      Validators.maxLength(15),
      Validators.minLength(5)
    ])
  });
```
Finally use like below in the `component.html`
```html
<lib-mat-phone-code-validator [group]="phone"
    [hasCustomValidators]="true"
    [contryCode]="phone.get('code')"
    [mobileNumber]="phone.get('number')"></lib-mat-phone-code-validator>
```

# Exposed attributes and events

### Input attributes
```
  // Main form group that contains the code and number
  @Input() group: FormGroup;
  
  // Country code form control - This will contain the country code
  @Input() contryCode: FormControl;
  
  // Phone number form control
  @Input() mobileNumber: FormControl;
  
  // Error message label name - Default is Mobile number
  @Input() errorlabel = 'Mobile number';
  
  // Flag to recognise if there are any custom validators provided
  @Input() hasCustomValidators = false;
  
  // Place holder string - Default is Mobile number
  @Input() placeholder = 'Mobile number';

  // Mobile enumber input box label - Default is Mobile number
  @Input() label = 'Mobile number';
  
  // ID sttribute of mobile number input tag - Default is contact_mobile_number
  @Input() id = 'contact_mobile_number';
```

## Requirements

1. `Angular Material`. You can install it `ng add @angualr/material`

2. This component works on formsModule's form group and form controls. Please include them. To get its importance you can view this article. [https://dev.to/vishesh/angular-reactive-forms-formsmodule-is-it-necessary-2aca](https://dev.to/vishesh/angular-reactive-forms-formsmodule-is-it-necessary-2aca)

3. Please include `BrowserAnimationsModule` and `FormsModule` in you module where you want to use this library. Mostly it will be present by default.

# Support

* Supports default form control validators like required, minlength, maxlength and forbiddenName. Will support more in future.

* It supports custom validator errors. To know how to add the custom validator functions check this article [https://dev.to/vishesh/custom-error-handling-in-angular-reactive-forms-5f05](https://dev.to/vishesh/custom-error-handling-in-angular-reactive-forms-5f05).

You can declare the custom validation function while initialising form control like below.

```
// The number key has the sample custom validator implementation
const form = new FormGroup({
    code: new FormControl('', [Validators.required]),
    number: new FormControl('', [(control) => {
            if(!control.value){
                return {req: 'Please enter the mobile number'};
            }
        }
    ])
});
```

# Future TODO
* Make it work without material
* Add flags
* Add auto mobile number formating based on code selection
* Add tests
