import { Component, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from "@features/movies/services/themoviedb";
import { MovieCard } from "@features/movies/components/movie-card/movie-card";
import { RouterOutlet } from '@angular/router';
import { scan, switchMap } from 'rxjs';
import { Movie, movieDbResponse } from '@shared/interfaces/movie';

@Component({
  selector: 'app-movie-list',
  imports: [RouterOutlet, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private movieService = inject(Themoviedb);
  private nextPage = signal(1);
  isLoading = signal(false);
  hasMorePages = signal(true);
  totalPages = signal(1);

  private moviesData$ = toObservable(this.nextPage).pipe(
    switchMap(page => {
      this.isLoading.set(true);
      return this.movieService.getNowPlayingMovie(page)
    }),
    scan((acc: Movie[], value: movieDbResponse) => {
      this.isLoading.set(false);

      // Guarda el valor en la señal totalPages()
      this.totalPages.set(value.totalPages);
      return [...acc, ...value.movies];

    }, [] as Movie[])
  );

  movies = toSignal(this.moviesData$, { initialValue: [] as Movie[] });

  loadMoreMovies(): void {
    if (!this.isLoading() && this.hasMorePages()) {
      this.nextPage.update(page => page + 1);
    }
  }
}
