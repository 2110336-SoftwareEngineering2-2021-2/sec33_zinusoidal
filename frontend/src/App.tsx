import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import CustomerRegister from "./pages/CustomerRegisterPage";
import ProviderRegister from "./pages/ProviderRegisterPage";

import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";

import { Route, Routes, BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/provider" element={<ProviderRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
