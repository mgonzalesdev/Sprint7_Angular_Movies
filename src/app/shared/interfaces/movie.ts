export interface apiMoviesResponse {
    total_pages: number,
    results: ApiMovie[],
}
export interface movieDbResponse {
    totalPages: number,
    movies: Movie[],
}

export interface ApiMovie {
    id: number,
    title: string,
    backdrop_path: string | null,
    poster_path: string | null,
    overview: string, // Esto se mapeará a 'description'
    release_date: string, // Esto se mapeará a 'releaseDate'
    original_language: string,
    original_title: string,
    popularity: number
}
export interface Genre {
    id: number;
    name: string;
}

export interface ApiMovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    budget: number;
    genres: Genre[];
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
export interface CreditsResponse {
    id: number;
    cast: ApiActor[];
    // crew?: any[]; // La tripulación/equipo de producción, si se necesita incluir
}

export interface ApiActor {
    adult: boolean;
    gender: number; // 1 = Femenino, 2 = Masculino, 0/3 = No especificado/otro
    id: number;
    known_for_department: string; // ej: "Acting"
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // La ruta del archivo de la imagen, a menudo comienza con '/'. Puede ser null.
    cast_id?: number; // Opcional, específico si es parte de una lista de reparto (cast)
    character?: string; // Opcional, el nombre del personaje si es parte de un reparto
    credit_id: string;
    order?: number;
}
export interface Actor {
    name: string,
    imgProfile: string,
    character?: string;
}
export interface Movie {
    id: number,
    title: string,
    img: string,
    posterBackdrop: string,
    releaseDate: string,
    description: string,
    popularity: number
}
export interface MovieDetails {
    id: number,
    genres: string,
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    img: string | null;
    posterBackdrop: string | null;
    productionCompanies: [];
    releaseDate: string;
}