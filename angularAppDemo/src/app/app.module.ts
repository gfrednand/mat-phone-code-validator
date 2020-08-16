import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
