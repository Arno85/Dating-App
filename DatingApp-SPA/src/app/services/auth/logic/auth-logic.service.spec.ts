/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthLogicService } from './auth-logic.service';

describe('Service: AuthLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLogicService]
    });
  });

  it('should ...', inject([AuthLogicService], (service: AuthLogicService) => {
    expect(service).toBeTruthy();
  }));
});
