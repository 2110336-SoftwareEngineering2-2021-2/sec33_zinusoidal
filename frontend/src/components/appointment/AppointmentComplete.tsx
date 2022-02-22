import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiCheckCircle } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";

import { COLOR } from "../../CONSTANT";
import Calender from "../calender/Calender";

const AppointmentComplete = ({ totalPrice, appointmentList }: any) => {
  let navigate = useNavigate();
  return (
    <Layout>
      <Padding>
        <FiCheckCircle color={COLOR["green/600"]} size={100} />
        <Text>
          <p>Your appoinment request has been send to Provider</p>
          <p>Please wait for the respond</p>
        </Text>
        <Button
          onClick={() => {
            navigate(`/search`);
          }}
        >
          Done <BsCheck2 size={20} />
        </Button>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  background-color: white;
  height: 668px;
  border-radius: 20px;
  font-weight: bold;
`;
const Padding = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  row-gap: 30px;
`;
const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]} !important;
  }
`;
export default AppointmentComplete;
