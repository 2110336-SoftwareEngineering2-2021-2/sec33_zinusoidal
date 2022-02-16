import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import axios from "axios";
const ServiceDropDown = ({
  serviceName,
  setServiceName,
  setServiceDropDownOpen,
}: any) => {
  const getAllService = () => {
    axios({
      method: "get",
      url: "https://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com/api/fortune168/v1/all_services",
      data: {},
    })
      .then(function (response) {
        setServiceList(response.data.services);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
  useEffect(() => {
    getAllService();
  }, []);
  const [serviceList, setServiceList] = useState([""]);
  return (
    <DropDown>
      {serviceList.map(
        (s, index) =>
          s.toLowerCase().includes(serviceName.toLowerCase()) && (
            <Item
              onClick={() => {
                setServiceName(s);
                setServiceDropDownOpen(false);
              }}
            >
              {s}
            </Item>
          )
      )}
    </DropDown>
  );
};
const DropDown = styled.div`
  width: 100%;
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

export default ServiceDropDown;
