import { http, HttpResponse, delay } from 'msw';
import { sampleBooks } from '@/components/BookList/__fixtures__/books';
import type { BookSearchResponse } from '@/types/books';

const KAKAO_SEARCH_URL = `${import.meta.env.VITE_KAKAO_API_BASE_URL}/v3/search/book`;

const PAGE_SIZE = 10;

function createManyBooks(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const base = sampleBooks[i % sampleBooks.length];
    return {
      ...base,
      isbn: `${base.isbn}-${i}`,
      title: `${base.title} (${i + 1})`,
    };
  });
}

const paginatedBooks = createManyBooks(25);

export const handlers = [
  http.get(KAKAO_SEARCH_URL, async ({ request }) => {
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

    if (query === 'delay') {
      await delay(200);
      return HttpResponse.json<BookSearchResponse>({
        meta: {
          total_count: sampleBooks.length,
          pageable_count: sampleBooks.length,
          is_end: true,
        },
        documents: sampleBooks,
      });
    }

    if (query === 'paginated') {
      const start = (page - 1) * PAGE_SIZE;
      const pageDocuments = paginatedBooks.slice(start, start + PAGE_SIZE);
      const isEnd = start + PAGE_SIZE >= paginatedBooks.length;
      return HttpResponse.json<BookSearchResponse>({
        meta: {
          total_count: paginatedBooks.length,
          pageable_count: paginatedBooks.length,
          is_end: isEnd,
        },
        documents: pageDocuments,
      });
    }

    return HttpResponse.json<BookSearchResponse>({
      meta: {
        total_count: sampleBooks.length,
        pageable_count: sampleBooks.length,
        is_end: true,
      },
      documents: sampleBooks.slice(0, PAGE_SIZE),
    });
  }),
];
