import { TestBed } from '@angular/core/testing';

import { Familymembers } from './familymembers';

describe('Familymembers', () => {
  let service: Familymembers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Familymembers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
