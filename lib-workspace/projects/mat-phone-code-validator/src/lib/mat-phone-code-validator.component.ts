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

  // Control to store contry code search valye
  countryCodeSearchVal: FormControl;

  // holds the list of country coeds from google library
  countryCodes: Array<any> = [];

  // Holds teh list of filtered county code list after search vaue
  filterCountryCode: Array<any>;

  // errorMessage for showing custom errors
  errorMessage: string | boolean;

  // Store teh seletec country code name temporarly
  selectedCodeName: any;

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
        this.filterCountryCode = this.filterArray(this.countryCodes, val);
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
  filterArray(arr, val) {
    if (arr[0] && typeof arr[0] === 'string') {
      return arr.filter(f => f.toLowerCase().includes(val.toLowerCase()));
    } else if(arr[0] && typeof arr[0] === 'object') {
      return arr.filter(f => {
        let valuePresent = false;
        // For all keys in the object
        for(let key in f) {
          // check if the value matched search key
          if(
            ('' + f[key]).toLowerCase().includes(('' + val).toLowerCase())
          ) {
            valuePresent = true;
            break
          }
        }
        // return result
        return valuePresent;
      });
    }
  }

  // Check if its custom validation error and return it
  getCustomError() {
    const errMsg = this.mobileNumber.errors[Object.keys(this.mobileNumber.errors)[0]];
    if (typeof errMsg == 'string' && Object.keys(this.mobileNumber.errors)[0] != 'incorrect') {
      return errMsg;
    } else {
      return '';
    }
  }

}
