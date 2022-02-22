import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegSmileWink } from "react-icons/fa";
import { COLOR } from "../../CONSTANT";
import Calender from "../calendar/Calendar";

const AppointmentInfo = ({ totalPrice, appointmentList }: any) => {
  return (
    <Layout>
      <HeaderDiv>My Appointment</HeaderDiv>
      <ContentDiv>
        <TotalPrice>
          <p>Total Price :</p>
          <Number> {totalPrice} baht</Number>
        </TotalPrice>
        <Appointment>
          {appointmentList.length == 0 ? (
            <FaRegSmileWink color={COLOR["gray/400"]} size={120} />
          ) : (
            <p>Service here</p>
          )}
        </Appointment>
      </ContentDiv>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  background-color: white;
  height: fit-content;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;
const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TotalPrice = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  column-gap: 4px;
`;
const Number = styled.p`
  font-weight: normal;
`;
const Appointment = styled.div`
  min-height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default AppointmentInfo;
