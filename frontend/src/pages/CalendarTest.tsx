import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import { COLOR } from "../CONSTANT";
import Schedule from "../components/schedule/Schedule";
import LandingNav from "../components/landing/LandingNav";
import { YEARCOLLECTION } from "../CONSTANT";

const CalenderTest = () => {
  const [day, setDay] = useState({ date: 1, month: 0, year: 2022 });

  useEffect(() => {
    const TODAY = new Date();

    setDay({
      date: TODAY.getDate(),
      month: TODAY.getMonth(),
      year: TODAY.getFullYear(),
    });
  }, []);
  return (
    <OuterContainer>
      <LandingNav />
      <Layout>
        <Calendar day={day} setDay={setDay} />
        <Schedule day={day} />
      </Layout>
    </OuterContainer>
  );
};

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${COLOR["magenta/100"]};
`;

export default CalenderTest;
