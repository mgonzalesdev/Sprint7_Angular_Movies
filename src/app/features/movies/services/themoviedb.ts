import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { movieDbResponse, ApiMovie, Movie, ApiMovieDetails, MovieDetails, apiMoviesResponse } from "@shared/interfaces/movie";
import { Actor, ApiActor, CreditsResponse } from '@shared/interfaces/actor';


@Injectable({
  providedIn: 'root',
})
export class Themoviedb {
  //"https://api.themoviedb.org/3/movie/now_playing?page=1";
  //https://api.themoviedb.org/3/movie/1084242/credits?language=en-US  cretitso
  private readonly http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private apiKey = environment.accessToken;
  private imgUrl = environment.imgUrl;

  getNowPlayingMovie(page: number = 1): Observable<movieDbResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    });
    let params = new HttpParams().set('page', page.toString())
    return this.http.get<apiMoviesResponse>(`${this.baseUrl}/now_playing`, { headers, params })
      .pipe(
        map(apiResponse => this.mapToCustomResponse(apiResponse)
        ));
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    })
    return this.http.get<ApiMovieDetails>(`${this.baseUrl}/${id}`, { headers }).
      pipe(map(response => this.mapToMovieDetails(response)));
  }

  getActors(movieId: number): Observable<Actor[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    })
    return this.http.get<CreditsResponse>(`${this.baseUrl}/${movieId}/credits`, { headers }).
      pipe(map(response => response.cast.map(item => this.mapToCustomActor(item))));
  }

  getRecommendations(id: number): Observable<Movie[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    })
    return this.http.get<apiMoviesResponse>(`${this.baseUrl}/${id}/recommendations`, { headers })
      .pipe(
        map(response => response.results.map(apiMovie => this.mapToCustomMovie(apiMovie)))
      );
  }

  private mapToCustomResponse(apiResponse: apiMoviesResponse): movieDbResponse {
    const customMoviesList: Movie[] = apiResponse.results.map(apiMovie =>
      this.mapToCustomMovie(apiMovie)
    );

    return {
      totalPages: apiResponse.total_pages,
      movies: customMoviesList
    };
  }

  private mapToCustomMovie(data: ApiMovie): Movie {
    return {
      id: data.id,
      title: data.title,
      img: data.poster_path ? `${this.imgUrl}${data.poster_path}` : '/placeholder.png',
      posterBackdrop: data.backdrop_path ? data.backdrop_path : '/placeholder.png',
      releaseDate: data.release_date,
      description: data.overview,
      popularity: data.popularity
    };
  }
  private mapToMovieDetails(data: ApiMovieDetails): MovieDetails {
    return {
      id: data.id,
      genres: data.genres.map(genre => genre.name).join(','),
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      img: data.poster_path ? `${this.imgUrl}${data.poster_path}` : '/placeholder.png',
      posterBackdrop: data.backdrop_path ? `${this.imgUrl}${data.backdrop_path}` : '/placeholder.png',
      productionCompanies: data.production_companies,
      releaseDate: data.release_date,
      runtime: this.transform(data.runtime),
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }
  }
  private mapToCustomActor(data: ApiActor): Actor {
    return {
      name: data.name,
      imgProfile: data.profile_path ? `${this.imgUrl}${data.profile_path}` : '/person.png',
      character: data.character
    }
  }
  private transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft}:00`
  }
}
