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
export interface Movie {
    id: number,
    title: string,
    img: string,
    releaseDate: string,
    description: string,
    popularity: number
}

