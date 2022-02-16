import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 300,
    opacity: 0,
  },
  hidden_2: {
    opacity: 0,
  },
  visible_2: {
    opacity: 1,
  },
};
const NumericDetail = () => {
  const [shownData, setShownData] = useState({
    totalCustomer: 6,
    totalProvider: 6,
    totalFortuneService: 8,
  });
  const user = cookies.get("user");

  useEffect(() => {
    axios
      .get(
        "https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/landing_page_info"
      )
      .then((response) => {
        console.log(response.data);
        setShownData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Layout
      className="nonedrag"
      initial={typeof user == "undefined" ? "hidden" : "hidden_2"}
      whileInView={typeof user == "undefined" ? "visible" : "visible_2"}
      viewport={{ once: true }}
      transition={
        typeof user == "undefined" ? { duration: 1 } : { duration: 2 }
      }
      variants={variants}
    >
      <NumberDiv>
        <StyledCountUp
          start={0}
          end={shownData.totalCustomer}
          duration={5}
          redraw
          separator=","
        />
        <H3>customers</H3>
      </NumberDiv>

      <NumberDiv>
        <StyledCountUp
          end={shownData.totalProvider}
          duration={5}
          redraw
          separator=","
        />
        <H3>Fortune-tellers</H3>
      </NumberDiv>

      <NumberDiv>
        <StyledCountUp
          end={shownData.totalFortuneService}
          duration={5}
          redraw
          separator=","
        />
        <H3>types of service</H3>
      </NumberDiv>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  width: 40%;
  height: 60%;
  position: absolute;
  top: 15%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  @media screen and (min-width: 901px) {
  }

  @media screen and (max-width: 900px) {
    width: 350px;
    height: 350px;
    position: relative;
    align-self: center;
    background-color: #f8e4ec;
    border-radius: 8px;
    /* margin-bottom: 2rem; */
    top: 0;
  }

  @media screen and (max-width: 550px) {
    width: 250px;
    height: 250px;
    position: relative;
    align-self: center;
    background-color: #f8e4ec;
    border-radius: 8px;
  }
`;

const H3 = styled.h3`
  font-size: 20px;
  line-height: 31px;
  margin-left: 16px;
  flex: 1;

  @media screen and (max-width: 550px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

const NumberDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCountUp = styled(CountUp)`
  font-size: 64px;
  line-height: 101px;
  text-align: right;
  flex: 1;

  @media screen and (max-width: 550px) {
    font-size: 36px;
    line-height: 57px;
  }
`;

export default NumericDetail;
