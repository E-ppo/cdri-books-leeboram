import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import SearchPage from "@/pages/Search/SearchPage";
import WishlistPage from "@/pages/Wishlist/WishlistPage";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />
      <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
    </Routes>
  );
}

export default App;
