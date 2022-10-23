import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import Single from "./pages/Single"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:slug" element={<Single />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
