import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calender from "../components/calender/Calender";
import { COLOR } from "../CONSTANT";
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
    <>
      <Layout>
        <Calender day={day} setDay={setDay} />
      </Layout>
    </>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${COLOR["magenta/100"]};
`;

export default CalenderTest;
