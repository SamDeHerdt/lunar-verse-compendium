import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterCompendium from "./pages/characterSearch/CharacterSearch";
import NotFound from "./pages/404/404";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<CharacterCompendium />} />

        {/* 404 page route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
