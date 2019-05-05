/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersDataService } from './users-data.service';

describe('Service: UsersData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersDataService]
    });
  });

  it('should ...', inject([UsersDataService], (service: UsersDataService) => {
    expect(service).toBeTruthy();
  }));
});
