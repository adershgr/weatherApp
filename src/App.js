import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./components/Home";
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:location" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
