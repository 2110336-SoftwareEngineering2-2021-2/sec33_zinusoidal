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
import LandingDropDownWideScreen from "./LandingDropDownWideScreen";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationList from "../notification/NotificationList";
const cookies = new Cookies();
const logo = require("../../assets/logo.png");

interface StyledLinkPropType {
  ending?: boolean | null;
}

interface ParagraphPropType {
  isuser: string;
}
const LandingNav = ({ onClickMenu, show }: any) => {
  const user = cookies.get("user");
  const [showDropDown, setShowDropDown] = useState(true);
  const [showWideDropDown, setShowWideDropDown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setShowDropDown(false);
  }, [location]);
  useEffect(() => {
    const windowWidthDetect = () => {
      if (window.innerWidth > 600 && showDropDown) {
        setShowDropDown(false);
      }
      if (window.innerWidth <= 600 && showWideDropDown) {
        setShowWideDropDown(false);
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
        <Image src={logo} alt="logo" />

        <StyledLink to="/">
          <motion.h1 whileHover={{ scale: 1.3, originX: 0 }}>Home</motion.h1>
        </StyledLink>

        <StyledLink to="/search">
          <motion.h1 whileHover={{ scale: 1.3, originX: 0 }}>
            Find provider
          </motion.h1>
        </StyledLink>
        {typeof user != "undefined" && (
          <div style={{ position: "relative", marginLeft: "auto" }}>
            <IoMdNotificationsOutline
              size={24}
              onClick={() => setShowNotification((show) => !show)}
            />
            {showNotification && (
              <NotificationList setDropDown={setShowNotification} />
            )}
          </div>
        )}

        <NameDiv
          style={{ marginLeft: typeof user == "undefined" ? "auto" : 24 }}
        >
          {typeof user == "undefined" ? (
            <P
              whileHover={{ scale: 1.1, originX: "100%" }}
              isuser={(typeof user != "undefined").toString()}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login/Register
            </P>
          ) : (
            <P
              whileHover={{ scale: 1.1, originX: "100%" }}
              isuser={(typeof user != "undefined").toString()}
              onClick={() => setShowWideDropDown(!showWideDropDown)}
            >
              Hello, {user?.username}
            </P>
          )}

          {showWideDropDown && (
            <LandingDropDownWideScreen setDropDown={setShowWideDropDown} />
          )}
        </NameDiv>

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
            {typeof user != "undefined" && user.user_id.slice(0, 1) == "P" && (
              <LandingDropDown text="Edit your profiles" where="/editProfile" />
            )}
            {typeof user != "undefined" && user.user_id.slice(0, 1) == "C" && (
              <div>
                <LandingDropDown
                  text="Change Password"
                  where="/customerChangePassword"
                />
                <LandingDropDown
                  text="Delete Account"
                  where="/customerDeleteAccount"
                />
              </div>
            )}
            {typeof user == "undefined" && (
              <LandingDropDown text="Login/Register" where="/login" />
            )}
            {typeof user != "undefined" && (
              <LogoutButton
                onClick={() => {
                  cookies.remove("user");
                }}
              >
                <h1>Logout</h1>
              </LogoutButton>
            )}
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
  z-index: 2;
  position: relative;

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

const Image = styled.img`
  height: 50px;
  width: 131px;
  cursor: pointer;
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
  margin-left: 60px;
  margin-right: 0px;

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
  color: ${(props) => (props.isuser == "true" ? COLOR["aqua/700"] : "black")};
  font-size: 20px;
  line-height: 31px;
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const NameDiv = styled.div`
  position: relative;
  margin-right: 32px;
  margin-left: 24px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const LogoutButton = styled.div`
  height: 63px;
  background-color: ${COLOR["violet/100"]};
  display: flex;
  align-items: center;
  padding-left: 16px;
  z-index: 1;
  position: relative;
  cursor: pointer;
  h1 {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
  }
`;

export default LandingNav;
