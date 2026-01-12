import { Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from '@features/movies/services/themoviedb';
import { Movie, MovieDetails } from '@shared/interfaces/movie';
import { switchMap, filter, BehaviorSubject, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActorCard } from '@features/movies/components/actor-card/actor-card';
import { Router } from '@angular/router';
import { MovieCard } from '@features/movies/components/movie-card/movie-card';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, ActorCard, MovieCard],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  isLoading = signal(true);
  error = signal<string | null>(null);
  private movieService = inject(Themoviedb);
  id = input.required<number>();
  private router = inject(Router);
  private id$ = toObservable(this.id);

  private details$ = toObservable(this.id).pipe(
    switchMap(id => this.movieService.getMovieDetails(id).pipe(
      catchError(err => {
        alert(err.error?.status_message || 'Película no encontrada');
        this.router.navigate(['/movies']);
        return of(null);
      })
    ))
  );

  private actors$ = this.id$.pipe(
    switchMap(id => this.movieService.getActors(id))
  );

  private recommendations$ = this.id$.pipe(
    switchMap(id => this.movieService.getRecommendations(id))
  );

  movie = toSignal(this.details$);
  actors = toSignal(this.actors$);
  recommendations = toSignal(this.recommendations$,{ initialValue: [] as Movie[] })
  

}


