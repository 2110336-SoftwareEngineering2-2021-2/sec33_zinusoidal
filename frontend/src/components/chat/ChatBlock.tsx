import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBan } from "react-icons/fa";
import { COLOR } from "../../CONSTANT";
const ChatBlock = ({ selectedUser }: any) => {
  return (
    <Layout>
      <BanDiv>
        <FaBan size="133.33px" />
      </BanDiv>

      <h1> Do you want to block {selectedUser} ?</h1>
      <FlexDiv>
        <CancelButton>confirm</CancelButton>
        <BlankBox />
        <CancelButton>cancel</CancelButton>
      </FlexDiv>
    </Layout>
  );
};
const Layout = styled.div`
  height: 690px;
  width: 690px;
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR["violet/50"]};
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BanDiv = styled.div`
  weight: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
`;

const ConfirmlButton = styled.div`
  width: 96px;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  height: 48px;
  justify-content: center;
  background-color: ${COLOR["green/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    background-color: ${COLOR["green/500"]};
  }
`;
const CancelButton = styled.div`
  width: 96px;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  height: 48px;
  justify-content: center;
  background-color: #f44336;
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    background-color: #ff0000;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const BlankBox = styled.div`
  width: 30px;
`;

export default ChatBlock;
