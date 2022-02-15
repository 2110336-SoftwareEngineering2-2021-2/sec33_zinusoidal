import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLOR } from "../../CONSTANT";
const LandingDropDown = ({ text, where }: any) => {
  return (
    <Layout>
      <NavLink to={where} style={{ textDecoration: "none", color: "black" }}>
        <h1>{text}</h1>
      </NavLink>
    </Layout>
  );
};

const Layout = styled.div`
  height: 63px;
  background-color: ${COLOR["violet/100"]};
  display: flex;
  align-items: center;
  padding-left: 16px;
  z-index: 1;
  position: relative;
  h1 {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
  }
`;

export default LandingDropDown;
