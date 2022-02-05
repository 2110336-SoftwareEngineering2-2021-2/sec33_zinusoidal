import React from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
const img1 = require("../assets/landingBg.png");
const img2 = require("../assets/landingBg2.png");
const img3 = require("../assets/landingBg3.png");

const LandingPage = () => {
  return (
    <Layout>
      <LandingNav></LandingNav>
      <Content></Content>
      <Content2></Content2>
      <Content3></Content3>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin: 5rem 3rem 0rem;
  /* margin: 5rem 129px 3rem; */
  width: auto;
  background-image: url(${img1});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 50%;
  position: relative;
`;

const Content2 = styled.div`
  margin: 0rem 0rem;
  /* margin: 0rem 129px; */

  padding-left: 3rem;
  padding-right: 3rem;

  width: auto;
  background-image: url(${img2});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 50%;
`;

const Content3 = styled.div`
  margin: 5rem 3rem 0rem;

  width: auto;
  background-image: url(${img3});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 40%;
`;

export default LandingPage;
