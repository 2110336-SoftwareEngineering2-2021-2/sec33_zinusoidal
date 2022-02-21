import React, { useState, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";

const EditPasswordComplete = ({ setCurrent }: any) => {
  return (
    <Layout>
      <Padding>
        <BackDiv
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCurrent(0);
          }}
        >
          <MdOutlineArrowBack />
          back
        </BackDiv>
        <ContentDiv>
          <BsCheck2Circle size={96} color={COLOR["green/400"]} />
          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Password Updated!
          </div>
          <div
            style={{ fontSize: 16, fontWeight: "normal", textAlign: "center" }}
          >
            Your Password has been change successfully.{" "}
          </div>
        </ContentDiv>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  min-height: 600px;
  font-weight: bold;
  background-color: white;
  border-radius: 0 0 20px 20px;
  overflow-y: scroll;
`;
const Padding = styled.div`
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BackDiv = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const ContentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default EditPasswordComplete;
