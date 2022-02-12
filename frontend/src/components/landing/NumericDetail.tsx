import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
const NumericDetail = () => {
  return (
    <Layout>
      <NumberDiv>
        <StyledCountUp
          start={0}
          end={15793}
          duration={10}
          redraw
          separator=","
        />
        <H3>customers</H3>
      </NumberDiv>

      <NumberDiv>
        <StyledCountUp end={4789} duration={9} redraw separator="," />
        <H3>Fortune-tellers</H3>
      </NumberDiv>

      <NumberDiv>
        <StyledCountUp end={1327} duration={8} redraw separator="," />
        <H3>types of service</H3>
      </NumberDiv>
    </Layout>
  );
};

const Layout = styled.div`
  width: 40%;
  height: 60%;
  position: absolute;
  top: 0;
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
    margin-bottom: 2rem;
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
