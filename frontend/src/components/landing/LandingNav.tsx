import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { COLOR } from "../../CONSTANT";
import { AiOutlineMenu } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { AnimatePresence } from "framer-motion";
import LandingDropDown from "./LandingDropDown";
import { useLocation } from "react-router-dom";
const logo = require("../../assets/logo.png");

interface StyledLinkPropType {
  ending?: boolean | null;
}

interface ParagraphPropType {
  isUser: boolean;
}
const LandingNav = ({ onClickMenu, show }: any) => {
  const { user, setUser } = useContext(UserContext);
  const [showDropDown, setShowDropDown] = useState(true);

  const location = useLocation();
  console.log(user);
  useEffect(() => {
    setShowDropDown(false);
  }, [location]);

  useEffect(() => {
    const windowWidthDetect = () => {
      if (window.innerWidth > 600 && showDropDown) {
        setShowDropDown(false);
      }
    };
    window.addEventListener("resize", windowWidthDetect);
    return () => {
      window.removeEventListener("resize", windowWidthDetect);
    };
  }, [showDropDown]);
  return (
    <Frame>
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
          <P whileHover={{ scale: 1.3, originX: "100%" }} isUser={user != null}>
            {user == null ? "Login/Register" : `Hello, ${user}`}
          </P>
        </StyledLink>

        <Menu
          size={32}
          style={{ margin: "0 22px 0 auto" }}
          onClick={() => setShowDropDown(!showDropDown)}
        />
      </Layout>
      <AnimatePresence exitBeforeEnter>
        {showDropDown && (
          <LandingDropDownDiv
            onClick={() => setShowDropDown(!showDropDown)}
            initial={{ y: -189, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -189 }}
          >
            <LandingDropDown text="Home" where="/" />
            <LandingDropDown text="Find provider" where="/search" />
            <LandingDropDown text="Edit your profiles" where="/editProfile" />
            <LandingDropDown text="Login/Register" where="/login" />
          </LandingDropDownDiv>
        )}
      </AnimatePresence>
    </Frame>
  );
};

const Frame = styled.div`
  position: relative;
  width: 100%;
`;
const Layout = styled.div`
  width: 100%;
  height: 101px;
  display: flex;
  padding-left: 32px;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${COLOR["violet/100"]};
  z-index: 5;
  position: relative;
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

const LandingDropDownDiv = styled(motion.div)`
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
  position: relative;
  width: 100%;
  background-color: ${COLOR["violet/100"]};
  @media screen and (min-width: 601px) {
    display: none;
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
  cursor: pointer;
  @media screen and (min-width: 601px) {
    display: none;
  }
`;

const P = styled(motion.p)<ParagraphPropType>`
  color: ${(props) => (props.isUser ? COLOR["aqua/700"] : "black")};
`;

export default LandingNav;
