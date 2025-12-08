import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from "@features/movies/services/themoviedb";
import { MovieCard } from "@features/movies/components/movie-card/movie-card";

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private movieService = inject(Themoviedb);
  movies = toSignal(this.movieService.getNowPlayingMovie());




}
