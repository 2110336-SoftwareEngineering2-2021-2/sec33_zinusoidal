import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { BsPeopleFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";

const CustomerRegisterComplete = ({ loading }: any) => {
  let navigate = useNavigate();

  return (
    <Layout>
      <Padding>
        <CustomerRegistration>
          <BsPeopleFill color={COLOR["violet/400"]} />
          Customer Registration
        </CustomerRegistration>
        {loading ? (
          <Flex style={{ fontSize: 40, color: COLOR["gray/700"] }}>
            Loading . . .
          </Flex>
        ) : (
          <Flex>
            <FiCheckCircle size={100} />
            <Text>Registration Complete!</Text>
            <GreenButton
              onClick={() => {
                navigate("/login");
              }}
            >
              Login <AiOutlineLogin />
            </GreenButton>
          </Flex>
        )}
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  background-color: white;
  font-weight: bold;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  row-gap: 25px;
  img {
    width: 160px;
    height: 160px;
    border-radius: 10000px;
  }
`;

const CustomerRegistration = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const ProfilePicture = styled.div`
  width: 100%;
  font-size: 18px;
`;

const GreenButton = styled.button`
  cursor: pointer;
  width: 97px;
  text-decoration: none;
  border: none;
  color: white;
  background-color: ${COLOR["green/400"]};
  padding: 5px;
  border-radius: 10000px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &:hover {
    background-color: ${COLOR["green/500"]};
  }
`;
const Text = styled.p`
  font-size: 20px;
`;
export default CustomerRegisterComplete;
