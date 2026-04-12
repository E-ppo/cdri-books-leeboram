# CERTICOS BOOKS

카카오 도서 검색 API를 이용한 도서 검색·찜 관리 웹 애플리케이션입니다.

> 기능 구현에 더해 **요구사항을 해석한 의도적 결정**, **접근성**, **반응형**, **테스트 커버리지**, **로딩 성능**까지 폭넓게 신경 썼습니다. 각 결정의 배경과 근거는 [docs/개선사항.md](docs/개선사항.md)에 정리되어 있습니다.

---

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 만들고 아래 두 값을 채웁니다.

```env
VITE_KAKAO_API_BASE_URL=https://dapi.kakao.com
VITE_KAKAO_API_KEY=본인의_카카오_REST_API_키
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 프로덕션 빌드 & 미리보기

```bash
npm run build
npm run preview
```

### 테스트 · 스토리북

```bash
npm test                # vitest watch
npm run test:coverage   # 커버리지 리포트 (coverage/index.html)
npm run storybook       # Storybook 개발 서버 (:6006)
npm run lint            # ESLint
```

---

## 기술 스택 및 선택 이유

| 라이브러리 | 선택 이유 |
|---|---|
| **React 19 + TypeScript** | 최신 React의 `useId` 등 접근성 친화 API 활용, TS로 도메인 타입 안전성 확보 |
| **Vite** | 빠른 개발 서버, SVG를 React 컴포넌트로 import(`vite-plugin-svgr`) |
| **TanStack Query v5** | 서버 상태 캐싱·무한 쿼리를 선언적으로 처리 (`useInfiniteQuery`) |
| **Zustand + persist** | Context 없이 가벼운 전역 상태, localStorage 동기화 미들웨어로 세션 연속성 확보 |
| **React Router v7** | NavLink `aria-current="page"` 자동 부여 등 표준 라우팅 |
| **Tailwind CSS v4** | `@theme` 디자인 토큰, `cn` 헬퍼(clsx + tailwind-merge)로 클래스 병합 안전성 |
| **Vitest + Testing Library** | Vite 통합, jsdom 기반 단위/통합 테스트 |
| **MSW** | 네트워크 레이어에서 카카오 API 모킹 — 통합 테스트 자연스럽게 구성 |
| **Storybook** | 프리미티브 컴포넌트 시각 검증 및 문서화 |
| **Axios** | 인터셉터·인스턴스 분리로 Authorization 헤더 관리 편의 |

---

## 폴더 구조

```
src/
├── api/                    # axios 인스턴스 + 엔드포인트 래퍼
├── assets/                 # 이미지·SVG
├── components/             # 재사용 컴포넌트 (프리미티브 + composite)
│   ├── Accordion/          # Compound Component 패턴
│   ├── BookList/           # 도서 목록 (composite)
│   │   └── __fixtures__/   # 스토리북·테스트용 실제 응답 fixture
│   ├── BookList/
│   ├── Button/
│   ├── DetailSearchPopup/  # Dialog 패턴 모달
│   ├── Dropdown/           # Combobox 패턴
│   ├── Header/
│   ├── Icon/               # 장식 기본 aria-hidden 정책
│   ├── ResultCount/
│   ├── SearchBar/          # Combobox + Listbox 패턴
│   └── StatusMessage/      # role=status / aria-live
├── constants/              # 라우트 등 상수
├── hooks/
│   ├── useBookSearch/      # TanStack useInfiniteQuery 래퍼
│   ├── useInfiniteScroll/  # IntersectionObserver 기반
│   └── useMediaQuery/      # 반응형 JS 분기
├── pages/
│   ├── Search/             # 검색 페이지 + 서브 컴포넌트
│   └── Wishlist/           # 찜 페이지
├── stores/
│   ├── searchHistoryStore/ # 검색 기록 (Set 기반 중복 방지, 최대 8개)
│   └── wishlistStore/      # 찜 목록 (ISBN 기준)
├── test/
│   ├── mocks/              # MSW handlers/server
│   ├── setup.ts            # jest-dom · IntersectionObserver · matchMedia 폴리필
│   └── test-utils.tsx      # renderWithProviders (Router + QueryClient)
├── types/
└── utils/
    └── cn.ts               # clsx + tailwind-merge
