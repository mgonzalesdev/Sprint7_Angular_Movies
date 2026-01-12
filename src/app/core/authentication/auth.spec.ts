import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let authMock: any;
  let routerMock: any;

  beforeEach(() => {
    authMock = { currentUser: null }; // Mock básico de Firebase Auth
    routerMock = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('isAuthenticated() debería devolver false si no hay usuario', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });
});