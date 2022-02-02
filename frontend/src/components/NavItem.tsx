import React, { ReactPropTypes } from "react";
import styled from "styled-components";

const NavItem = ({ children }: any) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 10%;
`;

export default NavItem;
