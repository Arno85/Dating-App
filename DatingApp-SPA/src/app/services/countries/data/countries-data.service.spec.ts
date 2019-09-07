/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountriesDataService } from './countries-data.service';

describe('Service: CountriesData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesDataService]
    });
  });

  it('should ...', inject([CountriesDataService], (service: CountriesDataService) => {
    expect(service).toBeTruthy();
  }));
});
