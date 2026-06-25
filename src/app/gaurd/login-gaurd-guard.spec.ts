import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginGaurdGuard } from './login-gaurd-guard';

describe('loginGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
