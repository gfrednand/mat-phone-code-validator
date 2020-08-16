import { TestBed } from '@angular/core/testing';

import { MatPhoneCodeValidatorService } from './mat-phone-code-validator.service';

describe('MatPhoneCodeValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatPhoneCodeValidatorService = TestBed.get(MatPhoneCodeValidatorService);
    expect(service).toBeTruthy();
  });
});
