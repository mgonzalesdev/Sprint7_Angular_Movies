import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  readonly currentUser = toSignal(user(this.auth));
  readonly isAuthenticated = computed(() => !!this.currentUser());

  async login(email: string, pass: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass)
      this.router.navigate(['/movies']);
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/']);
  }
  async register(email: string, pass: string) {
    await createUserWithEmailAndPassword(this.auth, email, pass);
    this.router.navigate(['/movies']);
  }

}
