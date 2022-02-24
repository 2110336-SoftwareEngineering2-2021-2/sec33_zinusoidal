import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

const ServiceDropDown = ({
  services,
  setService,
  setOpenServiceDropDown,
  setServicePrice,
  setStartTime,
  setStopTime,
  setPrice,
}: any) => {
  return (
    <DropDown>
      {services.map(({ fortuneType, price }: any) => (
        <Item
          onClick={() => {
            setStartTime("-1.0");
            setStopTime("24.0");
            setPrice(0);
            setService(fortuneType);
            setOpenServiceDropDown(false);
            setServicePrice(price);
          }}
        >
          {fortuneType}
        </Item>
      ))}
    </DropDown>
  );
};
const DropDown = styled.div`
  margin-top: 4px;
  width: 200px;
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

export default ServiceDropDown;
