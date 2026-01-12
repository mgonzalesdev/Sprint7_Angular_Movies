import { Component, input } from '@angular/core';
import { Actor } from '@shared/interfaces/actor';

@Component({
  selector: 'app-actor-card',
  imports: [],
  templateUrl: './actor-card.html',
  styleUrl: './actor-card.scss',
})
export class ActorCard {
  actor = input<Actor>();

}
