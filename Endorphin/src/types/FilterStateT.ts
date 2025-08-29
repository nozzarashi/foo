export interface FilterStateT {
  page: number;
  selectedGenres: GenresListT[];
  sorting: SortingT;
}

export interface SortingT {
  name: string;
  value: string;
}

export interface GenresListT {
  name: string;
  slug: string;
}
