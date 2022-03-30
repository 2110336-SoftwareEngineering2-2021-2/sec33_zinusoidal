import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaySlider from "./DaySlider";
import TimeCalendar from "./TimeCalendar";
const AvailableTimeCalendar = ({ providerID }: any) => {
  const [day, setDay] = useState({ day: 0, date: 1, month: 0, year: 2022 });
  const [selectedDay, setSelectedDay] = useState({
    day: 0,
    date: 1,
    month: 0,
    year: 2022,
  });
  useEffect(() => {
    const TODAY = new Date();
    setDay({
      day: TODAY.getDay(),
      date: TODAY.getDate(),
      month: TODAY.getMonth(),
      year: TODAY.getFullYear(),
    });
    setSelectedDay({
      day: TODAY.getDay(),
      date: TODAY.getDate(),
      month: TODAY.getMonth(),
      year: TODAY.getFullYear(),
    });
  }, []);
  return (
    <Layout>
      <DaySlider
        startDay={day}
        setStartDay={setDay}
        selectedDay={selectedDay}
        setSelected={setSelectedDay}
      />
      <TimeCalendar selectedDay={selectedDay} providerID={providerID} />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  /* height: 300px; */
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  margin-top: 10px;
`;

export default AvailableTimeCalendar;
