import { Component, input } from '@angular/core';
import { Movie } from "@shared/interfaces/movie";

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();

  ngOnInit() {
    console.log(this.movie);
  }
}
