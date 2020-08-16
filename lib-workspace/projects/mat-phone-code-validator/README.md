# MatPhoneCodeValidator

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## Code scaffolding

Run `ng generate component component-name --project mat-phone-code-validator` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project mat-phone-code-validator`.
> Note: Don't forget to add `--project mat-phone-code-validator` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build mat-phone-code-validator` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build mat-phone-code-validator`, go to the dist folder `cd dist/mat-phone-code-validator` and run `npm publish`.

## Running unit tests

Run `ng test mat-phone-code-validator` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Imp notes

This component works on formsModule's form group and form controls. Please include them. To get its importance you can view this article (dev.to)

Please include "BrowserAnimationsModule" and "FormsModule" in you module where you want to use this library

Support custom validator errors like in this article (dev.to). Also, supports default validators like required, minlength, maxlength, forbiddenName.

Works only with angular material

Future TODO:
Make it work without material
Add flags
Add auto mobile number formating based on code selection