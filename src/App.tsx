import { Routes, Route } from "react-router-dom";
import Icon from "./components/Icon/Icon";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Icon name="LikeFill" width={24} height={24} />
            Home
          </div>
        }
      />
    </Routes>
  );
}

export default App;
