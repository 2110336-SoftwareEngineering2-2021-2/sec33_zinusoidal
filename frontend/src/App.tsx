import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<></>} />
          <Route path="/login" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
