import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // Import HashRouter
import Home from "./components/Home";
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:location" element={<Weather />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
