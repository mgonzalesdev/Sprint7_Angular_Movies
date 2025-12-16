import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { movieDbResponse, ApiMovie, Movie, ApiMovieDetails, MovieDetails, ApiActor, Actor, CreditsResponse, apiMoviesResponse } from "@shared/interfaces/movie";


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
    private mapToCustomResponse(apiResponse: apiMoviesResponse): movieDbResponse {
    // 1. Mapeamos los resultados customizados
    const customMoviesList: Movie[] = apiResponse.results.map(apiMovie => 
      this.mapToCustomMovie(apiMovie)
    );

    // 2. Devolvemos el objeto customizado que incluye totalPages y el array customizado
    return {
      totalPages: apiResponse.total_pages, 
      movies: customMoviesList
    };
  }

  /*getNowPlayingMovie(page: number = 1): Observable<MovieDbResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'accept': 'application/json'
    });
    let params = new HttpParams().set('page', page.toString())
    return this.http.get<MovieDbResponse>(`${this.baseUrl}/now_playing`, { headers, params });
  }*/

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



  private mapToCustomMovie(data: ApiMovie): Movie {
    return {
      id: data.id,
      title: data.title,
      img: data.poster_path ? `${this.imgUrl}${data.poster_path}` : 'assets/images/placeholder.png',
      posterBackdrop: data.backdrop_path ? data.backdrop_path : 'assets/images/placeholder.png',
      // img: data.poster_path ? `${this.imageUrlBase}${result.poster_path}` : 'assets/images/placeholder.png',
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
      img: data.poster_path ? `${this.imgUrl}${data.poster_path}` : 'assets/images/placeholder.jpg',
      posterBackdrop: data.backdrop_path ? `${this.imgUrl}${data.backdrop_path}` : 'assets/images/placeholder.jpg',
      productionCompanies: data.production_companies,
      releaseDate: data.release_date
    }
  }
  private mapToCustomActor(data: ApiActor): Actor {
    return {
      name: data.name,
      imgProfile: data.profile_path ? `${this.imgUrl}${data.profile_path}` : 'assets/images/placeholder.png',
      character: data.character
    };
  }
}
