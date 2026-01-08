import { Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Themoviedb } from '@features/movies/services/themoviedb';
import { MovieDetails } from '@shared/interfaces/movie';
import { switchMap, filter, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActorCard } from '@features/movies/components/actor-card/actor-card';

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
  // user = toSignal(this.movieService.getMovieDetails(11));
  //id = input.required<number>();
  //@Input() id?: number;
  id = input.required<number>();

  // --- 1. Crear Observables a partir de la Señal 'id' ---

  // Convierte la señal 'id' en un Observable que emite cada vez que el ID cambia
  private id$ = toObservable(this.id);

  // Usa switchMap para aplanar el flujo y llamar al servicio para los detalles
  private details$ = this.id$.pipe(
    switchMap(id => this.movieService.getMovieDetails(id))
  );

  // Usa switchMap para aplanar el flujo y llamar al servicio para los actores
  private actors$ = this.id$.pipe(
    switchMap(id => this.movieService.getActors(id))
  );


  // --- 2. Convertir los Observables de vuelta a Señales ---

  // Ahora sí, pasamos Observables a toSignal()
  movie= toSignal(this.details$);
  actors = toSignal(this.actors$);



}


/*
import { toSignal } from '@angular/core/rxjs-interop';

@Input()
set id(movieIdString: string) {
  // 1. Esto crearía una NUEVA señal cada vez que cambia el ID.
  //    No es reactivo al cambio, es recreativo.
  this.actors = toSignal(this.moviesService.getActors(+movieIdString)); 
  
  // 2. Además, toSignal() requiere un contexto de inyección que no está disponible 
  //    dentro de un setter o ngOnChanges. 
}
*/