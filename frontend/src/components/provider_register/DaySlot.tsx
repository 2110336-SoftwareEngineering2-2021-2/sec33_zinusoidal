import React from "react";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";

type DaySlotPropType = {
  item: {
    day: string;
    timeList: Array<Array<String>>;
  };
};
const DaySlot = ({ item }: DaySlotPropType) => {
  return (
    <Layout>
      <Day>{item.day}</Day>

      <Content>
        {item.timeList.length == 0 ? (
          <P>
            <p>Not available</p>
          </P>
        ) : (
          item.timeList.map((time) => <TimeSlot time={time} />)
        )}
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 8px;
`;

const Day = styled.div`
  width: 55px;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 15px;
  display: flex;
  flex-wrap: wrap;
`;

const P = styled.div`
  color: #f44336;
  font-size: 14px;
  line-height: 22px;
  /* background-color: red; */
  display: flex;
  align-items: center;
`;
export default DaySlot;
