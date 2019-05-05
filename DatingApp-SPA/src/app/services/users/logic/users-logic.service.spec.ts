/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersLogicService } from './users-logic.service';

describe('Service: UsersLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersLogicService]
    });
  });

  it('should ...', inject([UsersLogicService], (service: UsersLogicService) => {
    expect(service).toBeTruthy();
  }));
});
