export interface MovieResult {
  page: number;
  results: MovieListItems[];
  total_pages: number;
  total_results: number;
}

export interface MovieListItems {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetailItems {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: [];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ReviewItem {
  reviewId?: string;
  movieId?: number;
  content: string;
}

export interface PaginationInfo {
  currentPageNo: number;
  empty: boolean;
  endPage: boolean;
  firstPage: number;
  lastPage: number;
  pageSize: number;
  recordsPerPage: number;
  startPage: boolean;
  totalPageCount: number;
  totalRecordCount: number;
}
