import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from "@features/movies/services/themoviedb";
import { MovieCard } from "@features/movies/components/movie-card/movie-card";
import { RouterOutlet } from '@angular/router';
import { scan, switchMap } from 'rxjs';
import { Movie, movieDbResponse } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  imports: [RouterOutlet,MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList  {
  private movieService = inject(Themoviedb);
  private nextPage = signal(1);
  isLoading = signal(false);
  hasMorePages = signal(true);
  totalPages = signal(1);
  private nextPageTrigger = signal(1);

  private moviesData$ = toObservable(this.nextPage).pipe(
    switchMap(page => {
      this.isLoading.set(true);
      return this.movieService.getNowPlayingMovie(page)
    }),
    scan((acc: Movie[], value: movieDbResponse) => {
      this.isLoading.set(false);

      // ✅ ACCESO A totalPages: 
      // Almacenas el valor en la señal totalPages() para usarlo fuera de este pipe
      this.totalPages.set(value.totalPages);

      // ✅ ACCESO A results (movies): 
      // Devuelves el array customizado para que scan lo acumule
      return [...acc, ...value.movies];

    }, [] as Movie[]) // El valor inicial es un array vacío de CustomMovie
  );

  movies = toSignal(this.moviesData$, { initialValue: [] as Movie[] });

  // ... (loadMoreMovies, goToDetails, onWindowScroll methods) ...
  loadMoreMovies(): void {
    if (!this.isLoading() && this.hasMorePages()) {
      this.nextPage.update(page => page + 1);
    }
  }




}
