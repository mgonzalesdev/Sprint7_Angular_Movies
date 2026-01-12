import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth';

export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si ya está autenticado, no dejamos ver Login/Register
  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/movies']);
  }

  // Si no está logueado, puede pasar al Login/Register
  return true;
};