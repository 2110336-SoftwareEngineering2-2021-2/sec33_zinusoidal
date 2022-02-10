import React, { useEffect } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import LandingDetail from "../components/landing/LandingDetail";
import LandingFooter from "../components/landing/LandingFooter";
import NumericDetail from "../components/landing/NumericDetail";
import { COLOR } from "../CONSTANT";
const img1 = require("../assets/landingBg.png");
const img2 = require("../assets/landingBg2.png");
const img3 = require("../assets/landingBg3.png");

const variants = {
  visible: {
    y: 0,
  },
  hidden: {
    y: 300,
  },
};

const LandingPage = () => {
  return (
    <Layout>
      <LandingNav></LandingNav>
      <Content
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={variants}
      >
        <HeaderDetail>
          <h1>
            FORTUNE <span>168</span>
          </h1>
          <h2>online matchmaking fortune teller platform</h2>
          <Button>Join us</Button>
        </HeaderDetail>
      </Content>
      <LandingFeature
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={variants}
      >
        <LandingDetail
          headerText="Find the right fortune-telling
methods for you"
          detail="With our find provider function,
you can search the right provider
that match to fortune-telling
methods that you want."
        />
        <LandingDetail
          headerText="On-demand fortune-telling
appointment"
          detail="In our platform, you can see 
fortune-teller schedule and book time 
that match to you"
        />
        <LandingDetail
          headerText="Payment guaruntees
before and after services"
          detail="With our platform, we handle as
middleman between fortune-teller
and customer. So you can see all
transaction transparantly"
        />
      </LandingFeature>
      <Content2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={variants}
      >
        <NumericDetail></NumericDetail>
      </Content2>
      {/* <Content3
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        variants={variants}
      >
        <div style={{ flex: 1 }}></div>
        <Content3in></Content3in>
      </Content3> */}
      <LandingFooter />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
`;

const Content = styled(motion.div)`
  margin: 1rem 3rem 0rem;
  /* margin: 5rem 129px 3rem; */
  /* width: auto; */
  background-image: url(${img1});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 50%;
  position: relative;

  @media screen and (min-width: 1440px) {
    width: 1164px;
    padding-top: 582px;
    align-self: center;
  }

  @media screen and (max-width: 900px) {
    background-image: none;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding-top: 0%;
    align-self: stretch;
    align-items: center;
  }
`;

const HeaderDetail = styled.div`
  position: absolute;
  width: 50%;
  height: 40%;
  top: 20%;
  left: 0;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    position: relative;
    width: auto;
    height: 330px;
    padding-top: 5rem;
  }
  @media screen and (max-width: 550px) {
    height: 250px;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 64px;
    line-height: 101px;
    font-weight: bold;
    color: ${COLOR["violet/500"]};
    @media screen and (max-width: 550px) {
      font-size: 36px;
      line-height: 57px;
    }
    span {
      color: white;
    }
  }

  h2 {
    font-size: 28px;
    line-height: 44px;
    @media screen and (max-width: 550px) {
      font-size: 16px;
      line-height: 25px;
    }
  }
`;

const Button = styled.button`
  width: 122px;
  height: 48px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;

  font-size: 20px;
  line-height: 31px;
  font-weight: bold;
  color: white;
  margin-top: auto;
  cursor: pointer;

  :hover {
    background-color: ${COLOR["violet/500"]};
  }
`;
const Content2 = styled(motion.div)`
  margin: 0rem 0rem 5rem;
  /* margin: 0rem 129px; */

  padding-left: 3rem;
  padding-right: 3rem;

  width: auto;
  background-image: url(${img2});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 50%;
  position: relative;

  @media screen and (min-width: 1440px) {
    width: 1355px;
    padding-top: 677.5px;
    align-self: center;
  }
`;

const Content3 = styled(motion.div)`
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

const LandingFeature = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin: 5rem 5rem;
  max-width: 1100px;
  align-self: center;
`;

export default LandingPage;
