import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MobileNumberFormatterDirective } from './directives/mobile-number-formatter/mobile-number-formatter.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { MatPhoneCodeValidatorComponent } from './mat-phone-code-validator.component';

@NgModule({
  declarations: [MatPhoneCodeValidatorComponent, OnlyNumberDirective, MobileNumberFormatterDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    MatPhoneCodeValidatorComponent,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    NgxMatSelectSearchModule
  ]
})
export class MatPhoneCodeValidatorModule { }
