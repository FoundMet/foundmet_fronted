import { Routes, Route } from "react-router-dom";
import "./global.css";
import Home from "./Home.jsx";
import Explore from "./Explore.jsx";
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}