/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthDataService } from './auth-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: AuthData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthDataService]
    });
  });

  it('should ...', inject([AuthDataService], (service: AuthDataService) => {
    expect(service).toBeTruthy();
  }));
});
