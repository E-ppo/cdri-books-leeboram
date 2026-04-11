import kakaoApi from './instance';
import type { BookSearchParams, BookSearchResponse } from '@/types/books';

export async function fetchBooks(params: BookSearchParams): Promise<BookSearchResponse> {
  const { data } = await kakaoApi.get<BookSearchResponse>('/v3/search/book', { params });
  return data;
}
