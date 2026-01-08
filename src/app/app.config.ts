import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ]
};

const firebaseConfig = {
  apiKey: "AIzaSyBx0kR2r_JOzaVL-_hczb4AI9si8WUmCmo",
  authDomain: "movie-app-13399.firebaseapp.com",
  projectId: "movie-app-13399",
  storageBucket: "movie-app-13399.firebasestorage.app",
  messagingSenderId: "140890622206",
  appId: "1:140890622206:web:645fc33c6ff6d7d5e4bdaf"
};