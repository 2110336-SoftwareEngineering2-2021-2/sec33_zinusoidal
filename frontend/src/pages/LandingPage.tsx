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
      <Content3>
        <div style={{ flex: 1 }}></div>
        <Content3in></Content3in>
      </Content3>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin: 1rem 3rem 0rem;
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
  position: relative;
`;

const Content3 = styled.div`
  margin: 0rem 3rem 0rem;

  width: auto;
  /* background-image: url(${img3}); */

  background-repeat: no-repeat;

  display: flex;
`;

const Content3in = styled.div`
  padding-top: 40%;
  width: auto;
  background-image: url(${img3});
  flex: 1;
  background-size: 100% 100%;
  /* background-color: red; */
`;

export default LandingPage;
