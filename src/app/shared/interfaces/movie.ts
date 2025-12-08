export interface MovieDbResponse {
    results: ApiMovieData[],
}

export interface ApiMovieData {
    id: number,
    title: string,
    poster_path: string | null,
    overview: string, // Esto se mapeará a 'description'
    release_date: string, // Esto se mapeará a 'releaseDate'
    original_language: string,
    original_title: string,
    popularity: number
}

export interface ApiMovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    budget: number;
    genres: [];
    homepage: string | null;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: [];
    release_date: string; // Formato YYYY-MM-DD
    revenue: number;
    runtime: number | null; // Minutos
    status: string;
    tagline: string | null;
    title: string;
    vote_average: number;
    vote_count: number;
    video: boolean;
}

export interface Movie {
    id: number,
    title: string,
    img: string,
    releaseDate: string,
    description: string,
    popularity: number
}
export interface MovieDetails {
    id: number,
    genres: [],
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    productionCompanies: [];
    releaseDate: string;
}