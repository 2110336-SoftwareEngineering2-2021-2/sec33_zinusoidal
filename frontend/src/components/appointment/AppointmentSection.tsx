import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppointmentSlider1 from "../../containers/AppointmentSlider1";
import AppointmentSlider2 from "../../containers/AppointmentSlider2";

import axios from "axios";

const AppointmentSection = (providerID: any) => {
  const [width, setWidth] = useState(window.innerWidth);
  console.log(width);
  //calendar info
  const [selected, setSelected] = useState(false);
  const [availableDay, setAvailableDay] = useState([0]);
  const [availableDayAndTime, setAvailableDayAndTime] = useState([
    { date: 0, timeList: [["", ""]] },
  ]);
  const [notAvailableDay, setNotAvailableDay] = useState([0]);
  const [a, setA] = useState([]);
  const [day, setDay] = useState({ date: 1, month: 0, year: 2022 });
  console.log(day.year, day.month);
  //appointment info
  const [infoList, setInfoList] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //current appointment page
  const [current, setCurrent] = useState(0);
  const [openOneAppointmentError, setOpenOneAppointmentError] = useState(false);
  //provider info
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Surname: "",
    Username: "",
    maxPrice: 0,
    minPrice: 0,
    rating: 0,
  });
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [service, setService] = useState([]);
  const [availableTime, setAvailableTime] = useState([
    { day: "Sunday", timeList: [] },
    { day: "Monday", timeList: [] },
    { day: "Tuesday", timeList: [] },
    { day: "Wednesday", timeList: [] },
    { day: "Thursday", timeList: [] },
    { day: "Friday", timeList: [] },
    { day: "Saturday", timeList: [] },
  ]);

  useEffect(() => {
    const TODAY = new Date();
    setDay({
      date: TODAY.getDate(),
      month: TODAY.getMonth(),
      year: TODAY.getFullYear(),
    });
    getProfile();
    getAvailableTime(TODAY.getFullYear(), TODAY.getMonth());
  }, []);
  let responseInput = {
    Name: "",
    Surname: "",
    Username: "",
    maxPrice: 0,
    minPrice: 0,
    rating: 0,
  };
  const getProfile = () => {
    axios({
      method: "get",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/provider/${providerID.providerID}`,
      data: {},
    })
      .then(function (response) {
        console.log("DATA", response.data);
        responseInput.Name = response.data.firstName;
        responseInput.Surname = response.data.lastName;
        responseInput.Username = response.data.username;
        responseInput.maxPrice = response.data.maxPrice;
        responseInput.minPrice = response.data.minPrice;
        responseInput.rating = response.data.rating;
        console.log("GET DATA", responseInput);

        setUserInfo(responseInput);
        setAvailableTime(response.data.workSchedule);
        setService(response.data.fortuneList);
        setProfilePicUrl(response.data.profilePicUrl);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
  const getAvailableTime = (year: any, month: any) => {
    axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/available_schedule/${providerID.providerID}`,
      data: {
        month: Number(month) + 1,
        year: Number(year),
      },
    })
      .then(function (response) {
        let x = [];
        for (let i = 0; i < response.data.available_date.length; i++) {
          x.push(response.data.available_date[i].date);
        }
        setAvailableDay(x);
        // console.log(response.data.available_date);
        setNotAvailableDay(response.data.not_available_date);
        setAvailableDayAndTime(response.data.available_date);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
  console.log(width);
  return (
    <Layout>
      <Content
        style={{
          justifyContent:
            current == 2 || current == 3 ? "center" : "space-between",
        }}
      >
        {current != 2 && current != 3 ? (
          <AppointmentSlider1
            setInfoList={setInfoList}
            getAvailableTime={getAvailableTime}
            selected={selected}
            setSelected={setSelected}
            availableDayAndTime={availableDayAndTime}
            availableDay={availableDay}
            notAvailableDay={notAvailableDay}
            setOpenOneAppointmentError={setOpenOneAppointmentError}
            openOneAppointmentError={openOneAppointmentError}
            availableTime={availableTime}
            a={a}
            setA={setA}
            setTotalPrice={setTotalPrice}
            setAppointmentList={setAppointmentList}
            appointmentList={appointmentList}
            totalPrice={totalPrice}
            current={current}
            userInfo={userInfo}
            profilePicUrl={profilePicUrl}
            day={day}
            setDay={setDay}
          />
        ) : null}
        <AppointmentSlider2
          setSelected={setSelected}
          selected={selected}
          providerID={providerID}
          setOpenOneAppointmentError={setOpenOneAppointmentError}
          a={a}
          setA={setA}
          userInfo={userInfo}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          appointmentList={appointmentList}
          setAppointmentList={setAppointmentList}
          infoList={infoList}
          setInfoList={setInfoList}
          day={day}
          services={service}
          current={current}
          setCurrent={setCurrent}
        />
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } ;
`;

export default AppointmentSection;
