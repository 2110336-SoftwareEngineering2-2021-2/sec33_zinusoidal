import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
type ButtonPropType = {
  provider?: boolean;
};

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const LandingFooter = () => {
  return (
    <Layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      variants={variants}
    >
      <h1>Wanna try this platform?</h1>
      <h3>join us!</h3>
      <ButtonDiv>
        <Link to="/register/provider">
          <Button provider>as Provider →</Button>
        </Link>
        <Link to="/register/customer">
          <Button>as Customer →</Button>
        </Link>
      </ButtonDiv>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  h1 {
    font-size: 48px;
    line-height: 76px;
    font-weight: bold;
    text-align: center;

    @media screen and (max-width: 550px) {
      font-size: 24px;
      line-height: 38px;
    }
  }

  h3 {
    color: ${COLOR["violet/600"]};
    font-size: 28px;
    line-height: 44px;
    font-weight: bold;
    @media screen and (max-width: 550px) {
      font-size: 18px;
      line-height: 28px;
    }
  }
`;

const Button = styled("button")<ButtonPropType>`
  width: 162px;
  height: 48px;
  background-color: ${(props) =>
    props.provider ? COLOR["violet/400"] : "transparent"};
  margin: 0 8px;
  border-radius: 10000px;
  border: 1px solid ${COLOR["violet/400"]};
  font-size: 20px;
  line-height: 31px;
  font-weight: bold;
  color: ${(props) => (props.provider ? "white" : COLOR["violet/400"])};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.provider ? COLOR["violet/500"] : "transparent"};
  }

  @media screen and (max-width: 550px) {
    margin-top: 16px;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  margin-top: 16px;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;
export default LandingFooter;
