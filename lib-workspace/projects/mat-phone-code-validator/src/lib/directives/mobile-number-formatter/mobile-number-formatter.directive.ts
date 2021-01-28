import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
const AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;

@Directive({
  selector: '[appMobileNumberFormatter]'
})
export class MobileNumberFormatterDirective implements OnInit{

  regexStr = '^[0-9]*$';
  @Input() contryCode: FormControl;
  @Input() countryCodeList: Array<any>;
  selectedCode: any = {name: 'US', phone_code: '1'};
  private formatter = new AsYouTypeFormatter('US');

  constructor(private el: ElementRef) {
    this.formatter = new AsYouTypeFormatter('US');
  }

  ngOnInit() {
    // If country code already available
    if(this.contryCode.value) {
      // Reset the select country code
      this.selectedCode = this.countryCodeList.filter(f => f.phone_code + f.name == this.contryCode.value)[0];
    }
    // Add the phone code initially
    this.formatter.inputDigit(this.selectedCode.phone_code);
    // Observe the changes to country code
    this.contryCode.valueChanges.subscribe(() => {
      // Reset the country code
      this.selectedCode = this.countryCodeList.filter(f => f.phone_code + f.name == this.contryCode.value)[0];
      console.log(this.selectedCode);
      this.resetFormatter();
    });
  }

  /* To add auto hyphens based selected country code */
  @HostListener('keyup', ['$event']) onKeyUp(event) {
    const e = <KeyboardEvent> event;
    const regEx = new RegExp(this.regexStr);
    // If its back space or delete
    if([46, 8].indexOf(e.keyCode) !== -1) {
      this.resetFormatter();
    } else if (regEx.test(e.key)) {
      // Add the number to mobile formatter and reset the value in the input box
      let n = this.formatter.inputDigit(e.key);
      if(n.includes(' ')) {
        // Remove country coed and add rest
        (this.el.nativeElement as HTMLInputElement).value = n.split(' ').splice(1).join(' ');
      } else {
        // Remove country coed and add rest
        (this.el.nativeElement as HTMLInputElement).value = n.substr(('' + this.selectedCode.phone_code).length);
      }
    }
  }

  /* Reset the formatter */
  resetFormatter() {
    // clear formatter
    this.formatter.clear();
    // reset the formatter with selected country code
    this.formatter = new AsYouTypeFormatter(this.selectedCode.name);
    // Add the contry code into the formatter
    this.formatter.inputDigit(this.selectedCode.phone_code);
    // Get only numbers from the input box
    let number = (this.el.nativeElement as HTMLInputElement).value.replace(/\D/g, '');
    for(let i=0; i < number.length; i++) {
      // If final number
      if(i === number.length - 1) {
        let n = this.formatter.inputDigit(number[i]);
        if(n.includes(' ')) {
          // Remove country coed and add rest
          (this.el.nativeElement as HTMLInputElement).value = n.split(' ').splice(1).join(' ');
        } else {
          // Remove country coed and add rest
          (this.el.nativeElement as HTMLInputElement).value = n.substr(('' + this.selectedCode.phone_code).length);
        }
      } else {
        this.formatter.inputDigit(number[i]);
      }
    }
  }

  /* To allow only numbers */
  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent> event;
    // Allow back space, row movements etc...
    if ([46, 8, 9, 27, 13, 37, 39, 40, 38].indexOf(e.keyCode) !== -1) {
      return;
    }
    // Ctrl+C or Cmd+C pressed?
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 67) {
      return;
    }
    // Ctrl+V or Cmd+V pressed?
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 86) {
      return;
    }
    const regEx = new RegExp(this.regexStr);
    // Do not allow anthing other than numbers
    if (!regEx.test(e.key)) {
      e.preventDefault();
    }
  }

}
