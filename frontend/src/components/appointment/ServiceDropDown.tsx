import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

const ServiceDropDown = ({
  services,
  setService,
  setOpenServiceDropDown,
}: any) => {
  console.log(services);
  return (
    <DropDown>
      {services.map(({ fortuneType, price }: any) => (
        <Item
          onClick={() => {
            setService(fortuneType);
            setOpenServiceDropDown(false);
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
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
