import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import Home from "./pages/Home"
import Single from "./pages/Single"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/resume" element={<Home />}></Route>
        <Route path="/resume/:slug" element={<Single />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
