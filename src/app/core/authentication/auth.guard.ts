import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    // Guarda la URL completa (ej: /movies/1368166) en un parámetro 'returnUrl'
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
    });
};