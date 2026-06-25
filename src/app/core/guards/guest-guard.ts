import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.isUser()) {

      return router.createUrlTree(['/'])
    }

    if (authService.isAdmin()) {
      return router.createUrlTree(['admin', 'home'])
    }
  }

  return true;
};
