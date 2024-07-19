import { TestBed } from '@angular/core/testing';

import { UsersListPlayLaterService } from './users-list-play-later.service';

describe('UsersListPlayLaterService', () => {
  let service: UsersListPlayLaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListPlayLaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
