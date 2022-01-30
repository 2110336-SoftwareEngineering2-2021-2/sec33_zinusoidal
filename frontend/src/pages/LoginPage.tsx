import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";

const LoginPage = () => {

  return (
    <Layout>

      <LoginForm />
    </Layout>
      
  );
};

const Layout = styled.div`
  background-color: ${COLOR["violet/100"]};
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`;

export default LoginPage;