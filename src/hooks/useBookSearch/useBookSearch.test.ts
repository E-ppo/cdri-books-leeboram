import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createElement } from 'react';
import { useBookSearch } from './useBookSearch';
import type { BookSearchResponse } from '@/types/books';

vi.mock('@/api/books', () => ({
  fetchBooks: vi.fn(),
}));

import { fetchBooks } from '@/api/books';

const mockFetchBooks = vi.mocked(fetchBooks);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

const mockResponse = (page: number, isEnd: boolean): BookSearchResponse => ({
  meta: {
    total_count: 25,
    pageable_count: 25,
    is_end: isEnd,
  },
  documents: [
    {
      title: `책 제목 ${page}`,
      contents: '책 소개',
      url: 'https://example.com',
      isbn: '1234567890',
      datetime: '2024-01-01T00:00:00.000+09:00',
      authors: ['저자'],
      publisher: '출판사',
      translators: [],
      price: 15000,
      sale_price: 13500,
      thumbnail: 'https://example.com/thumb.jpg',
      status: '정상판매',
    },
  ],
});

describe('useBookSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('query가 비어있으면 API를 호출하지 않아야 한다', () => {
    const { result } = renderHook(
      () => useBookSearch({ query: '' }),
      { wrapper: createWrapper() },
    );

    expect(result.current.isFetching).toBe(false);
    expect(mockFetchBooks).not.toHaveBeenCalled();
  });

  it('query가 공백만 있으면 API를 호출하지 않아야 한다', () => {
    const { result } = renderHook(
      () => useBookSearch({ query: '   ' }),
      { wrapper: createWrapper() },
    );

    expect(result.current.isFetching).toBe(false);
    expect(mockFetchBooks).not.toHaveBeenCalled();
  });

  it('query가 있으면 첫 페이지를 요청해야 한다', async () => {
    mockFetchBooks.mockResolvedValueOnce(mockResponse(1, false));

    const { result } = renderHook(
      () => useBookSearch({ query: '노르웨이 숲' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetchBooks).toHaveBeenCalledWith({
      query: '노르웨이 숲',
      page: 1,
    });
    expect(result.current.data?.pages[0].documents[0].title).toBe('책 제목 1');
  });

  it('다음 페이지가 있으면 hasNextPage가 true여야 한다', async () => {
    mockFetchBooks.mockResolvedValueOnce(mockResponse(1, false));

    const { result } = renderHook(
      () => useBookSearch({ query: '검색어' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);
  });

  it('마지막 페이지이면 hasNextPage가 false여야 한다', async () => {
    mockFetchBooks.mockResolvedValueOnce(mockResponse(1, true));

    const { result } = renderHook(
      () => useBookSearch({ query: '검색어' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });

  it('fetchNextPage로 다음 페이지를 요청할 수 있어야 한다', async () => {
    mockFetchBooks
      .mockResolvedValueOnce(mockResponse(1, false))
      .mockResolvedValueOnce(mockResponse(2, true));

    const { result } = renderHook(
      () => useBookSearch({ query: '검색어' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.fetchNextPage();

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

    expect(mockFetchBooks).toHaveBeenCalledWith({ query: '검색어', page: 2 });
    expect(result.current.data?.pages[1].documents[0].title).toBe('책 제목 2');
    expect(result.current.hasNextPage).toBe(false);
  });

  it('target 파라미터를 전달할 수 있어야 한다', async () => {
    mockFetchBooks.mockResolvedValueOnce(mockResponse(1, true));

    const { result } = renderHook(
      () => useBookSearch({ query: '하루키', target: 'person' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetchBooks).toHaveBeenCalledWith({
      query: '하루키',
      target: 'person',
      page: 1,
    });
  });

  it('API 에러 시 error 상태여야 한다', async () => {
    mockFetchBooks.mockRejectedValueOnce(new Error('API 오류'));

    const { result } = renderHook(
      () => useBookSearch({ query: '검색어' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe('API 오류');
  });
});
