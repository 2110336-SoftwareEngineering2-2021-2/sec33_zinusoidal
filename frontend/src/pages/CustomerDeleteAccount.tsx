import React, { useState } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import DeleteAccount from "../components/customerAccManage/DeleteAccount";
import { COLOR } from "../CONSTANT";

const CustomerDeleteAccount = () => {
  return (
    <Layout>
      <LandingNav />
      <Form>
        <DeleteAccount />
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

export default CustomerDeleteAccount;
