import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

const DayDropDown = ({ selectDay, setDayDropDownOpen }: any) => {
  return (
    //prettier-ignore
    <DropDown>
      <Item onClick={() => {selectDay("Sunday");setDayDropDownOpen(false);}}>Sunday</Item>
      <Item onClick={() => {selectDay("Monday");setDayDropDownOpen(false);}}>Monday</Item>
      <Item onClick={() => {selectDay("Tuesday");setDayDropDownOpen(false);}}>Tuesday</Item>
      <Item onClick={() => {selectDay("Wednesday");setDayDropDownOpen(false);}}>Wednesday</Item>
      <Item onClick={() => {selectDay("Thursday");setDayDropDownOpen(false);}}>Thursday</Item>
      <Item onClick={() => {selectDay("Friday");setDayDropDownOpen(false);}}>Friday</Item>
      <Item onClick={() => {selectDay("Saturday");setDayDropDownOpen(false);}}>Saturday</Item>
    </DropDown>
  );
};
const DropDown = styled.div`
  margin-top: 10px;
  width: 200px;
  position: absolute;
  background-color: white;
  max-height: 150px !important;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 4px 4px;
  overflow-y: scroll;
  p {
    margin-left: initial;
  }
`;
const Item = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  font-weight: normal;
  :hover {
    background-color: ${COLOR["magenta/100"]};
  }
`;

export default DayDropDown;
