import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { AiFillMinusCircle } from "react-icons/ai";

type TimeSlotType = {
  day: string;
  time: Array<String>;
  availableTime: any;
  setAvailableTime: any;
};
const TimeSlot = ({
  day,
  time,
  availableTime,
  setAvailableTime,
}: TimeSlotType) => {
  const deleteTime = (day: any, time: any) => {
    const remainTimeList = availableTime.filter(
      (dateSlot: any) => dateSlot.day != day
    );

    const deleteTimeList = availableTime.filter(
      (dateSlot: any) => dateSlot.day == day
    )[0].timeList;
    const remainingTime = deleteTimeList.filter((x: any) => x != time);

    const newData = [...remainTimeList, { day: day, timeList: remainingTime }];

    setAvailableTime(newData);
  };
  return (
    <Layout>
      <h3>
        {time[0]} - {time[1]}
      </h3>
      <AiFillMinusCircle
        color={COLOR["magenta/400"]}
        size={16}
        style={{
          marginLeft: 4,
          cursor: "pointer",
        }}
        onClick={() => deleteTime(day, time)}
      />
    </Layout>
  );
};

const Layout = styled.div`
  padding: 6px;
  min-width: 135px;
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
