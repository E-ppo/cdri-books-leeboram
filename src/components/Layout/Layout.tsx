import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header className="px-40">
        <div>Header</div>
      </header>
      <main className="mx-auto max-w-[960px]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
