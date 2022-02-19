import React from "react";
import styled from "styled-components";
import Calender from "../components/calender/Calender";
import { YEAR_2022 } from "../CONSTANT";
const CalenderTest = () => {
  return (
    <>
      CalenderTest
      <Layout>
        {YEAR_2022.map((month, index) => (
          <Calender key={index} CALENDERDATA={month.dayList} month={index} />
        ))}
      </Layout>
    </>
  );
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  background-color: blue;
`;

export default CalenderTest;
