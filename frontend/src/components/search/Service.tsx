import React from "react";
import styled from "styled-components";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

interface ServiceType {
  service: string;
  selected: boolean;
  callback: Function;
}
const Service = ({ service, selected, callback }: ServiceType) => {
  return (
    <Layout>
      {selected ? (
        <MdCheckBox
          size={24}
          style={{ marginRight: 8 }}
          onClick={() => {
            callback(service, 0);
          }}
        />
      ) : (
        <MdCheckBoxOutlineBlank
          size={24}
          style={{ marginRight: 8 }}
          color="#808080"
          onClick={() => {
            callback(service, 1);
          }}
        />
      )}

      {service}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.div`
  width: 24px;
  height: 24px;
`;
export default Service;
