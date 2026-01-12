import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/authentication/auth';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  authService = inject(AuthService);
  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects)
    )
  );

  showNavbar = computed(() => {
    const url = this.currentUrl() || '';
    const isAuthPage = url.includes('/login') || url.includes('/register');
    const user = this.authService.currentUser();

    // Si hay usuario, siempre mostramos. Si no hay usuario, solo mostramos si NO es login/reg
    return user ? true : !isAuthPage;
  });

  userInitial = computed(() => {
    const email = this.authService.currentUser()?.email;
    return email ? email.charAt(0).toUpperCase() : '?';
  });

  async logout() {
   
      try {
    await this.authService.logout();
    this.router.navigate(['/']); // El Navbar decide ir al Inicio
  } catch (error) {
    console.error('Error al salir', error);
  }
  }
}
