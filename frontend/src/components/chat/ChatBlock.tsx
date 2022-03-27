import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { MdBlock } from "react-icons/md";
import { COLOR } from "../../CONSTANT";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ChatBlock = ({
  info,
  setopenBlock,
  selectedRoom,
  setLoadingblock,
}: any) => {
  const block = () => {
    const user = cookies.get("user");
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/block`,
      data: { blockedUserId: selectedRoom.userID },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        setLoadingblock(false);
      })
      .catch(function (error) {});
  };
  return (
    <Layout>
      <MdBlock size={160} />

      <Text>
        <p>Do you want to block</p>
        <Name>
          {info.name} {info.surname} ?
        </Name>
      </Text>
      <FlexDiv>
        <RedButton
          onClick={() => {
            setopenBlock(false);
          }}
        >
          Cancel
        </RedButton>
        <GreenButton
          onClick={() => {
            setLoadingblock(true);
            setopenBlock(false);
            block();
          }}
        >
          Confirm
        </GreenButton>
      </FlexDiv>
    </Layout>
  );
};
const Layout = styled.div`
  text-align: center;
  padding: 30px;
  font-weight: bold;
  height: 690px;
  width: 690px;
  display: flex;
  font-size: 24px;
  background-color: ${COLOR["violet/50"]};
  border-radius: 8px;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  @media screen and (max-width: 1200px) {
    width: 500px;
  }
  @media screen and (max-width: 850px) {
    width: 400px;
  }

  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;
const Name = styled.p`
  margin-left: 8px;
  @media screen and (max-width: 450px) {
    margin-left: 0px;
  }
`;
const Text = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;
const GreenButton = styled.div`
  justify-content: center;
  width: 120px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  height: 40px;
  background-color: ${COLOR["green/300"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    background-color: ${COLOR["green/400"]};
  }
`;
const RedButton = styled.div`
  justify-content: center;
  width: 120px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  height: 40px;
  background-color: #f44336;
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    background-color: #d63b2f;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  @media screen and (max-width: 450px) {
    width: 250px;
  }
`;

export default ChatBlock;
