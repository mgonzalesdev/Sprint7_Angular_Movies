import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/authentication/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
   private router = inject(Router);
  isLoading = signal(false);

  returnUrl = computed(() => this.route.snapshot.queryParams['returnUrl']);
  // Señal para manejar mensajes de error de Firebase
  errorMessage = signal<string | null>(null);


  // Definición del formulario con validaciones
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

   constructor() {
    // Este efecto reacciona automáticamente cuando el Signal del servicio cambia
    effect(() => {
      if (this.authService.isAuthenticated()) {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
   async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.loginForm.getRawValue();

    try {
      // 1. Autenticamos
      await this.authService.login(email, password);
      
      // 2. Una vez autenticado, el componente decide la redirección
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/movies';
      await this.router.navigateByUrl(returnUrl);
      
    } catch (error: any) {
      // 3. Manejo de error local
      this.isLoading.set(false);
      //this.handleError(error);
       if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      this.errorMessage.set('El correo o la contraseña son incorrectos.');
    } else if (error.code === 'auth/too-many-requests') {
      this.errorMessage.set('Demasiados intentos. Inténtalo más tarde.');
    } else {
      this.errorMessage.set('Ocurrió un error inesperado. Revisa tu conexión.');
    }
    
    console.error('Error de Firebase:', error.code);
    }
  }
}