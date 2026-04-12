import { http, HttpResponse } from 'msw';
import { sampleBooks } from '@/components/BookList/__fixtures__/books';
import type { BookSearchResponse } from '@/types/books';

const KAKAO_SEARCH_URL = 'https://dapi.kakao.com/v3/search/book';

export const handlers = [
  http.get(KAKAO_SEARCH_URL, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') ?? '';
    const page = Number(url.searchParams.get('page') ?? '1');

    if (query.trim() === '') {
      return HttpResponse.json<BookSearchResponse>({
        meta: { total_count: 0, pageable_count: 0, is_end: true },
        documents: [],
      });
    }

    if (query === 'noresult') {
      return HttpResponse.json<BookSearchResponse>({
        meta: { total_count: 0, pageable_count: 0, is_end: true },
        documents: [],
      });
    }

    const documents = sampleBooks.slice(0, 10);
    return HttpResponse.json<BookSearchResponse>({
      meta: {
        total_count: sampleBooks.length,
        pageable_count: sampleBooks.length,
        is_end: page >= 1,
      },
      documents,
    });
  }),
];
