import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { COLOR } from "../CONSTANT";
const NavList = () => {
  return (
    <Layout>
      <NavItem>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <P>Home</P>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/profile/edit" style={{ textDecoration: "none" }}>
          <P>Edit Profile</P>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <P>My Schedule</P>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <P>Request</P>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <P>Reviews</P>
        </NavLink>
      </NavItem>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: bold;
  line-height: 28px;

  min-height: 30px;
  color: ${COLOR["magenta/300"]};
  outline: none;
  border: none;
  cursor: pointer;
  text-align: center;
`;

export default NavList;
