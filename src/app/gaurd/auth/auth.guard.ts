import { inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGaurdGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);
  return authState(auth).pipe(
    map((user: User | null) => {
      return user ? true : router.createUrlTree(["/login"]);
    })
  );
};
