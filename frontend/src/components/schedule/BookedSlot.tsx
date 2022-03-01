import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

const ranColor = ["#C8F2BD", "#B6EAF2", "#FCC7C3", "#DFC0F1", "#e691b3"];
const RandomColor = () => {
  const a = Math.floor(Math.random() * 5);
  return ranColor[a];
};

type SlotType = {
  idx: number;
};

const Calculate = (startTime: string, stopTime: string) => {
  const min =
    Number(stopTime.slice(0, 2)) * 60 +
    Number(stopTime.slice(3, 5)) -
    Number(startTime.slice(0, 2)) * 60 -
    Number(startTime.slice(3, 5));
  if (Math.floor(min / 60) == 0) return `${min % 60} min`;

  return `${Math.floor(min / 60)} hours ${min % 60} mins`;
};

const BookedSlot = ({ data, idx }: any) => {
  const s = Calculate(data.time[0], data.time[1]);
  return (
    <Layout idx={idx}>
      <Block>
        <p>
          {data.time[0]} - {data.time[1]}
        </p>
        <p>{s}</p>
      </Block>
      <Block>Topic : {data.topic}</Block>
      <Block>
        Customer : {data.firstName} {data.lastName}{" "}
      </Block>
    </Layout>
  );
};

const Layout = styled("div")<SlotType>`
  width: 100%;
  min-height: 115px;
  background-color: ${(props) => ranColor[props.idx % 5]};
  margin-bottom: 18px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: relative;
`;

const Block = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
export default BookedSlot;
