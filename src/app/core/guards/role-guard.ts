import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  const role = authService.getRole();

  if (!role) {
    return router.createUrlTree(['/login']);
  }

  if (allowedRoles.includes(role)) {
    return true;
  }

  return router.createUrlTree(['/not-found']);
};
