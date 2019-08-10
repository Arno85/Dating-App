/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { UsersDataService } from './users-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: UsersData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        UsersDataService
      ]
    });
  });

  it('should ...', inject([UsersDataService], (service: UsersDataService) => {
    expect(service).toBeTruthy();
  }));
});
