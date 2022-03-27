import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import Calender from "./Calendar";

const AppointmentCalendar = ({
  userInfo,
  profilePicUrl,
  day,
  setDay,
  availableTime,
  availableDay,
  notAvailableDay,
  setA,
  availableDayAndTime,
  setSelected,
  selected,
  getAvailableTime,
  setTotalPrice,
  setInfoList,
  setAppointmentList,
}: any) => {
  return (
    <Layout>
      <HeaderDiv>
        <Img src={profilePicUrl} />
        <div style={{ marginLeft: 8 }}>
          <NameDiv>
            <Name>
              {userInfo.Name}
              {userInfo.Surname}
            </Name>
            <Username>@{userInfo.Username}</Username>
          </NameDiv>
          <p style={{ fontSize: 16 }}>{userInfo.rating}</p>
          <PriceRateDiv>
            <div style={{ display: "flex" }}>
              Price rate :<SmallScreenText>per 30 min</SmallScreenText>
            </div>
            <PriceRate style={{ marginLeft: 4 }}>
              <p>
                {userInfo.minPrice}-{userInfo.maxPrice} baht
              </p>
              <LargeScreenText>(per 30 min)</LargeScreenText>
            </PriceRate>
          </PriceRateDiv>
        </div>
      </HeaderDiv>

      <ContentDiv>
        {" "}
        <Calender
          getAvailableTime={getAvailableTime}
          day={day}
          setDay={setDay}
          availableTime={availableTime}
          availableDay={availableDay}
          notAvailableDay={notAvailableDay}
          setA={setA}
          availableDayAndTime={availableDayAndTime}
          setSelected={setSelected}
          selected={selected}
          setTotalPrice={setTotalPrice}
          setInfoList={setInfoList}
          setAppointmentList={setAppointmentList}
        />
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
  @media screen and (max-width: 540px) {
    width: 300px;
    padding: 20px;
  } ;
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
  @media screen and (max-width: 540px) {
    width: 300px;
  } ;
`;
const NameDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  } ;
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
  @media screen and (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  } ;
`;
const PriceRate = styled.p`
  margin-left: 16px;
  font-weight: normal;
  display: flex;
`;
const Img = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 8px;
  border-radius: 10000px;
  object-fit: "cover";
  @media screen and (max-width: 540px) {
    width: 64px;
    height: 64px;
  } ;
`;
const SmallScreenText = styled.p`
  margin-left: 8px;
  font-weight: normal;
  @media screen and (min-width: 540px) {
    display: none;
  } ;
`;
const LargeScreenText = styled.p`
  @media screen and (max-width: 540px) {
    display: none;
  } ;
`;

export default AppointmentCalendar;
