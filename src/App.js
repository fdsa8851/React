import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./movieFolder/Home";
import Detail from "./movieFolder/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}>
        </Route>
        <Route
          path="/movie/:id"
          element={<Detail />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
