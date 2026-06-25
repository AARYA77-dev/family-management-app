import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

export const loginGaurdGuard: CanActivateFn = (route:ActivatedRouteSnapshot) => {

  const router = inject(Router);
  const newUser = route.queryParamMap.get('newUser') 
  const auth = inject(Auth);
  return authState(auth).pipe(
    map((user: User | null) => {
      return (user && !newUser)? router.createUrlTree(["/dashboard"]) : true
    })
  );
};
