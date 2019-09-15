/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: CountriesData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([CountriesService], (service: CountriesService) => {
    expect(service).toBeTruthy();
  }));
});
