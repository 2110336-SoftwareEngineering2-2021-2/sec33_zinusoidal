import React from "react";
import styled from "styled-components";
import DaySlot from "../components/provider_register/DaySlot";

//prettier-ignore
const ProviderRegisterTimeTable = ({availableTime,setAvailableTime }: any) => {
  return (
    <Layout>
      {/* {userData.AvailableTime.map((day: any, index: any) => (
        <DaySlot item={day} key={index} />
      ))} */}
      
<DaySlot item={{day: 'Sunday', timeList : availableTime.filter((item:any)=> item.day == 'Sunday')[0].timeList}} availableTime = {availableTime} setAvailableTime = {setAvailableTime}  />
<DaySlot item={{day: 'Monday', timeList : availableTime.filter((item:any)=> item.day == 'Monday')[0].timeList}} availableTime = {availableTime} setAvailableTime = {setAvailableTime}  />
<DaySlot item={{day: 'Tuesday', timeList : availableTime.filter((item:any)=> item.day == 'Tuesday')[0].timeList}}  availableTime = {availableTime} setAvailableTime = {setAvailableTime} />
<DaySlot item={{day: 'Wednesday', timeList : availableTime.filter((item:any)=> item.day == 'Wednesday')[0].timeList}} availableTime = {availableTime} setAvailableTime = {setAvailableTime}  />
<DaySlot item={{day: 'Thursday', timeList : availableTime.filter((item:any)=> item.day == 'Thursday')[0].timeList}}  availableTime = {availableTime} setAvailableTime = {setAvailableTime} />
<DaySlot item={{day: 'Friday', timeList : availableTime.filter((item:any)=> item.day == 'Friday')[0].timeList}}  availableTime = {availableTime} setAvailableTime = {setAvailableTime}  />
<DaySlot item={{day: 'Saturday', timeList : availableTime.filter((item:any)=> item.day == 'Saturday')[0].timeList}}availableTime = {availableTime} setAvailableTime = {setAvailableTime}  />

    </Layout>
  );
};

const Layout = styled.div`
  padding: 15px;
  margin: 10px 15px;
  /* flex: 1; */
  height: 330px;
  overflow-y: scroll;
  p {
    margin-left: initial;
  }
`;
export default ProviderRegisterTimeTable;
