import { TestBed } from '@angular/core/testing';

import { UserServices } from '../user/user.services';

describe('UserServices', () => {
  let service: UserServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
