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
//prettier-ignore
const ProviderRegisterTimeTable = ({ userData }: any) => {
  // console.log(userData.AvailableTime);
  return (
    <Layout>
      {/* {userData.AvailableTime.map((day: any, index: any) => (
        <DaySlot item={day} key={index} />
      ))} */}
      
<DaySlot item={{day: 'Sunday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Sunday')[0].timeList}}  />
<DaySlot item={{day: 'Monday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Monday')[0].timeList}}  />
<DaySlot item={{day: 'Tueday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Tueday')[0].timeList}}  />
<DaySlot item={{day: 'Wedday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Wedday')[0].timeList}}  />
<DaySlot item={{day: 'Thuday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Thuday')[0].timeList}}  />
<DaySlot item={{day: 'Friday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Friday')[0].timeList}}  />
<DaySlot item={{day: 'Satday', timeList : userData.AvailableTime.filter((item:any)=> item.day == 'Satday')[0].timeList}}  />

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
