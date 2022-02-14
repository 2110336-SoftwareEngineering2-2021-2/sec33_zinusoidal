import React from "react";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";

type DaySlotPropType = {
  item: {
    day: string;
    timeList: Array<Array<String>>;
  };
  availableTime: any;
  setAvailableTime: any;
};

const DaySlot = ({
  item,
  availableTime,
  setAvailableTime,
}: DaySlotPropType) => {
  return (
    <Layout>
      <Day>{item.day.slice(0, 3)}</Day>

      <Content>
        {item.timeList.length == 0 ? (
          <P>
            <p>Not available</p>
          </P>
        ) : (
          item.timeList.map((time, index) => (
            <TimeSlot
              availableTime={availableTime}
              setAvailableTime={setAvailableTime}
              day={item.day}
              time={time}
              key={index}
            />
          ))
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
  margin-left: 0px;
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
