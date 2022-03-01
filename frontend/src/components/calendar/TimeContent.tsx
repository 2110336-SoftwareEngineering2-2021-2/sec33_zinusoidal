import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import TimeSlotDetail from "./TimeSlotDetail";

const list = [
  { startTime: "00:00", stopTime: "02:00", type: "free", topic: "cat" },
  { startTime: "02:00", stopTime: "04:00", type: "booked", topic: "dog" },

  { startTime: "04:00", stopTime: "05:00", type: "booked", topic: "dog" },
  { startTime: "11:00", stopTime: "15:30", type: "free", topic: "dog" },
  { startTime: "17:00", stopTime: "24:00", type: "booked", topic: "dog" },
];
const TimeContent = ({ selectedDay }: any) => {
  let realList = [];

  for (let i = 0; i < list.length; i++) {
    if (i == 0) {
      if (list[0].startTime != "00:00") {
        realList.push({
          startTime: "00:00",
          stopTime: list[0].stopTime,
          type: "no",
          topic: "no",
        });
      }
    }
    realList.push(list[i]);
    if (i == list.length - 1) {
      break;
    }
    realList.push({
      startTime: list[i].stopTime,
      stopTime: list[i + 1].startTime,
      type: "no",
      topic: "no",
    });
  }
  if (list[list.length - 1].stopTime != "23:59") {
    realList.push({
      startTime: list[list.length - 1].stopTime,
      stopTime: "23:59",
      type: "no",
      topic: "no",
    });
  }

  return (
    <Layout>
      {realList.map((item) => (
        <TimeSlotDetail time={item} type={item.type} topic={item.topic} />
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  background-color: ${COLOR["gray/300"]};
  /* margin-top: 10px; */
  /* padding-top: 10px; */
`;
export default TimeContent;
