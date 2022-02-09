import React from "react";
import styled from "styled-components";
import DaySlot from "../components/provider_register/DaySlot";

//prettier-ignore
const ListTime = [
  {day : 'Sun' , timeList : [['8.30','9.30'],['10.00' , '11.00'],['12.00' , '14.00'],['15.00', '16.00']]},
  {day : 'Mon' , timeList : []},
  {day : 'Tue' , timeList : [['8.30','9.30'],['10.00' , '11.00'],['12.00' , '14.00'],['15.00', '16.00']]},
  {day : 'Wed' , timeList : [['8.30','9.30'],['10.00' , '11.00'],['12.00' , '14.00'],['15.00', '16.00']]},
  {day : 'Thu' , timeList : [['8.30','9.30'],['10.00' , '11.00'],['12.00' , '14.00'],['15.00', '16.00']]},
  {day : 'Fri' , timeList : [['8.30','9.30'],['10.00' , '11.00'],['12.00' , '14.00'],['15.00', '16.00']]},
  {day : 'Sat' , timeList : []},

];
const ProviderRegisterTimeTable = () => {
  return (
    <Layout>
      {ListTime.map((day, index) => (
        <DaySlot item={day} key={index} />
      ))}
    </Layout>
  );
};

const Layout = styled.div`
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
