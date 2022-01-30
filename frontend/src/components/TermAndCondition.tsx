import React from "react";
import styled from "styled-components";
import { COLOR, TERMS } from "../CONSTANT";

const TermAndCondition = () => {
  return (
    <Layout>
      <Term>
        <TermHeader></TermHeader>
        <TextDetail>
          <h1 style={{ fontSize: "1.5vw", marginBottom: 0 }}>
            Terms and Conditions
          </h1>
          <p style={{ fontSize: "1vw" }}>{TERMS}</p>
        </TextDetail>
      </Term>
    </Layout>
  );
};

const Layout = styled.div`
  /* background-color: red; */
  /* padding-left: 131px; */
  /* margin: 131px; */
  display: flex;
  height: 100vh;
`;

const Term = styled.div`
  width: 100%;

  background-color: white;
  margin: 20% 10%;
  border-radius: 5%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TermHeader = styled.header`
  background-color: ${COLOR["violet/400"]};
  width: 100%;
  height: 6vh;
`;

const TextDetail = styled.div`
  background-color: white;
  padding: 10px;
`;
export default TermAndCondition;
