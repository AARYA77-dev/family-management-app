import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGaurdGuard: CanActivateFn = () => {

  const route = inject(Router);
  const isLoggedIn = localStorage.getItem("token");

  if (isLoggedIn){
    return true;
  }
  route.navigate(["/login"]);
  return false;
};
