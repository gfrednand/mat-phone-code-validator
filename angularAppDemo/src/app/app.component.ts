import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularAppDemo';
  phone = new FormGroup({
    code: new FormControl('', [Validators.required]),
    number: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5)
    ])
  });
}
