import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Themoviedb } from '@features/movies/services/themoviedb';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { MovieDetail } from './movie-detail';
import { MovieDetails } from '@shared/interfaces/movie';

describe('Movie Detail', () => {
  let component: MovieDetail;
  let fixture: ComponentFixture<MovieDetail>;
  let movieServiceSpy: jasmine.SpyObj<Themoviedb>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // 1. Crear mocks de los servicios
    movieServiceSpy = jasmine.createSpyObj('Themoviedb', ['getMovieDetails', 'getActors']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      // MovieDetail es standalone, se importa directamente
      imports: [MovieDetail],
      providers: [
        { provide: Themoviedb, useValue: movieServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([]) // Necesario para que RouterLink funcione en el template
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetail);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    // Establecemos el input requerido antes de la detección de cambios
    fixture.componentRef.setInput('id', 550);
    expect(component).toBeTruthy();
  });

  it('debería cargar los detalles de la película cuando el id cambia', () => {
    // 1. Ajustamos el mock para que use una propiedad que SÍ existe en MovieDetails
    const mockMovie: Partial<MovieDetails> = {
      originalTitle: 'Fight Club',
      overview: 'Prueba'
    };
    const mockActors = [{ id: 1, name: 'Brad Pitt' }];

    movieServiceSpy.getMovieDetails.and.returnValue(of(mockMovie as any));
    movieServiceSpy.getActors.and.returnValue(of(mockActors as any));

    fixture.componentRef.setInput('id', 550);
    fixture.detectChanges();

    expect(movieServiceSpy.getMovieDetails).toHaveBeenCalledWith(550);

    // 2. Comprobamos la propiedad que realmente existe en la interfaz
    expect(component.movie()?.originalTitle).toBe('Fight Club');
  });

  it('debería mostrar alerta y navegar a /movies si el servicio falla (Error 404)', () => {
    // Simulamos un error de API
    const errorResponse = { error: { status_message: 'Película no encontrada' } };
    movieServiceSpy.getMovieDetails.and.returnValue(throwError(() => errorResponse));
    movieServiceSpy.getActors.and.returnValue(of([]));

    // Espiamos el alert nativo del navegador
    const alertSpy = spyOn(window, 'alert');

    fixture.componentRef.setInput('id', 99999);
    fixture.detectChanges();
    console.log('Mensaje capturado por el espía de alerta:', alertSpy.calls.mostRecent().args[0]);
    expect(window.alert).toHaveBeenCalledWith('Película no encontrada');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies']);
  });
});