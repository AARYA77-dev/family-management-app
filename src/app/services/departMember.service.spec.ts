import { TestBed } from '@angular/core/testing';

import { DepartMemberService } from './depart-member-service';

describe('DepartMemberService', () => {
  let service: DepartMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
