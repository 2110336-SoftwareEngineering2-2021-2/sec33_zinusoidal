import React from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { COLOR } from "../../CONSTANT";
const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const CalenderHeader = ({
  month,
  selectedDate,
  setSelectedDate,
  getAvailableTime,
  setSelected,
}: any) => {
  return (
    <Layout>
      <p>
        {MonthName[month]} {selectedDate.year}
      </p>
      <ArrowLeftRight
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        getAvailableTime={getAvailableTime}
        setSelected={setSelected}
      />
    </Layout>
  );
};

const ArrowLeftRight = ({
  setSelectedDate,
  selectedDate,
  getAvailableTime,
  setSelected,
}: any) => {
  const leftClickHandle = () => {
    if (selectedDate.month == 0 && selectedDate.year == 2022) return;
    let month = selectedDate.month - 1;
    let year = selectedDate.year;
    if (month == -1) {
      month = 11;
      year -= 1;
    }
    setSelectedDate({
      ...selectedDate,
      year: year,
      month: month,
    });
    getAvailableTime(year, month);
    setSelected(false);
  };

  const rightClickHandle = () => {
    if (selectedDate.month == 11 && selectedDate.year == 2032) return;

    let month = selectedDate.month + 1;
    let year = selectedDate.year;
    if (month == 12) {
      month = 0;
      year += 1;
    }
    setSelectedDate({
      ...selectedDate,
      year: year,
      month: month,
    });
    getAvailableTime(year, month);
    setSelected(false);
  };
  return (
    <ArrowDiv>
      <AiOutlineLeft
        size={20}
        style={{
          width: 36,
          color:
            selectedDate.year == 2022 && selectedDate.month == 0
              ? COLOR["gray/500"]
              : "black",
          cursor: "pointer",
        }}
        onClick={leftClickHandle}
      />
      <AiOutlineRight
        size={20}
        style={{
          width: 36,
          color:
            selectedDate.year == 2032 && selectedDate.month == 11
              ? COLOR["gray/500"]
              : "black",
          cursor: "pointer",
        }}
        onClick={rightClickHandle}
      />
    </ArrowDiv>
  );
};
const Layout = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
  }
`;

const ArrowDiv = styled.div`
  width: 72px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default CalenderHeader;
