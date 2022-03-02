import React from "react";
import styled from "styled-components";
import TimeContent from "./TimeContent";
//prettier-ignore
const TIME = [
  "00.00","01.00","02.00","03.00","04.00","05.00","06.00","07.00","08.00","09.00","10.00","11.00","12.00","13.00","14.00","15.00","16.00","17.00","18.00","19.00","20.00","21.00","22.00","23.00"
];
const TimeCalendar = ({ selectedDay }: any) => {
  return (
    <Layout>
      <TimeBar />
      <TimeContent selectedDay={selectedDay} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  display: flex;
  padding-top: 16px;
`;

const TimeBar = () => {
  return (
    <TimeBarFrame>
      {TIME.map((time) => (
        <Time>{time}</Time>
      ))}
      24.00
    </TimeBarFrame>
  );
};

const TimeBarFrame = styled.div`
  width: 48px;
`;
const Time = styled.div`
  height: 57px;
`;
export default TimeCalendar;
