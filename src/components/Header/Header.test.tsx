import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@/test/test-utils';
import Header from './Header';

const navItems = [
  { to: '/', label: '도서 검색' },
  { to: '/wishlist', label: '내가 찜한 책' },
];

describe('Header', () => {
  it('타이틀과 네비게이션 항목을 렌더한다', () => {
    renderWithProviders(<Header title="CERTICOS BOOKS" navItems={navItems} />);

    expect(screen.getByText('CERTICOS BOOKS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '도서 검색' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '내가 찜한 책' })).toBeInTheDocument();
  });

  it('현재 경로에 해당하는 링크에 active 클래스를 부여한다', () => {
    renderWithProviders(
      <Header title="CERTICOS BOOKS" navItems={navItems} />,
      { route: '/wishlist' }
    );

    const wishlistLink = screen.getByRole('link', { name: '내가 찜한 책' });
    const searchLink = screen.getByRole('link', { name: '도서 검색' });

    expect(wishlistLink.className).toContain('active');
    expect(searchLink.className).not.toContain('active');
  });
});
