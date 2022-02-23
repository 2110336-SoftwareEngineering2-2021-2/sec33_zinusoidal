import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/landing/LandingNav";
import AppointmentSection from "../components/appointment/AppointmentSection";
import { COLOR } from "../CONSTANT";
import Cookies from "universal-cookie";

const Appointment = () => {
  let { providerID } = useParams();
  console.log(providerID);

  const cookies = new Cookies();
  const user = cookies.get("user");

  let navigate = useNavigate();

  useEffect(() => {
    if (typeof user == "undefined") {
      alert("You must be logged in");
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

  background-image: url(https://s3-alpha-sig.figma.com/img/df68/cd15/425f624aed5ae4c31cf5ece70613ca84?Expires=1645401600&Signature=Hd1OzQVwT-uOMTRjqoEMw4FU5QBa25WlvGZUD1XrfEJqGoNyPal2oD0VWwjt275HfYulQGopTjaf2x3eMzuVpogyqkmXPCHFkoha9zh97lUfwFmyNLkrErVHwmsPtC7xVO-ExcpOXxayyZfTsf5E9XDN6kMZM5A3sY3S7o~JRHmDIXKAFJWmf2AOyQvHp92Ar4FzpbAnt330nScB8ckksZNn2Rb0-FwGxUGdYgLl2BIudPiA6jeP8GA9PMFrJHcxW-33r9AYBArVyNlk0ucOOugrW3bekHxg5OH7Qr~GAZyWyqQMP8UVlYBHLh1~z~nakS2lu47zg8MeDePsoknb5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
  display: flex;
  flex-direction: column;
`;

export default Appointment;
