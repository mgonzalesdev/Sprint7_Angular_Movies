import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { MovieDbResponse, ApiMovieData, Movie } from "@shared/interfaces/movie";


@Injectable({
  providedIn: 'root',
})
export class Themoviedb {
  //"https://api.themoviedb.org/3/movie/now_playing?page=1";
  private readonly http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private apiKey = environment.accessToken;

  getNowPlayingMovie(page: number = 1): Observable<Movie[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    })
    let params = new HttpParams().set('page', page.toString())
    //return this.http.get<MovieDbResponse>(`${this.baseUrl}/now_playing?page=${page}`);
    return this.http.get<MovieDbResponse>(`${this.baseUrl}/now_playing`, { headers, params })
    .pipe(map(response => response.results.map(item => this.mapToCustomMovie(item))));
  }

  /*getNowPlayingMovie(page: number = 1): Observable<MovieDbResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    })
    let params = new HttpParams().set('page', page.toString())
    //return this.http.get<MovieDbResponse>(`${this.baseUrl}/now_playing?page=${page}`);
    return this.http.get<MovieDbResponse>(`${this.baseUrl}/now_playing`, { headers, params });
  }*/
  getPopularMovies(page = 1) { }

  private mapToCustomMovie(data: ApiMovieData): Movie {
    return {
      id: data.id,
      title: data.title,
      img: data.poster_path ? data.poster_path : 'assets/images/placeholder.png',
      // img: data.poster_path ? `${this.imageUrlBase}${result.poster_path}` : 'assets/images/placeholder.png',
      releaseDate: data.release_date,
      description: data.overview,
      popularity: data.popularity
    };
  }
}
