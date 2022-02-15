import React, { useMemo, useState, useEffect } from "react";
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
import { UserContext } from "./context/UserContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const App = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  useEffect(() => {
    const data = cookies.get("token");
    setUser(data);
  }, []);

  cookies.set("myCat", "Pacman", { path: "/" });
  console.log(cookies.get("myCat")); // Pacman
  return (
    <UserContext.Provider value={value}>
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
    </UserContext.Provider>
  );
};

export default App;
