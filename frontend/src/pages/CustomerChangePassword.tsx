import React, { useState } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import EditPassword from "../components/customerAccManage/EditPassword";
import { COLOR } from "../CONSTANT";

const CustomerChangePassword = () => {
  return (
    <Layout>
      <LandingNav />
      <Form>
        <EditPassword />
      </Form>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: max(100vh, 1024px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR["blue/100"]};
`;
const Form = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

export default CustomerChangePassword;
