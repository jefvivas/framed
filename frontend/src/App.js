import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Search";
import "./Search.css";
import Insert from "./Insert";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/salvar" element={<Insert/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
