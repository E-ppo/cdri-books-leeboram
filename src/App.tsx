import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Layout from '@/Layout';
import SearchPage from '@/pages/Search/SearchPage';
import WishlistPage from '@/pages/Wishlist/WishlistPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
      </Route>
    </Routes>
  );
}

export default App;
