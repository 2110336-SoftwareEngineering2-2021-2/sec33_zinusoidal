import React from "react";
import styled from "styled-components";
import TermAndCondition from "../components/TermAndCondition";
import { COLOR } from "../CONSTANT";
const Register = () => {
  return (
    <Layout>
      <TermAndCondition />
      <GridItem style={{}}> </GridItem>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["blue/100"]};
  height: 100vh;
  display: grid;
  grid-template-columns: 40% 60%;
  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`;

const GridItem = styled.div`
  /* background-color: red; */
`;
export default Register;
