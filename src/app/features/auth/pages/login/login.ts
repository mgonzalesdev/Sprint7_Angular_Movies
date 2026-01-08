import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/authentication/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);

  // Señal para manejar mensajes de error de Firebase
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  // Definición del formulario con validaciones
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.login(email, password);
    } catch (error: any) {
      this.isLoading.set(false);
      // Traducir errores comunes de Firebase
      if (error.code === 'auth/invalid-credential') {
        this.errorMessage.set('Correo o contraseña incorrectos.');
      } else {
        this.errorMessage.set('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    }
  }
}