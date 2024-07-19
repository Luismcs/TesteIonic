import { TestBed } from '@angular/core/testing';

import { UsersListCurrentyPlayingService } from './users-list-currenty-playing.service';

describe('UsersListCurrentyPlayingService', () => {
  let service: UsersListCurrentyPlayingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListCurrentyPlayingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
