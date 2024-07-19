import { TestBed } from '@angular/core/testing';

import { UsersListCompletedService } from './users-list-completed.service';

describe('UsersListCompletedService', () => {
  let service: UsersListCompletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListCompletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
