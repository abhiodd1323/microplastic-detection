import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";

import Home from "./pages/Home";
import Detect from "./pages/Detect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/Home" element={<Home />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;