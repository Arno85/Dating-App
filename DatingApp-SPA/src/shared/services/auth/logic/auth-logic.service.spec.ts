/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthLogicService } from './auth-logic.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: AuthLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthLogicService]
    });
  });

  it('should ...', inject([AuthLogicService], (service: AuthLogicService) => {
    expect(service).toBeTruthy();
  }));
});
