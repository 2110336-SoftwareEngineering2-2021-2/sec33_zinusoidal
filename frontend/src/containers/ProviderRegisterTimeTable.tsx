import React from "react";
import styled from "styled-components";
import DaySlot from "../components/provider_register/DaySlot";

//prettier-ignore
const ListTime = [
  {day : 'Sun' , timeList : []},
  {day : 'Mon' , timeList : []},
  {day : 'Tue' , timeList : []},
  {day : 'Wed' , timeList : []},
  {day : 'Thu' , timeList : []},
  {day : 'Fri' , timeList : []},
  {day : 'Sat' , timeList : []},

];
const ProviderRegisterTimeTable = ({ userData }: any) => {
  console.log(userData);
  return (
    <Layout>
      {userData.AvailableTime.map((day: any, index: any) => (
        <DaySlot item={day} key={index} />
      ))}
    </Layout>
  );
};

const Layout = styled.div`
  padding: 15px;
  margin: 10px 15px;
  /* flex: 1; */
  height: 330px;
  z-index: 10;
  overflow-y: scroll;
  p {
    margin-left: initial;
  }
`;
export default ProviderRegisterTimeTable;
