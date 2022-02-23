import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import {
  BsFillBookmarkFill,
  BsCalendarCheck,
  BsChevronDown,
} from "react-icons/bs";
import { FaRegSmileWink } from "react-icons/fa";

import { COLOR } from "../../CONSTANT";
import ServiceDropDown from "./ServiceDropDown";
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
const AppointmentInput = ({
  day,
  services,
  current,
  setCurrent,
  appointmentList,
  setAppointmentList,
}: any) => {
  console.log(current);
  const [price, setPrice] = useState(0);
  const [service, setService] = useState("");
  const [startTime, setStartTime] = useState("-1.0");
  const [stopTime, setStopTime] = useState("24.0");
  const [openServiceDropDown, setOpenServiceDropDown] = useState(false);
  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenServiceDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  return (
    <Layout>
      <Padding>
        <HeaderDiv>
          <BsFillBookmarkFill
            color={COLOR["violet/400"]}
            size={24}
            style={{ marginRight: 5 }}
          />
          Make Appointment
        </HeaderDiv>
        <ContentDiv>
          {day.day == new Date() ? (
            <BsCalendarCheck size={226} color={COLOR["gray/400"]} />
          ) : (
            <MaxH>
              <InputDiv>
                <p style={{ fontSize: 20 }}>
                  <b>
                    {day.date} {MonthName[day.month]} {day.year}
                  </b>
                </p>

                <div>Available Time</div>
                <ServiceDiv>
                  Service
                  <div ref={wrapperRef}>
                    <ServiceSelector
                      onClick={() => {
                        setOpenServiceDropDown(!openServiceDropDown);
                      }}
                    >
                      {service == "" ? (
                        <p style={{ color: "#AAA" }}>service</p>
                      ) : (
                        service
                      )}
                      <BsChevronDown color="#AAA" />
                    </ServiceSelector>
                    {openServiceDropDown ? (
                      <ServiceDropDown
                        services={services}
                        setService={setService}
                        setOpenServiceDropDown={setOpenServiceDropDown}
                      />
                    ) : null}
                  </div>
                </ServiceDiv>
                <TimeDiv>
                  From{" "}
                  <TimeInput>
                    {startTime == "-1.0" ? (
                      <p style={{ color: "#AAA" }}>start time</p>
                    ) : (
                      startTime
                    )}
                    <BsChevronDown color="#AAA" />
                  </TimeInput>
                  To{" "}
                  <TimeInput>
                    {stopTime == "24.0" ? (
                      <p style={{ color: "#AAA" }}>stop time</p>
                    ) : (
                      stopTime
                    )}
                    <BsChevronDown color="#AAA" />
                  </TimeInput>
                  <Button
                    disabled={
                      service == "" || startTime == "-1.0" || stopTime == "24.0"
                    }
                    style={{
                      backgroundColor:
                        service == "" ||
                        startTime == "-1.0" ||
                        stopTime == "24.0"
                          ? COLOR["gray/400"]
                          : COLOR["violet/400"],
                      pointerEvents:
                        service == "" ||
                        startTime == "-1.0" ||
                        stopTime == "24.0"
                          ? "none"
                          : "unset",
                    }}
                  >
                    Add
                  </Button>
                </TimeDiv>
                <div>Price : {price} baht</div>
              </InputDiv>
              <MyAppointment>
                <p style={{ fontSize: 20 }}>
                  <b>My Appointment</b>
                </p>
                <Appointment>
                  {appointmentList.length == 0 ? (
                    <FaRegSmileWink color={COLOR["gray/400"]} size={120} />
                  ) : (
                    <p>Service here</p>
                  )}
                </Appointment>
              </MyAppointment>
            </MaxH>
          )}
        </ContentDiv>
        <ButtonDiv>
          <PrevButton
            style={{ visibility: current == 0 ? "hidden" : "visible" }}
          >
            <MdOutlineNavigateBefore />
            Back
          </PrevButton>

          <NextButton
            onClick={() => {
              setCurrent(1);
            }}
          >
            Next
            <MdOutlineNavigateNext />
          </NextButton>
        </ButtonDiv>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 536px;
  background-color: white;
  height: 668px;
  border-radius: 20px;
`;
const Padding = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
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
  justify-content: center;
  align-items: center;
`;
const MaxH = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;
const MyAppointment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ServiceDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;
const ServiceSelector = styled.div`
  cursor: pointer;
  width: 200px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #808080;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: space-between;
`;
const TimeDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 25px;
`;
const TimeInput = styled.div`
  height: 38px;
  width: 110px;

  border-radius: 8px;
  border: 1px solid #808080;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: space-between;
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;
  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: white;

  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]} !important;
  }
`;
const Appointment = styled.div`
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NextButton = styled.div`
  width: 90px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;
  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]} !important;
  }
`;
const PrevButton = styled.div`
  width: 90px;
  height: 40px;
  background-color: white;
  border: 1px solid ${COLOR["violet/400"]};
  border-radius: 10000px;
  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: ${COLOR["violet/400"]};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    color: ${COLOR["violet/500"]} !important;
    border: 1px solid ${COLOR["violet/500"]}!important;
  }
`;
export default AppointmentInput;
