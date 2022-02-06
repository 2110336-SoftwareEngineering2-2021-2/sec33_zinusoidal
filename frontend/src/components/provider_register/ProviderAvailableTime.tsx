import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React from "react";

import { MdRemoveRedEye } from "react-icons/md";

const ProviderProfileUpload = () => {
  return (
    <Layout>
      <Padding>
        <ProviderRegistration>
          <MdRemoveRedEye color={COLOR["violet/400"]} />
          Provider Registration
        </ProviderRegistration>
        <AvailableTime>Available Time</AvailableTime>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  background-color: white;
  font-weight: bold;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ProviderRegistration = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-size: 20px;
`;

const AvailableTime = styled.div`
  font-size: 18px;
  width: 100%;
`;

export default ProviderProfileUpload;
