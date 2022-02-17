import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import LandingDetail from "../components/landing/LandingDetail";
import LandingFooter from "../components/landing/LandingFooter";
import NumericDetail from "../components/landing/NumericDetail";
import LandingFeatures from "../components/landing/LandingFeatures";
import { COLOR } from "../CONSTANT";
import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";
const img1 = require("../assets/landingBg.png");
const img2 = require("../assets/landingBg2_new.png");
const img3 = require("../assets/landingBg3.png");
const img1_small = require("../assets/landing1_small.png");
const bubble = require("../assets/bubble.png");

const cookies = new Cookies();
const variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 250,
    opacity: 0,
  },
  hidden_2: {
    opacity: 0,
  },
  visible_2: {
    opacity: 1,
  },
};

const LandingPage = () => {
  let navigate = useNavigate();
  const user = cookies.get("user");
  window.scrollTo(0, 0);

  return (
    <Layout>
      <LandingNav />

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
          <Button
            onClick={() => {
              const user = cookies.get("user");
              if (typeof user == "undefined") {
                navigate("/login");
              } else {
                alert("You already logged in");
              }
            }}
          >
            Join us
          </Button>
        </HeaderDetail>
      </Content>
      <SmallContentImg
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={variants}
      ></SmallContentImg>
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

      <LandingFeatures />
      <Content2
        initial={typeof user == "undefined" ? "hidden" : "hidden_2"}
        whileInView={typeof user == "undefined" ? "visible" : "visible_2"}
        viewport={{ once: true }}
        transition={
          typeof user == "undefined" ? { duration: 1 } : { duration: 2 }
        }
        variants={variants}
      >
        <BubbleDiv>
          <NumericDetail></NumericDetail>
        </BubbleDiv>
      </Content2>
      {typeof user == "undefined" ? <LandingFooter /> : null}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  /* margin-bottom: 200px; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(
    to left top,
    #d898fd,
    #dca5fc,
    #e0b2fb,
    #e3bffa,
    #e7cbf8,
    #e7cbf8,
    #e7cbf8,
    #e7cbf8,
    #e3bffa,
    #e0b2fb,
    #dca5fc,
    #d898fd
  ); ;
`;

const Content = styled(motion.div)`
  margin: 0rem 3rem 0rem;
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
    margin-top: 53px;
  }
`;

const HeaderDetail = styled.div`
  position: absolute;
  width: 50%;
  height: 60%;
  top: 10%;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 900px) {
    position: relative;
    width: auto;
    /* height: 330px; */
    /* padding-top: 5rem; */
  }
  @media screen and (max-width: 550px) {
    /* height: 250px; */
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
  margin-top: 20px;
  cursor: pointer;

  :hover {
    background-color: ${COLOR["violet/500"]};
  }
`;

const SmallContentImg = styled(motion.div)`
  @media screen and (max-width: 900px) {
    width: 60%;
    padding-top: 45%;
    /* height: 280px; */
    background-size: 100% 100%;
    background-image: url(${img1_small});
    align-self: center;
    margin-top: 62px;
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
  padding-top: 40%;
  position: relative;

  @media screen and (min-width: 1440px) {
    width: 1355px;
    padding-top: 542px;
    align-self: center;
  }

  @media screen and (max-width: 900px) {
    background-image: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 0rem;
    padding-top: 0;
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
  margin: 5rem 5rem 2rem;
  max-width: 1100px;
  align-self: center;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const BubbleDiv = styled("div")`
  @media screen and (max-width: 900px) {
    width: 550px;
    height: 550px;
    position: relative;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${bubble});
    background-size: 100% 80%;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 550px) {
    width: 350px;
    height: 350px;
    position: relative;
    align-self: center;
  }
`;

export default LandingPage;
