import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import { COLOR } from "../CONSTANT";
import Schedule from "../components/schedule/Schedule";
import LandingNav from "../components/landing/LandingNav";
import { YEARCOLLECTION } from "../CONSTANT";

const endMonth_1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const endMonth_2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function checkYear(year: number) {
  if (year % 400 == 0) return true;

  if (year % 100 == 0) return false;

  if (year % 4 == 0) return true;
  return false;
}

const CalenderTest = () => {
  const [day, setDay] = useState({ date: 1, month: 0, year: 2022 });

  const handleDay = (payload: number) => {
    setDay((day) => {
      let newDay = day.date + payload;
      let newMonth = day.month;
      let newYear = day.year;

      if (checkYear(day.year)) {
        if (newDay > endMonth_2[day.month]) {
          newDay -= endMonth_2[day.month];
          newMonth += 1;
        } else if (newDay < 1) {
          newMonth -= 1;
          if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
          }
          newDay = endMonth_2[newMonth] + newDay;
        }
      } else {
        if (newDay > endMonth_1[day.month]) {
          newDay -= endMonth_1[day.month];
          newMonth += 1;
        } else if (newDay < 1) {
          newMonth -= 1;
          if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
          }
          newDay = endMonth_1[newMonth] + newDay;
        }
      }
      if (newMonth == 12) {
        newMonth = 0;
        newYear += 1;
      }
      return { date: newDay, month: newMonth, year: newYear };
    });
  };

  const keyPressHandle = (evt: any) => {
    switch (evt.key) {
      case "ArrowLeft":
        if (day.month == 0 && day.year == 2022 && day.date - 1 < 1) return;
        handleDay(-1);
        break;
      case "ArrowUp":
        if (day.month == 0 && day.year == 2022 && day.date - 7 < 1) return;
        handleDay(-7);
        break;
      case "ArrowRight":
        if (day.month == 11 && day.year == 2032 && day.date + 1 > 31) return;
        handleDay(1);

        break;
      case "ArrowDown":
        console.log("TOTHIS", day);
        if (day.month == 11 && day.year == 2032 && day.date + 7 > 31) return;
        handleDay(7);

        break;
      default:
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyPressHandle);

    return () => {
      window.removeEventListener("keydown", keyPressHandle);
    };
  }, [day]);

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
