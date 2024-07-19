import { TestBed } from '@angular/core/testing';

import { UsersListPlayedService } from './users-list-played.service';

describe('UsersListPlayedService', () => {
  let service: UsersListPlayedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListPlayedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
