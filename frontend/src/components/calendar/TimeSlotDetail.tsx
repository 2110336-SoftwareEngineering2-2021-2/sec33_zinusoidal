import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

const TimeSlotDetail = ({ time, type, topic }: any) => {
  const min =
    Number(time.stopTime.slice(0, 2)) * 60 +
    Number(time.stopTime.slice(3, 5)) -
    Number(time.startTime.slice(0, 2)) * 60 -
    Number(time.startTime.slice(3, 5));
  if (type == "free")
    return (
      <Layout
        style={{
          height: (57 * min) / 60,
          backgroundColor: COLOR["green/100"],
        }}
      />
    );
  if (type == "booked")
    return (
      <Layout
        style={{
          height: (57 * min) / 60,
          backgroundColor: COLOR["blue/100"],
        }}
      >
        <p>
          {time.startTime} - {time.stopTime}
        </p>
        <p>Topic : {topic}</p>
      </Layout>
    );
  if (type == "no") {
    return <Layout style={{ height: (57 * min) / 60 }} />;
  }
  return <></>;
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export default TimeSlotDetail;
