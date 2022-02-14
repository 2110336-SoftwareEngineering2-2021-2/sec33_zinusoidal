import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import CustomerRegister from "./pages/CustomerRegisterPage";
import ProviderRegister from "./pages/ProviderRegisterPage";

import LoginPage from "./pages/LoginPage";
import CustomerHome from "./pages/CustomerHome";
import SearchPage from "./pages/SearchPage";
import EditProfilePage from "./pages/EditProfilePage";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchDetail from "./components/search/SearchDetail";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/provider" element={<ProviderRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
