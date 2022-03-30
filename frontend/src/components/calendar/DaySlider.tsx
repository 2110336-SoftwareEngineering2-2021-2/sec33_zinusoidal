import React from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { COLOR } from "../../CONSTANT";
//prettier-ignore
const monthName = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC",
];
const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const endMonth_1 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const endMonth_2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function checkYear(year: number) {
  if (year % 400 == 0) return true;

  if (year % 100 == 0) return false;

  if (year % 4 == 0) return true;
  return false;
}

const DaySlider = ({
  startDay,
  setStartDay,
  selectedDay,
  setSelected,
}: any) => {
  const handleClick = (payload: number) => {
    let newDate = startDay.date + payload;
    let newMonth = startDay.month;
    let newYear = startDay.year;
    if (checkYear(startDay.year)) {
      if (newDate > endMonth_2[month]) {
        newDate = newDate - endMonth_2[month];
        newMonth += 1;
      }
      if (newDate < 1) {
        if (newMonth == 0) {
          newDate = 31 + newDate;
          newMonth = 11;
          newYear -= 1;
        } else {
          newDate = endMonth_2[month - 1] + newDate;
          newMonth -= 1;
        }
      }
    } else {
      if (newDate > endMonth_1[month]) {
        newDate = newDate - endMonth_1[month];
        newMonth += 1;
      }
      if (newDate < 1) {
        if (newMonth == 0) {
          newDate = 31 + newDate;
          newMonth = 11;
          newYear -= 1;
        } else {
          newDate = endMonth_1[month - 1] + newDate;
          newMonth -= 1;
        }
      }
    }

    if (newMonth == 12) {
      newMonth = 0;
      newYear += 1;
    }
    setStartDay({
      day: startDay.day,
      date: newDate,
      month: newMonth,
      year: newYear,
    });
    setSelected({
      day: startDay.day,
      date: newDate,
      month: newMonth,
      year: newYear,
    });
  };
  let dayList = [];
  let day = startDay.day;
  let date = startDay.date;
  let month = startDay.month;
  let year = startDay.year;
  for (let i = 0; i < 7; i++) {
    let newDate = date + i;
    let newMonth = month;
    if (checkYear(startDay.year)) {
      if (newDate > endMonth_2[month]) {
        newDate = newDate - endMonth_2[month];
        newMonth += 1;
      }
    } else {
      if (newDate > endMonth_1[month]) {
        newDate = newDate - endMonth_1[month];
        newMonth += 1;
      }
    }
    let newYear = year;
    if (newMonth == 12) {
      newMonth = 0;
      newYear += 1;
    }
    let newDay = (day + i) % 7;
    dayList.push({
      date: newDate,
      day: newDay,
      month: newMonth,
      year: newYear,
    });
  }
  return (
    <OuterContainer>
      <AiOutlineLeft
        onClick={() => {
          handleClick(-7);
        }}
        size={24}
      />

      <Layout>
        {dayList.map((item, index) => (
          <DaySlot
            key={index}
            day={item.day}
            date={item.date}
            month={item.month}
            year={item.year}
            selected={
              item.date == selectedDay.date && item.month == selectedDay.month
            }
            setSelected={setSelected}
          />
        ))}
      </Layout>
      <AiOutlineRight
        onClick={() => {
          handleClick(7);
        }}
        size={24}
      />
    </OuterContainer>
  );
};

const DaySlot = ({ day, date, month, year, selected, setSelected }: any) => {
  return (
    <DayFrame
      onClick={() => {
        setSelected({ day: day, date: date, month: month, year: year });
      }}
      style={{ backgroundColor: selected ? COLOR["violet/100"] : "white" }}
    >
      <b>{dayName[day]}</b>
      <p>{date}</p>
      <b>{monthName[month]}</b>
    </DayFrame>
  );
};

const OuterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Layout = styled.div`
  width: 100%;
  height: 101px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  align-items: center;
`;

const DayFrame = styled.div`
  height: 101px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  line-height: 31px;
  border-radius: 4px;
  cursor: pointer;
  justify-content: center;

  @media screen and (min-width: 769px) and (max-width: 1050px) {
    font-size: 12px;
    line-height: 18px;
    height: 90px;
  }
  @media screen and (min-width: 451px) and (max-width: 768px) {
    font-size: 20px;
    line-height: 31px;
    height: 101px;
  }

  @media screen and (max-width: 450px) {
    font-size: 12px;
    line-height: 18px;
    height: 90px;
  }
  @media screen and (max-width: 350px) {
    font-size: 10px;
    line-height: 18px;
    height: 90px;
  }
`;
export default DaySlider;
