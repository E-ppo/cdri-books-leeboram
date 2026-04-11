import { describe, it, expect, beforeEach } from 'vitest';
import { useSearchHistoryStore } from './searchHistoryStore';

const { getState } = useSearchHistoryStore;

describe('searchHistoryStore', () => {
  beforeEach(() => {
    getState().clearHistory();
  });

  it('초기 상태는 빈 배열이어야 한다', () => {
    expect(getState().history).toEqual([]);
  });

  it('검색 기록을 추가할 수 있어야 한다', () => {
    getState().addHistory({ keyword: '노르웨이 숲', category: '제목' });

    expect(getState().history).toHaveLength(1);
    expect(getState().history[0].keyword).toBe('노르웨이 숲');
    expect(getState().history[0].category).toBe('제목');
  });

  it('중복 검색 기록은 추가되지 않아야 한다', () => {
    getState().addHistory({ keyword: '노르웨이 숲', category: '제목' });
    getState().addHistory({ keyword: '노르웨이 숲', category: '제목' });

    expect(getState().history).toHaveLength(1);
  });

  it('같은 키워드라도 카테고리가 다르면 추가되어야 한다', () => {
    getState().addHistory({ keyword: '노르웨이 숲', category: '제목' });
    getState().addHistory({ keyword: '노르웨이 숲', category: '저자명' });

    expect(getState().history).toHaveLength(2);
  });

  it('새로운 기록이 맨 앞에 추가되어야 한다', () => {
    getState().addHistory({ keyword: '첫 번째', category: '제목' });
    getState().addHistory({ keyword: '두 번째', category: '제목' });

    expect(getState().history[0].keyword).toBe('두 번째');
    expect(getState().history[1].keyword).toBe('첫 번째');
  });

  it('최대 8개까지만 저장되어야 한다', () => {
    for (let i = 0; i < 10; i++) {
      getState().addHistory({ keyword: `검색어${i}`, category: '제목' });
    }

    expect(getState().history).toHaveLength(8);
  });

  it('8개 초과 시 오래된 기록부터 삭제되어야 한다', () => {
    for (let i = 0; i < 9; i++) {
      getState().addHistory({ keyword: `검색어${i}`, category: '제목' });
    }

    expect(getState().history[0].keyword).toBe('검색어8');
    expect(getState().history[7].keyword).toBe('검색어1');
  });

  it('특정 기록을 삭제할 수 있어야 한다', () => {
    getState().addHistory({ keyword: '삭제할 기록', category: '제목' });
    const id = getState().history[0].id;

    getState().deleteHistory(id);

    expect(getState().history).toHaveLength(0);
  });

  it('전체 기록을 초기화할 수 있어야 한다', () => {
    getState().addHistory({ keyword: '기록1', category: '제목' });
    getState().addHistory({ keyword: '기록2', category: '저자명' });

    getState().clearHistory();

    expect(getState().history).toEqual([]);
  });

  it('추가된 기록에 id와 timestamp가 포함되어야 한다', () => {
    getState().addHistory({ keyword: '테스트', category: '제목' });
    const item = getState().history[0];

    expect(item.id).toBeDefined();
    expect(item.timestamp).toBeDefined();
    expect(typeof item.id).toBe('string');
    expect(typeof item.timestamp).toBe('number');
  });
});
