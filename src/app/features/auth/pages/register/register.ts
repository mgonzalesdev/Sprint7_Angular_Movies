import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  error: string | null = null;

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  constructor() {
    // REDIRECCIÓN REACTIVA: 
    // Si el estado cambia a autenticado, sal de aquí inmediatamente.
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/movies']);
      }
    });
  }
  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.getRawValue();

      try {
        // Como tu servicio ya tiene el redirect, solo esperamos a que termine
        await this.authService.register(email, password);
        console.log('Registro exitoso');
      } catch (err: any) {
        // Aquí capturas el "throw error" de tu servicio
        this.error = this.mapFirebaseError(err.code);
        console.error('Error en registro:', err);
      }
    }
  }
  private mapFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': return 'El correo ya está registrado.';
      case 'auth/weak-password': return 'La contraseña es muy débil.';
      case 'auth/invalid-email': return 'El correo no es válido.';
      default: return 'Ocurrió un error inesperado.';
    }
  }
}
