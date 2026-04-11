import { describe, it, expect, beforeEach } from 'vitest';
import { useWishlistStore } from './wishlistStore';
import type { BookDocument } from '@/types/books';

const { getState } = useWishlistStore;

const mockBook: BookDocument = {
  title: '고양이를 버리다',
  contents: '무라카미 하루키 에세이',
  url: 'https://example.com',
  isbn: '1234567890',
  datetime: '2024-01-01',
  authors: ['무라카미 하루키'],
  publisher: '문학동네',
  translators: [],
  price: 16000,
  sale_price: 13500,
  thumbnail: 'https://example.com/thumb.jpg',
  status: '정상판매',
};

const mockBook2: BookDocument = {
  ...mockBook,
  title: '상실의 시대',
  isbn: '0987654321',
};

describe('wishlistStore', () => {
  beforeEach(() => {
    getState().books = [];
  });

  it('초기 상태는 빈 배열이어야 한다', () => {
    expect(getState().books).toEqual([]);
  });

  it('책을 찜 목록에 추가할 수 있어야 한다', () => {
    getState().toggleWishlist(mockBook);

    expect(getState().books).toHaveLength(1);
    expect(getState().books[0].isbn).toBe('1234567890');
  });

  it('이미 찜한 책을 다시 토글하면 제거되어야 한다', () => {
    getState().toggleWishlist(mockBook);
    getState().toggleWishlist(mockBook);

    expect(getState().books).toHaveLength(0);
  });

  it('여러 책을 찜할 수 있어야 한다', () => {
    getState().toggleWishlist(mockBook);
    getState().toggleWishlist(mockBook2);

    expect(getState().books).toHaveLength(2);
  });

  it('특정 책의 찜 여부를 확인할 수 있어야 한다', () => {
    getState().toggleWishlist(mockBook);

    expect(getState().isWishlisted('1234567890')).toBe(true);
    expect(getState().isWishlisted('0987654321')).toBe(false);
  });

  it('찜 해제 후 isWishlisted가 false를 반환해야 한다', () => {
    getState().toggleWishlist(mockBook);
    getState().toggleWishlist(mockBook);

    expect(getState().isWishlisted('1234567890')).toBe(false);
  });

  it('하나를 제거해도 다른 찜 목록에 영향이 없어야 한다', () => {
    getState().toggleWishlist(mockBook);
    getState().toggleWishlist(mockBook2);
    getState().toggleWishlist(mockBook);

    expect(getState().books).toHaveLength(1);
    expect(getState().books[0].isbn).toBe('0987654321');
  });
});
