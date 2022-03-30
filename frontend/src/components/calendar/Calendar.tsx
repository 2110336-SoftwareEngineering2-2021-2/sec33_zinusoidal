import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import CalenderHeader from "./CalendarHeader";
import { YEARCOLLECTION } from "../../CONSTANT";
import DayBar from "./DayBar";
type DatePropType = {
  inMonth: boolean;
  selected: boolean;
};

const lastDay = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];

function checkYear(year: number) {
  if (year % 400 == 0) return true;

  if (year % 100 == 0) return false;

  if (year % 4 == 0) return true;
  return false;
}
const Calender = ({ day, setDay, setPressed }: any) => {
  const [selectedDate, setSelectedDate] = useState({
    month: 0,
    year: 2022,
  });

  useEffect(() => {
    setSelectedDate((selectedDate) => {
      return { year: day.year, month: day.month };
    });
  }, [day]);

  useEffect(() => {
    const TODAY = new Date();

    setSelectedDate({
      month: TODAY.getMonth(),
      year: TODAY.getFullYear(),
    });
  }, []);

  const CALENDERDATA =
    YEARCOLLECTION[selectedDate.year - 2022][selectedDate.month].li;
  let pre = [];
  let post = [];
  const idx = CALENDERDATA[0].idx;
  let last = lastDay[selectedDate.month];
  if (selectedDate.month == 2 && checkYear(selectedDate.year)) last += 1;
  for (let k = last - (idx - 1); k <= last; k++) {
    pre.push({ date: k, idx: -1 });
  }
  const j = pre.concat(CALENDERDATA);

  for (let t = 1; t <= 1 + (42 - pre.length - CALENDERDATA.length - 1); t++) {
    post.push({ date: t, idx: -1 });
  }
  const jj = j.concat(post);

  return (
    <Layout>
      <CalenderHeader
        month={selectedDate.month}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <DayBar />
      <CalenderContainer>
        {jj.map((item, index) => (
          <DateSlot
            key={index}
            inMonth={item.idx != -1}
            selected={
              day.date == item.date &&
              day.month == selectedDate.month &&
              day.year == selectedDate.year &&
              item.idx != -1
            }
            style={{
              backgroundColor:
                day.date == item.date &&
                selectedDate.month == day.month &&
                day.year == selectedDate.year &&
                item.idx != -1
                  ? COLOR["gray/800"]
                  : "white",
            }}
            onClick={() => {
              if (item.idx == -1) return;
              setPressed(true);
              setDay({
                date: item.date,
                month: selectedDate.month,
                year: selectedDate.year,
              });
            }}
          >
            <p>{item.date}</p>
          </DateSlot>
        ))}
      </CalenderContainer>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: white;
  width: 516px;
  padding: 20px;
  border-radius: 20px;
  overflow: hidden;
  user-select: none;
  position: relative;
  margin-top: 129px;
  margin-bottom: 129px;

  @media screen and (max-width: 600px) {
    width: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 400px;
  }
  @media screen and (max-width: 420px) {
    width: 320px;
    margin-top: 100px;
  }

  @media screen and (max-width: 330px) {
    width: 300px;
    margin-top: 100px;
  }
`;

const CalenderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* background-color: blue; */
`;

const DateSlot = styled("div")<DatePropType>`
  height: 60px;
  /* border: 1px solid black; */
  padding: 5px;
  cursor: pointer;
  p {
    color: ${(props) =>
      props.inMonth ? (props.selected ? "white" : "black") : COLOR["gray/400"]};
    text-align: left;
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }

  @media screen and (max-width: 600px) {
    height: 50px;
  }
  @media screen and (max-width: 500px) {
    height: 40px;
  }
  @media screen and (max-width: 420px) {
    height: 30px;
  }

  @media screen and (max-width: 330px) {
    height: 30px;
  }
`;

export default Calender;
