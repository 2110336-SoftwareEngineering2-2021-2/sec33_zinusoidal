import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { COLOR } from "../../CONSTANT";
import { AiOutlineMenu } from "react-icons/ai";
const logo = require("../../assets/logo.png");

interface StyledLinkPropType {
  ending?: boolean | null;
}
const LandingNav = () => {
  return (
    <Layout>
      <img src={logo} alt="logo" />

      <StyledLink to="/">
        <motion.h1 whileHover={{ scale: 1.3, originX: 0 }}>Home</motion.h1>
      </StyledLink>

      <StyledLink to="/search">
        <motion.h1 whileHover={{ scale: 1.3, originX: 0 }}>
          Find provider
        </motion.h1>
      </StyledLink>
      <StyledLink to="/login" ending={true}>
        <motion.p whileHover={{ scale: 1.3, originX: "100%" }}>
          login/register
        </motion.p>
      </StyledLink>

      <Menu size={32} style={{ margin: "0 22px 0 auto" }} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 101px;
  display: flex;
  padding-left: 32px;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${COLOR["violet/100"]};
  img {
    height: 50px;
    width: 131px;
    cursor: pointer;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    color: black;
    line-height: 31px;

    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    h1 {
      font-size: 16px;
    }
  }
`;

const StyledLink = styled(Link)<StyledLinkPropType>`
  text-decoration: none;
  font-size: 20px;
  line-height: 31px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  margin-left: ${(props) => (props.ending == true ? "auto" : "60px")};
  margin-right: ${(props) => (props.ending == true ? "32px" : "0px")};

  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Menu = styled(AiOutlineMenu)`
  @media screen and (min-width: 601px) {
    display: none;
  }
`;

export default LandingNav;
