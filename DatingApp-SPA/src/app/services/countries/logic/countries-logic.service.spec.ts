/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountriesLogicService } from './countries-logic.service';

describe('Service: CountriesLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesLogicService]
    });
  });

  it('should ...', inject([CountriesLogicService], (service: CountriesLogicService) => {
    expect(service).toBeTruthy();
  }));
});
