import { Routes } from "@angular/router";
import { MovieList } from '@features/movies/pages/movie-list/movie-list';
import { MovieDetail } from '@features/movies/pages/movie-detail/movie-detail';

export const routes: Routes = [
    {
        path: '',
        component: MovieList
    },
    {
        path: ':id',
        component: MovieDetail
    }
];