import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, waitFor, within } from '@/test/test-utils';
import { triggerAllIntersections, getObserverCount } from '@/test/setup';
import SearchPage from './SearchPage';

function getSearchInput() {
  return screen.getByPlaceholderText('검색어를 입력하세요');
}

describe('SearchPage 통합 테스트', () => {
  it('검색어 입력 전에는 초기 안내 메시지가 노출된다', () => {
    renderWithProviders(<SearchPage />);
    expect(screen.getByText('관심 있는 도서를 검색해보세요')).toBeInTheDocument();
  });

  it('검색어 입력 후 Enter를 누르면 결과가 렌더된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.type(getSearchInput(), '이보람');
    await user.keyboard('{Enter}');

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });

  it('검색 결과가 없을 때 빈 상태 메시지를 노출한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.type(getSearchInput(), 'noresult');
    await user.keyboard('{Enter}');

    expect(await screen.findByText('검색결과가 없습니다.')).toBeInTheDocument();
  });

  it('응답이 도착하기 전에는 로딩 메시지를 노출한다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.type(getSearchInput(), 'delay');
    await user.keyboard('{Enter}');

    expect(await screen.findByText('검색 중...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('검색 중...')).not.toBeInTheDocument();
    });
  });

  it('검색 결과 총 개수가 ResultCount에 표시된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.type(getSearchInput(), '이보람');
    await user.keyboard('{Enter}');

    const resultCount = await screen.findByText(/도서 검색 결과/);
    expect(within(resultCount.parentElement as HTMLElement).getByText('4')).toBeInTheDocument();
  });

  it('상세 검색으로 검색을 실행하면 결과가 렌더된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.click(screen.getByRole('button', { name: '상세 검색' }));
    const dialog = await screen.findByRole('dialog');

    const detailInput = within(dialog).getByPlaceholderText('검색어 입력');
    await user.type(detailInput, '이보람');
    await user.click(within(dialog).getByRole('button', { name: '검색하기' }));

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });

  it('검색 후 다시 포커스하면 검색 기록을 클릭해 재검색할 수 있다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    const input = getSearchInput();
    await user.type(input, '이보람');
    await user.keyboard('{Enter}');
    await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를');

    await user.clear(input);
    await user.click(input);

    const historyButton = await screen.findByRole('button', { name: '이보람' });
    await user.click(historyButton);

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });

  it('히스토리에서 ↓ 키와 Enter로 재검색할 수 있다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    const input = getSearchInput();
    await user.type(input, '이보람');
    await user.keyboard('{Enter}');
    await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를');

    await user.clear(input);
    await user.click(input);
    await screen.findByRole('option', { name: /이보람/ });

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });

  it('무한 스크롤 sentinel이 노출되면 다음 페이지가 추가된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    await user.type(getSearchInput(), 'paginated');
    await user.keyboard('{Enter}');

    await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를 (1)');
    await waitFor(() => expect(getObserverCount()).toBeGreaterThan(0));
    triggerAllIntersections(true);

    expect(
      await screen.findByText(/\(11\)$/)
    ).toBeInTheDocument();
  });

  it('한글 IME 조합 중 Enter는 검색을 트리거하지 않는다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchPage />);

    const input = getSearchInput();
    await user.click(input);

    input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    await user.type(input, '이보람');
    await user.keyboard('{Enter}');

    expect(screen.getByText('관심 있는 도서를 검색해보세요')).toBeInTheDocument();

    input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
    await user.keyboard('{Enter}');

    expect(
      await screen.findByText('행복했으면 좋겠어 너에게는 늘 따스하고 예쁜 날들만 가득하기를')
    ).toBeInTheDocument();
  });
});
