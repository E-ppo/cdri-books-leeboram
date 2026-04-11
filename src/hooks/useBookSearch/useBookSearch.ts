import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBooks } from '@/api/books';
import type { BookSearchParams } from '@/types/books';

export function useBookSearch(params: Omit<BookSearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['books', params],
    queryFn: ({ pageParam }) => fetchBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
    enabled: params.query.trim().length > 0,
  });
}
