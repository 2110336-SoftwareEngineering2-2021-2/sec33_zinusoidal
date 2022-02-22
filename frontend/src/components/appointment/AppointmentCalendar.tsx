import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsFillBookmarkFill, BsCalendarCheck } from "react-icons/bs";
import { COLOR } from "../../CONSTANT";
import Calender from "../calendar/Calendar";

const AppointmentCalendar = ({ userInfo, profilePicUrl, day, setDay }: any) => {
  return (
    <Layout>
      <HeaderDiv>
        <img
          src={profilePicUrl}
          style={{ width: 80, height: 80, marginRight: 8, borderRadius: 10000 }}
        />
        <div style={{ marginLeft: 8 }}>
          <NameDiv>
            <Name>
              {userInfo.Name}
              {userInfo.Surname}
            </Name>
            <Username style={{ marginLeft: 8 }}>@{userInfo.Username}</Username>
          </NameDiv>
          {userInfo.rating}
          <PriceRateDiv>
            Price rate :
            <PriceRate style={{ marginLeft: 4 }}>
              {" "}
              {userInfo.minPrice}-{userInfo.maxPrice} baht (per 30 min)
            </PriceRate>
          </PriceRateDiv>
        </div>
      </HeaderDiv>
      <ContentDiv>
        {" "}
        <Calender day={day} setDay={setDay} />
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
`;
const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;
const ContentDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Name = styled.p`
  font-size: 20px;
`;
const Username = styled.p`
  font-size: 12px;
  color: ${COLOR["gray/700"]};
  margin-left: 10px;
`;
const PriceRateDiv = styled.p`
  display: flex;
  font-size: 16px;
`;
const PriceRate = styled.p`
  margin-left: 16px;
  font-weight: normal;
`;
export default AppointmentCalendar;