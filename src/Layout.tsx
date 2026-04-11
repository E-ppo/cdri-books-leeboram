import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { to: ROUTES.SEARCH, label: '도서 검색' },
  { to: ROUTES.WISHLIST, label: '내가 찜한 책' },
];

function Layout() {
  return (
    <div className="px-[clamp(1rem,8.33vw,10rem)]">
      <Header title="CERTICOS BOOKS" navItems={NAV_ITEMS} />
      <main className="mx-auto max-w-240">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
