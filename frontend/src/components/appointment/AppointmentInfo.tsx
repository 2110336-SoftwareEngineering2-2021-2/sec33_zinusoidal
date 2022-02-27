import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegSmileWink } from "react-icons/fa";
import { COLOR } from "../../CONSTANT";
import { AiFillMinusCircle } from "react-icons/ai";
const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const AppointmentInfo = ({
  a,
  setA,
  userInfo,
  totalPrice,
  setTotalPrice,
  appointmentList,
  setAppointmentList,
  openOneAppointmentError,
  setOpenOneAppointmentError,
}: any) => {
  const deleteAppointment = (i: any) => {
    if (appointmentList.length == 1) {
      setOpenOneAppointmentError(true);
      return;
    }
    let newTimeList = [...a, i.time].sort();
    let newnewList = [];
    let start = newTimeList[0][0];
    let stop = newTimeList[0][1];
    let idx = 1;
    while (idx < newTimeList.length) {
      if (newTimeList[idx][0] > stop) {
        newnewList.push([start, stop]);
        start = newTimeList[idx][0];
        stop = newTimeList[idx][1];
      } else {
        if (newTimeList[idx][1] > stop) {
          stop = newTimeList[idx][1];
        }
      }
      idx++;
    }
    newnewList.push([start, stop]);
    let list = [...newnewList].sort();
    setA(list);
    setTotalPrice(totalPrice - i.price);

    setAppointmentList(
      appointmentList.filter(
        (x: any) => x.time[0] != i.time[0] && x.time[1] != i.time[1]
      )
    );
  };
  return (
    <Layout>
      <HeaderDiv>My Appointment</HeaderDiv>
      <ContentDiv>
        <TotalPrice>
          <p>Total Price :</p>
          <Number> {totalPrice} baht</Number>
        </TotalPrice>
        {openOneAppointmentError ? (
          <Error>You need to have at least one appointment!</Error>
        ) : null}
        <Appointment
          style={{
            justifyContent:
              appointmentList.length == 0 ? "center" : "flex-start",
            alignItems: appointmentList.length == 0 ? "center" : "flex-start",
          }}
        >
          {appointmentList.length == 0 ? (
            <FaRegSmileWink color={COLOR["gray/400"]} size={120} />
          ) : (
            <Appointments>
              {appointmentList.map((i: any) => (
                <AppointmentResult>
                  <ResultLine style={{ justifyContent: "space-between" }}>
                    <ResultItem>
                      <ResultItem>
                        Service : <Normal>{i.fortuneType}</Normal>
                      </ResultItem>
                      <ResultItem>
                        Provider :{" "}
                        <Normal>
                          {userInfo.Name} {userInfo.Surname}
                        </Normal>
                      </ResultItem>
                    </ResultItem>
                    <AiFillMinusCircle
                      color={COLOR["magenta/400"]}
                      size={20}
                      style={{
                        cursor: "pointer",
                        justifySelf: "flex-end",
                      }}
                      onClick={() => {
                        deleteAppointment(i);
                      }}
                    />
                  </ResultLine>
                  <ResultLine>
                    <ResultItem>
                      Date :{" "}
                      <Normal>
                        {i.Day.date} {MonthName[i.Day.month]} {i.Day.year}
                      </Normal>
                    </ResultItem>
                    <ResultItem>
                      Time :{" "}
                      <Normal>
                        {i.time[0]} - {i.time[1]}
                      </Normal>
                    </ResultItem>
                    <ResultItem>
                      Duration :{" "}
                      {i.DurationH == "0" ? (
                        <Normal>{i.DurationM}min</Normal>
                      ) : i.DurationM == "0" ? (
                        <Normal>{i.DurationH}h</Normal>
                      ) : (
                        <Normal>
                          {i.DurationH}h {i.DurationM}min
                        </Normal>
                      )}
                    </ResultItem>
                    <ResultItem>
                      Price : <Normal>{i.price} baht</Normal>
                    </ResultItem>
                  </ResultLine>
                </AppointmentResult>
              ))}
            </Appointments>
          )}
        </Appointment>
      </ContentDiv>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  background-color: white;
  height: fit-content;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;
const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TotalPrice = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  column-gap: 4px;
`;
const Number = styled.p`
  font-weight: normal;
`;
const Appointment = styled.div`
  min-height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  flex: 1;
  display: flex;
  padding: 15px;
`;

const AppointmentResult = styled.div`
  width: 100%;
  min-height: 120px;
  /* background-color: red; */
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
`;
const ResultLine = styled.div`
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
`;
const ResultItem = styled.div`
  display: flex;
  column-gap: 4px;
`;
const Normal = styled.p`
  font-weight: normal;
`;
const Appointments = styled.div`
  height: 400px;
  overflow-y: auto;
`;
const Error = styled.p`
  width: 100%;
  font-size: 16px;
  margin-left: 16px;
  font-weight: bold;
  color: ${COLOR["magenta/400"]};
`;
export default AppointmentInfo;
