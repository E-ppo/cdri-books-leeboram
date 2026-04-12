import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen } from '@/test/test-utils';
import SearchPage from './SearchPage';

describe('SearchPage 통합 테스트', () => {
  it('검색어 입력 전에는 초기 안내 메시지가 노출된다', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByText('관심 있는 도서를 검색해보세요')).toBeInTheDocument();
  });

  it('검색어 입력 후 Enter를 누르면 결과가 렌더된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    await user.type(input, '이보람');
    await user.keyboard('{Enter}');

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });
});
