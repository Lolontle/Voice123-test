import React from "react";
import Home from "../src/components/Home";
import ResultsPage from "../src/components/ResultsPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:query/:page" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
