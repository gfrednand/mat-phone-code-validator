import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[libOnlyNumber]'
})
export class OnlyNumberDirective {

  regexStr = '^[0-9]*$';

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = event as KeyboardEvent;
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
    const ch = (e.key);
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(ch)) {
      return;
    } else {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event) {
    const e = event as KeyboardEvent;
    let numbers = event.clipboardData.getData('text/plain').match(/[0-9]/g);
    if (numbers && numbers.length > 0) {
      numbers = numbers.join('').substring(0, 14);
      setTimeout( () => {
        event.target.value = numbers;
      }, 50);
      /* event.clipboardData.setData('text/plain', numbers); */
      return;
    } else {
      e.preventDefault();
    }
  }

}
