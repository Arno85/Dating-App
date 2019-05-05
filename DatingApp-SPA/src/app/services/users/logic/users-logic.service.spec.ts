/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersLogicService } from './users-logic.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: UsersLogic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        UsersLogicService
      ]
    });
  });

  it('should ...', inject([UsersLogicService], (service: UsersLogicService) => {
    expect(service).toBeTruthy();
  }));
});
