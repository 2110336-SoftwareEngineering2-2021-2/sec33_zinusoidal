import React, { useEffect } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import LandingDetail from "../components/landing/LandingDetail";
import LandingFooter from "../components/landing/LandingFooter";
import NumericDetail from "../components/landing/NumericDetail";
const img1 = require("../assets/landingBg.png");
const img2 = require("../assets/landingBg2.png");
const img3 = require("../assets/landingBg3.png");

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const LandingPage = () => {
  return (
    <Layout>
      <LandingNav></LandingNav>
      <Content
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        variants={variants}
      ></Content>
      <LandingFeature
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 2 }}
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
        // viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        variants={variants}
      >
        <NumericDetail></NumericDetail>
      </Content2>
      <Content3
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: false }}
        transition={{ duration: 1.5 }}
        variants={variants}
      >
        <div style={{ flex: 1 }}></div>
        <Content3in></Content3in>
      </Content3>
      <LandingFooter />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled(motion.div)`
  margin: 1rem 3rem 0rem;
  /* margin: 5rem 129px 3rem; */
  width: auto;
  background-image: url(${img1});

  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 50%;
  position: relative;
`;

const Content2 = styled(motion.div)`
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
`;

export default LandingPage;
