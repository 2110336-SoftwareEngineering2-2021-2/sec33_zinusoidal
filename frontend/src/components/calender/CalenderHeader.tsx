import React from "react";
import styled from "styled-components";

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
const CalenderHeader = ({ month }: any) => {
  return <Layout>{MonthName[month]} 2022</Layout>;
};

const Layout = styled.div`
  width: 100%;
  height: 38px;
`;

export default CalenderHeader;
