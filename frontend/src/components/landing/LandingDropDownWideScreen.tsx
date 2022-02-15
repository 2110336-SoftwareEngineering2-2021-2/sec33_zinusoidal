import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiPencilFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
const LandingDropDownWideScreen = () => {
  return (
    <Layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Item>
          <RiPencilFill /> <p>Edit your profile</p>
        </Item>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Item>
          <AiOutlineLogout />
          <p>Logout</p>
        </Item>
      </Link>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  width: 240px;
  background-color: white;
  position: absolute;
  right: 0;
  border-radius: 4px;
`;
const Item = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  color: black;
  p {
    font-size: 20px;
    line-height: 31px;
    margin-left: 8px;
  }
`;

export default LandingDropDownWideScreen;
