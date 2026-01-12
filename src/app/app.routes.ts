import { Routes } from '@angular/router';
import { authGuard } from '@core/authentication/auth.guard';
import { publicGuard } from '@core/authentication/public.guard';
import { Login } from '@features/auth/pages/login/login';

import { Welcome } from '@features/welcome/welcome';

export const routes: Routes = [
    { path: '', component: Welcome },
    {
        path: 'movies',
        loadChildren: () => import('@features/movies/movies.routes').then(m => m.routes),
        canActivate: [authGuard]
    },
    {
        path: 'login', 
        component: Login,
        canActivate: [publicGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('@features/auth/pages/register/register').then(m => m.Register),
        canActivate: [publicGuard]

    },
    { path: '**', redirectTo: '' },

];
