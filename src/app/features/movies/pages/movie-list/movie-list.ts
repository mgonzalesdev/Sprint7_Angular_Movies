import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from "@features/movies/services/themoviedb";

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private movieService = inject(Themoviedb);
  movies = toSignal(this.movieService.getNowPlayingMovie());


}
