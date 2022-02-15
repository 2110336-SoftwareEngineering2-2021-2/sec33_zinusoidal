import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiPencilFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LandingDropDownWideScreen = () => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    cookies.remove("user");
    navigate("/");
  };
  return (
    <Layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Link to="/editProfile" style={{ textDecoration: "none" }}>
        <Item>
          <RiPencilFill /> <p>Edit your profile</p>
        </Item>
      </Link>

      <Item
        onClick={() => {
          logoutHandle();
        }}
      >
        <AiOutlineLogout />
        <p>Logout</p>
      </Item>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  width: 240px;
  background-color: white;
  position: absolute;
  right: 0;
  border-radius: 4px;
  z-index: 1;
`;
const Item = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: black;
  cursor: pointer;
  p {
    font-size: 20px;
    line-height: 31px;
    margin-left: 8px;
  }
`;

export default LandingDropDownWideScreen;
