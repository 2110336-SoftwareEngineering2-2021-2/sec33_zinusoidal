import React from "react";
import styled from "styled-components";
import TermAndCondition from "../components/TermAndCondition";
import { COLOR } from "../CONSTANT";
const Register = () => {
  return (
    <Layout>
      <TermAndCondition />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["magenta/100"]};
  height: 100vh;

`;

export default Register;