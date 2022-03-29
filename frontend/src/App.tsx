import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import CustomerRegister from "./pages/CustomerRegisterPage";
import ProviderRegister from "./pages/ProviderRegisterPage";

import LoginPage from "./pages/LoginPage";
import CustomerHome from "./pages/CustomerHome";
import SearchPage from "./pages/SearchPage";
import EditProfilePage from "./pages/EditProfilePage";
import CustomerChangePassword from "./pages/CustomerChangePassword";
import CustomerDeleteAccount from "./pages/CustomerDeleteAccount";

import Appointment from "./pages/Appointment";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchDetail from "./components/search/SearchDetail";
import { UserContext } from "./context/UserContext";
import CalendarTest from "./pages/CalendarTest";
import Cookies from "universal-cookie";
import Chat from "./pages/Chat";
import ReviewPage from "./pages/ReviewPage";

const cookies = new Cookies();

const App = () => {
  return (
    <UserContext.Provider value="value">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/provider" element={<ProviderRegister />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          <Route
            path="/customerChangePassword"
            element={<CustomerChangePassword />}
          />
          <Route
            path="/customerDeleteAccount"
            element={<CustomerDeleteAccount />}
          />

          <Route path="/calendar" element={<CalendarTest />} />
          <Route path="/appointment" element={<Appointment />}>
            <Route path=":providerID" element={<Appointment />} />
          </Route>
          <Route
            path="/review/:appointmentID/:providerID"
            element={<ReviewPage />}
          />

          <Route path="/chat" element={<Chat />}>
            <Route path=":providerID" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
