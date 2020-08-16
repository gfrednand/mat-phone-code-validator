import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

@Component({
  selector: 'lib-mat-phone-code-validator',
  templateUrl: './mat-phone-code-validator.component.html',
  styleUrls: ['./mat-phone-code-validator.component.css']
})
export class MatPhoneCodeValidatorComponent implements OnInit {

  @Input() group: FormGroup;
  @Input() contryCode: FormControl;
  @Input() mobileNumber: FormControl;
  @Input() errorlabel = 'Mobile number';
  @Input() hasCustomValidators = false;
  countryCodeSearchVal: FormControl;
  countryCodes: Array<any> = [];
  filterCountryCode: Array<any>;
  errorMessage: string | boolean;
  selectedCodeName: any;
  objectFn = Object;

  constructor( ) {
    // Get the country code list
    const reg = phoneUtil.getSupportedRegions();
    for (const r of reg) {
      this.countryCodes.push({
        phone_code: phoneUtil.getCountryCodeForRegion(r),
        name: r
      });
      this.filterCountryCode = [...this.countryCodes];
    }
  }

  ngOnInit(): void {
    // Intitalise variables
    this.initialise();
    // listen for search field value changes
    this.countryCodeSearchVal.valueChanges
      .subscribe((val) => {
        this.filterCountryCode = this.filterArray(this.countryCodes, val, 'phone_code');
      });
    // Check mobile number validity
    this.mobileNumber.valueChanges
      .subscribe(() => {
        this.isPhoneValid();
      });
  }

  /* Initialise all the variables */
  initialise() {
    // Iniialise country code search
    this.countryCodeSearchVal = new FormControl('');
  }

  /* Function to check phone number validity */
  isPhoneValid(codeName = null) {
    if (codeName) {
      this.selectedCodeName = codeName;
    }
    // Check if a mobile number is valid or is incorrect the validate it
    if ( (this.mobileNumber.valid || this.mobileNumber.errors.incorrect)
        && this.mobileNumber.value && this.selectedCodeName) {
      const phoneCheck = phoneUtil.parseAndKeepRawInput(this.mobileNumber.value, this.selectedCodeName);
      if (!phoneUtil.isValidNumber(phoneCheck)) {
        /* If phone invalid set error */
        this.mobileNumber.setErrors({incorrect: 'Please enter a valid phone number'});
        this.mobileNumber.markAsTouched();
      } else {
        /* If phone valid remove the error */
        this.mobileNumber.setErrors(null);
      }
    }
  }

  /* Filter Array of objects or strings */
  filterArray(arr, val, key = null) {
    if (key) {
      return arr.filter(f => ('' + f[key]).toLowerCase().includes(('' + val).toLowerCase()));
    } else {
      return arr.filter(f => f.toLowerCase().includes(val.toLowerCase()));
    }
  }

}
