import { DatePipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from "@shared/interfaces/movie";

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink,SlicePipe,DatePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input.required<Movie>();
  
  ngOnInit() {
    //console.log(this.movie);
  }
}
