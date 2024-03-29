import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import AvailableTimeInputForm from "./AvailableTimeInputForm";
import ProviderRegisterTimeTable from "../../containers/ProviderRegisterTimeTable";
import { MdRemoveRedEye } from "react-icons/md";

const ProviderAvailableTime = ({ availableTime, setAvailableTime }: any) => {
  const [error, setError] = useState(false);

  return (
    <Layout>
      <HeaderSection>
        <ProviderRegistration>
          <MdRemoveRedEye color={COLOR["violet/400"]} />
          Provider Registration
        </ProviderRegistration>
        <AvailableTime>
          <p>Available Time</p>
          <AvailableTimeInputForm
            setError={setError}
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
          />
        </AvailableTime>
      </HeaderSection>
      <WorkingTimeSection>
        <h1>My Working Time</h1>
        {error ? (
          <Error>You need to have at least one working time</Error>
        ) : null}
        <ProviderRegisterTimeTable
          setError={setError}
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
        />
      </WorkingTimeSection>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
`;
const Error = styled.p`
  font-size: 16px;
  margin-left: 16px;
  font-weight: bold;
  color: ${COLOR["magenta/400"]};
`;
const HeaderSection = styled.div`
  min-height: 185px;
  padding: 15px 15px 0 15px;
  border-radius: 0 0 20px 20px;
  background-color: white;
`;
const ProviderRegistration = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-size: 20px;
`;

const AvailableTime = styled.div`
  width: 100%;
`;

const WorkingTimeSection = styled.div`
  margin-top: 7px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0 0;
  background-color: white;

  h1 {
    margin-left: 87px;
    margin-top: 19.87px;

    color: ${COLOR["blue/900"]};
    font-size: 20px;
    font-weight: bold;
    line-height: 31px;
  }
`;

export default ProviderAvailableTime;
