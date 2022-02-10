import React, { useState } from "react";
import styled from "styled-components";
import LandingDetail from "./LandingDetail";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { motion } from "framer-motion";
type SliderPropType = {
  idx: number;
};

const variants = {
  visible: {
    y: 0,
  },
  hidden: {
    y: 300,
  },
};
const LandingFeatures = () => {
  const [idx, setIdx] = useState(0);
  console.log(idx);

  const handleClickLeft = () => {
    if (idx == 0) {
      setIdx(2);
    } else {
      setIdx(idx - 1);
    }
  };
  return (
    <Container
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      variants={variants}
    >
      <LeftArrow onClick={handleClickLeft} />
      <Layout>
        <Slider idx={idx}>
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
        </Slider>
      </Layout>
      <RightArrow onClick={() => setIdx((idx + 1) % 3)} />
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 25px 0;

  @media screen and (min-width: 900px) {
    display: none;
  }
`;

const Layout = styled.div`
  width: 313px;
  overflow: hidden;
  align-self: center;

  @media screen and (max-width: 500px) {
    width: 220px;
  }
`;

const Slider = styled("div")<SliderPropType>`
  width: 939px;
  display: flex;
  flex-direction: row;
  transform: ${(props) => `translateX(-${313 * props.idx}px)`};

  @media screen and (max-width: 500px) {
    width: 660px;
    transform: ${(props) => `translateX(-${220 * props.idx}px)`};
  }
`;

const LeftArrow = styled(AiOutlineLeft)`
  width: 48px;
  height: 48px;

  @media screen and (max-width: 500px) {
    width: 24px;
    height: 24px;
  }
`;

const RightArrow = styled(AiOutlineRight)`
  width: 48px;
  height: 48px;

  @media screen and (max-width: 500px) {
    width: 24px;
    height: 24px;
  }
`;
export default LandingFeatures;
