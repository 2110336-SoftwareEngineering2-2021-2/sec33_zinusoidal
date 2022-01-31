import React from "react";
import styled from "styled-components";
import { COLOR, TERMS } from "../CONSTANT";

const TermAndCondition = () => {
  return (
    <Layout>
      <TermHeader></TermHeader>
      <Term>
        <TextDetail>
          <h1 style={{ fontSize: "1.5vw" }}>Terms and Conditions</h1>
          <p style={{ fontSize: "0.9vw" }}>{TERMS}</p>
        </TextDetail>
        <AgreeDiv>
          <CheckboxStyle type="checkbox" id="" name="" value="" />
          <AgreeText>I agree to the terms and conditions</AgreeText>
        </AgreeDiv>
        <NextButton>Next</NextButton>
      </Term>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 566px;
  width: 506px;
  position: absolute;
  left: 131px;
  top: 164px;
`;

const TermHeader = styled.div`
  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
  width: 100%;
  height: 95px;
`;

const Term = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AgreeDiv = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  text-align: center;
`;
const AgreeText = styled.div`
  font-size: 16px;
  font-family: baloo 2;
  font-weight: bold;
`;

const CheckboxStyle = styled.input`
  width: 24px;
  height: 24px;
`;

const TextDetail = styled.div`
  background-color: white;
  padding: 15px;
  margin: 0px;
`;

const NextButton = styled.button`
  border: none;
  width: 86px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-size: 16px;
`;
export default TermAndCondition;
