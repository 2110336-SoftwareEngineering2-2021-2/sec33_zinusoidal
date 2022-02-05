import React from "react";
import styled from "styled-components";
import { COLOR } from "../CONSTANT";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeContent from "../components/home/HomeContent";
const CustomerHome = () => {
  return (
    <Layout>
      <HomeNavbar />
      <HomeContent />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
`;
export default CustomerHome;
