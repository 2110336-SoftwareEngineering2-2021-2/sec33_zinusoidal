import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/landing/LandingNav";
import AppointmentSection from "../components/appointment/AppointmentSection";
import Cookies from "universal-cookie";
const searchBg = require("../assets/searchBg.jpeg");

const Appointment = () => {
  let { providerID } = useParams();
  // console.log(providerID);

  const cookies = new Cookies();
  const user = cookies.get("user");

  let navigate = useNavigate();

  useEffect(() => {
    if (typeof user == "undefined") {
      alert("You must be logged in");
      navigate(`/`);
    }
    if (user.user_id.slice(0, 1) == "P") {
      alert("You can't make appointment beacuse you are a provider");
      navigate(`/`);
    }
  }, []);

  if (typeof user == "undefined") return <></>;

  return (
    <Layout>
      <Navbar />
      <AppointmentSection providerID={providerID} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  background-size: 100% 100%;
  overflow-y: visible;

  background-image: url(${searchBg});
  display: flex;
  flex-direction: column;
`;

export default Appointment;
