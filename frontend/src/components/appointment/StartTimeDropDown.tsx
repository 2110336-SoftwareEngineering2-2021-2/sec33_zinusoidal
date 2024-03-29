import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
//prettier-ignore

const STARTTIME = [

  "00.00",  "00.30",  "01.00",  "01.30",  "02.00",  "02.30",  "03.00",  "03.30",
  "04.00",  "04.30",  "05.00",  "05.30",  "06.00",  "06.30",  "07.00",  "07.30",
  "08.00",  "08.30",  "09.00",  "09.30",  "10.00",  "10.30",  "11.00",  "11.30",
  "12.00",  "12.30",  "13.00",  "13.30",  "14.00",  "14.30",  "15.00",  "15.30",
  "16.00",  "16.30",  "17.00",  "17.30",  "18.00",  "18.30",  "19.00",  "19.30",
  "20.00",  "20.30",  "21.00",  "21.30",  "22.00",  "22.30",  "23.00",  "23.30",
];
const StartTimeDropDown = ({
  a,
  setStartTime,
  setOpenStartTimeDropDown,
  setIndex,
  setStopTime,
  setPrice,
}: any) => {
  return (
    <DropDown>
      {STARTTIME.map((element: any) => {
        for (let i = 0; i < a.length; i++) {
          if (element >= a[i][0] && element < a[i][1]) {
            return (
              <Item
                onClick={() => {
                  setStartTime(element);
                  setOpenStartTimeDropDown(false);
                  setIndex(i);
                  setStopTime("24.0");
                  setPrice(0);
                }}
              >
                {element}
              </Item>
            );
          }
          if (element == a[i][1]) {
            i += 1;
          }
        }
      })}
    </DropDown>
  );
};
const DropDown = styled.div`
  margin-top: 4px;
  width: 110px;
  position: absolute;
  background-color: white;
  max-height: 150px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 0px 0px 4px 4px;

  overflow-y: auto;
  p {
    margin-left: initial;
  }
`;
const Item = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  font-weight: normal;
  :hover {
    background-color: ${COLOR["blue/100"]};
  }
`;

export default StartTimeDropDown;