```

---

## 의도적으로 한 결정

요구사항 문구를 그대로 따른 것처럼 보이지 않을 수 있는 부분은 **요구사항을 해석한 결과**임을 먼저 밝혀둡니다. 배경과 근거는 [docs/개선사항.md](docs/개선사항.md)에서 자세히 확인하실 수 있습니다.

- **상세 검색 후에도 검색창에 검색어 유지** — 요구사항 "전체 검색과 상세 검색은 동시에 진행 불가"를 **검색 결과의 배타성**(한 번에 하나의 결과만 활성)으로 해석했습니다. 기존 결과가 새 결과로 교체되는 것만으로 조건이 충족되므로, 검색창 표시와 요구사항은 충돌하지 않습니다. Nielsen 휴리스틱 #1·#6을 근거로 삼았습니다.
- **무한 스크롤로 페이지네이션** — 요구사항 "페이지당 10개 아이템"을 **API 호출 단위**로 해석했습니다. 데이터 계약(`size=10`)은 그대로 유지하고, UI는 페이지 이동의 맥락 단절 없이 연속 탐색이 가능한 무한 스크롤로 구현했습니다.

---

## 강조하고 싶은 기능

구현 세부는 [docs/개선사항.md](docs/개선사항.md)에서 확인하실 수 있습니다.

- **사용자 경험** — 무한 스크롤 / 검색 기록·찜 localStorage 영속화 / 한글 IME 안전 처리
- **접근성** — ARIA Combobox·Dialog·Disclosure 패턴 적용, 포커스 관리, 키보드 완전 지원
- **반응형** — 3단계 브레이크포인트, CSS 우선·JS는 `useMediaQuery`로 최소 분기
- **성능** — 폰트 셀프호스팅으로 FOUT 제거, LCP 이미지 `fetchPriority="high"`
- **품질 관리** — Storybook 시각 검증, Compound Component 패턴

---

## 테스트

단위·통합 테스트 중심으로 비즈니스 로직과 주요 사용자 시나리오를 검증하고, UI 컴포넌트 시각 검증은 Storybook에 분담했습니다.

### 커버리지

| 지표 | % |
|---|---|
| Statements | **96.21%** |
| Lines | 98.19% |
| Functions | 97.01% |
| Branches | 83.05% |

> Storybook 시각 검증 대상 컴포넌트(Accordion, DetailSearchPopup, Dropdown 등)와 라우팅 배선(App, Layout)·상수·정적 자원은 coverage exclude로 제외해 **지표를 인위적으로 부풀리지 않았습니다**.

### 테스트 전략

| 레이어 | 방식 | 대상 |
|---|---|---|
| **단위 테스트** | Vitest + jsdom | 스토어 도메인 규칙, 커스텀 훅 |
| **통합 테스트** | Vitest + Testing Library + MSW | 페이지 단위 사용자 시나리오 |
| **시각 검증** | Storybook + `@storybook/addon-vitest` (Playwright) | 프리미티브·composite 컴포넌트 |

### 인프라

- **MSW** — 네트워크 레이어에서 카카오 API 모킹 (`src/test/mocks/`). `noresult`·`delay`·`paginated` 등 시나리오별 응답 핸들러로 엣지케이스 재현
- **renderWithProviders** — Router + QueryClient를 래핑한 테스트 헬퍼 (`src/test/test-utils.tsx`)
- **IntersectionObserver·matchMedia 폴리필** — jsdom 기본 미제공 API에 대한 목업 + 트리거 헬퍼 (`src/test/setup.ts`)
- **실제 API 응답 fixture** — 스토리북·테스트 공용 (`src/components/BookList/__fixtures__/`)

### 커버하는 주요 시나리오

**SearchPage 통합 테스트**
- 초기 안내 메시지 노출
- 검색어 입력 → 결과 렌더
- 결과 없음 → 빈 상태 메시지
- 응답 도착 전 로딩 메시지
- ResultCount 총 개수 표시
- 상세 검색 팝업으로 검색 실행
- 검색 기록 클릭으로 재검색
- 히스토리 ↓/Enter 키보드 재검색
- 무한 스크롤 sentinel 트리거 → 다음 페이지 추가
- 한글 IME 조합 중 Enter 무시

**WishlistPage 통합 테스트**
- 빈 상태 메시지
- 찜한 책 목록·개수 렌더
- 상세 펼침 후 찜 해제 → 목록 제거

**단위 테스트**
- `searchHistoryStore` — 중복 방지, 최대 8개 유지, 삭제
- `wishlistStore` — ISBN 기준 토글, `isWishlisted` 셀렉터
- `useBookSearch` — 공백 쿼리 차단, 페이지네이션, `is_end` 처리
- `useMediaQuery` — matchMedia 구독·cleanup
- `Header` — 타이틀·링크 렌더, active 클래스

### Storybook 시각 검증

프리미티브 및 composite 컴포넌트의 다양한 상태를 스토리로 작성해 시각적으로 검증합니다. `@storybook/addon-vitest` + Playwright 브라우저 프로젝트로 **스토리 자체가 테스트**로 실행되어 렌더링 회귀를 잡습니다.

- **총 10개 스토리 파일** — Accordion, Button, BookList, DetailSearchPopup, Dropdown, Header, Icon, ResultCount, SearchBar, StatusMessage
- **실제 API 응답 fixture 활용** — BookList 스토리는 실제 카카오 API 응답과 로컬 썸네일 이미지로 구성 (`__fixtures__/`)
- **시나리오별 스토리** — 예: BookList는 `Default` / `Single` / `Empty` / `WithWishlisted` 4가지 상태

### 실행

```bash
npm test                # watch 모드
npm run test:coverage   # 리포트 생성 (coverage/index.html)
npm run storybook       # Storybook 개발 서버 (:6006)
```

---

## 문서

- [docs/개선사항.md](docs/개선사항.md) — 각 결정의 배경·접근·구현·근거·관련 파일을 섹션별로 정리 (접힘 토글 UI)
