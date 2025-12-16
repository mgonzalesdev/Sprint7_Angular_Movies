import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@core/components/navbar/navbar';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit{
  protected title = 'movie_app';
    ngOnInit(): void {
    initFlowbite();
  }
}
