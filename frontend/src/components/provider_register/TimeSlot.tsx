import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

type TimeSlotType = {
  time: Array<String>;
};
const TimeSlot = ({ time }: TimeSlotType) => {
  return (
    <Layout>
      <h3>
        {time[0]} - {time[1]}
      </h3>
    </Layout>
  );
};

const Layout = styled.div`
  min-width: 141px;
  height: 30px;
  border-radius: 1000px;
  background-color: ${COLOR["violet/100"]};
  margin-bottom: 8px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default TimeSlot;
