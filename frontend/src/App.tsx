import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import CustomerRegister from "./pages/CustomerRegisterPage";
import ProviderRegister from "./pages/ProviderRegisterPage";

import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import ProfileEdit from "./components/ProfileEdit";
import CustomerHome from "./pages/CustomerHome";
import SearchPage from "./pages/SearchPage";
import Teach from "./components/login/test";
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
          <Route path="/profile" element={<Profile />}>
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/test" element={<Teach />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
