import { describe, expect, it, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '@/test/test-utils';
import { useWishlistStore } from '@/stores/wishlistStore/wishlistStore';
import { sampleBooks } from '@/components/BookList/__fixtures__/books';
import WishlistPage from './WishlistPage';

describe('WishlistPage 통합 테스트', () => {
  beforeEach(() => {
    useWishlistStore.setState({ books: [] });
  });

  it('찜한 책이 없을 때 빈 상태 메시지를 노출한다', () => {
    renderWithProviders(<WishlistPage />);
    expect(screen.getByText('찜한 책이 없습니다.')).toBeInTheDocument();
  });

  it('스토어에 담긴 찜한 책을 렌더하고 개수를 표시한다', () => {
    useWishlistStore.setState({ books: sampleBooks.slice(0, 2) });
    renderWithProviders(<WishlistPage />);

    expect(screen.getByText(sampleBooks[0].title)).toBeInTheDocument();
    expect(screen.getByText(sampleBooks[1].title)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('책 항목을 펼치면 상세 카드가 노출되고 찜 해제로 목록에서 제거된다', async () => {
    const user = userEvent.setup();
    useWishlistStore.setState({ books: [sampleBooks[0]] });
    renderWithProviders(<WishlistPage />);

    await user.click(screen.getByText('상세보기'));

    const unlikeButton = await screen.findByLabelText('찜 해제');
    await user.click(unlikeButton);

    expect(screen.queryByText(sampleBooks[0].title)).not.toBeInTheDocument();
    expect(screen.getByText('찜한 책이 없습니다.')).toBeInTheDocument();
  });
});
