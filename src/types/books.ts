export type BookSearchTarget = 'title' | 'isbn' | 'publisher' | 'person';
export type BookSearchSort = 'accuracy' | 'latest';

export interface BookSearchParams {
  query: string;
  sort?: BookSearchSort;
  page?: number;
  size?: number;
  target?: BookSearchTarget;
}

export interface BookMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface BookDocument {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface BookSearchResponse {
  meta: BookMeta;
  documents: BookDocument[];
}
