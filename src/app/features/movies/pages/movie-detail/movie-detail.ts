import { Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from '@features/movies/services/themoviedb';
import { MovieDetails } from '@shared/interfaces/movie';
import { switchMap, filter, BehaviorSubject, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActorCard } from '@features/movies/components/actor-card/actor-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, ActorCard],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetail {
  // @Input() id?: number;
  isLoading = signal(true);
  error = signal<string | null>(null);
  private movieService = inject(Themoviedb);

  id = input.required<number>();
  private router = inject(Router);

  private id$ = toObservable(this.id);


  private details$ = toObservable(this.id).pipe(
    switchMap(id => this.movieService.getMovieDetails(id).pipe(
      catchError(err => {
        // 1. Mostrar el mensaje de la API (ej: "The resource... could not be found")
        alert(err.error?.status_message || 'Película no encontrada');

        // 2. Redireccionar a la cartelera
        this.router.navigate(['/movies']);

        return of(null); // Retornamos null para cerrar el flujo
      })
    ))
  );

  private actors$ = this.id$.pipe(
    switchMap(id => this.movieService.getActors(id))
  );

  movie = toSignal(this.details$);
  actors = toSignal(this.actors$);



}


