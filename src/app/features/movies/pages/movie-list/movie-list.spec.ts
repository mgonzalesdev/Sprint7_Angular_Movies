import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieList } from './movie-list';
import { Themoviedb } from '@features/movies/services/themoviedb';
import { of } from 'rxjs';
import { Movie, movieDbResponse } from '@shared/interfaces/movie';
import { provideRouter } from '@angular/router';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;
  let movieServiceSpy: jasmine.SpyObj<Themoviedb>;

  // Mock de datos de películas
  const mockResponsePage1: movieDbResponse = {
    movies: [{ id: 1, title: 'Película 1', img: '' } as Movie],
    totalPages: 5
  };

  const mockResponsePage2: movieDbResponse = {
    movies: [{ id: 2, title: 'Película 2', img: '' } as Movie],
    totalPages: 5
  };

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('Themoviedb', ['getNowPlayingMovie']);

    await TestBed.configureTestingModule({
      imports: [MovieList],
      providers: [
        { provide: Themoviedb, useValue: movieServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
  });

  it('debería cargar la primera página de películas al iniciar', fakeAsync(() => {
    // Configuramos el espía para que devuelva la página 1
    movieServiceSpy.getNowPlayingMovie.and.returnValue(of(mockResponsePage1));

    // Forzamos la detección de cambios para que toObservable(nextPage) se ejecute
    fixture.detectChanges();
    tick(); // Procesamos los observables asíncronos

    expect(movieServiceSpy.getNowPlayingMovie).toHaveBeenCalledWith(1);
    expect(component.movies()?.length).toBe(1);
    expect(component.movies()![0].title).toBe('Película 1');
    expect(component.totalPages()).toBe(5);
  }));

  it('debería acumular películas al llamar a loadMoreMovies()', fakeAsync(() => {
    // 1. Carga inicial (Página 1)
    movieServiceSpy.getNowPlayingMovie.and.returnValue(of(mockResponsePage1));
    fixture.detectChanges();
    tick();

    // 2. Preparar respuesta para Página 2
    movieServiceSpy.getNowPlayingMovie.and.returnValue(of(mockResponsePage2));
    
    // Ejecutar carga de más películas
    component.loadMoreMovies();
    fixture.detectChanges();
    tick();

    // Verificamos que se llamó a la página 2 y que el scan acumuló los resultados
    expect(movieServiceSpy.getNowPlayingMovie).toHaveBeenCalledWith(2);
    expect(component.movies()?.length).toBe(2); // Película 1 + Película 2
    expect(component.movies()![1].title).toBe('Película 2');
  }));

  it('no debería cargar más si isLoading es true', () => {
    component.isLoading.set(true);
    movieServiceSpy.getNowPlayingMovie.calls.reset();

    component.loadMoreMovies();

    expect(movieServiceSpy.getNowPlayingMovie).not.toHaveBeenCalled();
  });
});
