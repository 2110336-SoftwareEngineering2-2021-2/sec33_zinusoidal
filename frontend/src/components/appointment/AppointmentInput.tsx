import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineProfile, AiFillMinusCircle } from "react-icons/ai";

import {
  BsFillBookmarkFill,
  BsCalendarCheck,
  BsChevronDown,
} from "react-icons/bs";
import { FaRegSmileWink } from "react-icons/fa";

import { COLOR } from "../../CONSTANT";
import ServiceDropDown from "./ServiceDropDown";
import StartTimeDropDown from "./StartTimeDropDown";
import StopTimeDropDown from "./StopTimeDropDown";
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
  setTotalPrice,
  totalPrice,
  a,
  setA,
  userInfo,
  selected,
}: any) => {
  const deleteAppointment = (i: any) => {
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
  const addAppointment = () => {
    let x;
    let y;
    if (startTime.includes(".30")) {
      x = Number(startTime) - 0.3 + 0.5;
    } else {
      x = Number(startTime);
    }
    if (stopTime.includes(".30")) {
      y = Number(stopTime) - 0.3 + 0.5;
    } else {
      y = Number(stopTime);
    }
    console.log(startTime, stopTime);
    console.log(y, x);

    let duration = y - x;
    let durationH, durationM;
    if (String(duration).includes(".5")) {
      durationH = String(duration - 0.5);
      durationM = "30";
    } else {
      durationH = String(duration);
      durationM = "0";
    }
    console.log(duration, durationH, durationM);
    let appointment = {
      DurationH: durationH,
      DurationM: durationM,
      Day: day,
      fortuneType: service,
      price: price,
      time: [startTime, stopTime],
    };
    setAppointmentList([...appointmentList, appointment]);
    let b = a.filter((x: any) => x[0] != a[index][0] && x[1] != a[index][1]);

    if (appointment.time[0] > a[index][0]) {
      b.push([a[index][0], appointment.time[0]]);
    }
    if (appointment.time[1] < a[index][1]) {
      b.push([appointment.time[1], a[index][1]]);
    }
    setA(b.sort());
    setTotalPrice(totalPrice + price);
    setService("");
    setPrice(0);
    setServicePrice(0);
    setStartTime("-1.0");
    setStopTime("24.0");
    setIndex(-1);
  };

  const [price, setPrice] = useState(0);
  const [service, setService] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [startTime, setStartTime] = useState("-1.0");
  const [stopTime, setStopTime] = useState("24.0");

  const [index, setIndex] = useState(-1);
  const [openServiceDropDown, setOpenServiceDropDown] = useState(false);
  const [openStartTimeDropDown, setOpenStartTimeDropDown] = useState(false);
  const [openStopTimeDropDown, setOpenStopTimeDropDown] = useState(false);

  const wrapperRef = useRef(null);
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

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
  function useOutsideAlerter1(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenStartTimeDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  function useOutsideAlerter2(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenStopTimeDropDown(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  useOutsideAlerter1(wrapperRef1);
  useOutsideAlerter2(wrapperRef2);

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
          {!selected ? (
            <BsCalendarCheck size={226} color={COLOR["gray/400"]} />
          ) : (
            <MaxH>
              <InputDiv>
                <p style={{ fontSize: 20 }}>
                  <b>
                    {day.date} {MonthName[day.month]} {day.year}
                  </b>
                </p>
                <div>
                  Available Time
                  <AvailableTimeDiv>
                    {a.map((time: any) => (
                      <TimeSlot>
                        <p>
                          {time[0]} - {time[1]}
                        </p>
                      </TimeSlot>
                    ))}
                  </AvailableTimeDiv>
                </div>
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
                        setStartTime={setStartTime}
                        setStopTime={setStopTime}
                        setPrice={setPrice}
                        setServicePrice={setServicePrice}
                        services={services}
                        setService={setService}
                        setOpenServiceDropDown={setOpenServiceDropDown}
                      />
                    ) : null}
                  </div>
                </ServiceDiv>
                <TimeDiv>
                  From{" "}
                  <div ref={wrapperRef1}>
                    <TimeInput
                      style={{
                        backgroundColor:
                          service == "" ? COLOR["gray/400"] : "white",
                        pointerEvents: service == "" ? "none" : "unset",
                      }}
                      onClick={() => {
                        setOpenStartTimeDropDown(!openStartTimeDropDown);
                      }}
                    >
                      {startTime == "-1.0" ? (
                        <p style={{ color: COLOR["gray/700"] }}>start time</p>
                      ) : (
                        startTime
                      )}
                      <BsChevronDown color="#AAA" />
                    </TimeInput>
                    {openStartTimeDropDown ? (
                      <StartTimeDropDown
                        a={a}
                        setStartTime={setStartTime}
                        setOpenStartTimeDropDown={setOpenStartTimeDropDown}
                        setIndex={setIndex}
                        setStopTime={setStopTime}
                        setPrice={setPrice}
                      />
                    ) : null}
                  </div>
                  To{" "}
                  <div ref={wrapperRef2}>
                    <TimeInput
                      style={{
                        backgroundColor:
                          startTime == "-1.0" ? COLOR["gray/400"] : "white",
                        pointerEvents: startTime == "-1.0" ? "none" : "unset",
                      }}
                      onClick={() => {
                        setOpenStopTimeDropDown(!openStartTimeDropDown);
                      }}
                    >
                      {stopTime == "24.0" ? (
                        <p style={{ color: COLOR["gray/700"] }}>stop time</p>
                      ) : (
                        stopTime
                      )}
                      <BsChevronDown color="#AAA" />
                    </TimeInput>
                    {openStopTimeDropDown ? (
                      <StopTimeDropDown
                        a={a}
                        setStopTime={setStopTime}
                        setOpenStopTimeDropDown={setOpenStopTimeDropDown}
                        startTime={startTime}
                        setPrice={setPrice}
                        index={index}
                        servicePrice={servicePrice}
                      />
                    ) : null}
                  </div>
                  <Button
                    onClick={() => {
                      addAppointment();
                    }}
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
                <p>Price : {price} baht</p>
              </InputDiv>
              <MyAppointment>
                <p style={{ fontSize: 20 }}>
                  <b>My Appointment</b>
                </p>
                <Appointment
                  style={{
                    justifyContent:
                      appointmentList.length == 0 ? "center" : "flex-start",
                    alignItems:
                      appointmentList.length == 0 ? "center" : "flex-start",
                  }}
                >
                  {appointmentList.length == 0 ? (
                    <FaRegSmileWink color={COLOR["gray/400"]} size={120} />
                  ) : (
                    <Appointments>
                      {appointmentList.map((i: any) => (
                        <AppointmentResult>
                          <ResultLine
                            style={{ justifyContent: "space-between" }}
                          >
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
                                {i.Day.date} {MonthName[i.Day.month]}{" "}
                                {i.Day.year}
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
            style={{
              backgroundColor:
                appointmentList.length == 0
                  ? COLOR["gray/400"]
                  : COLOR["violet/400"],
              pointerEvents: appointmentList.length == 0 ? "none" : "unset",
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
  cursor: pointer;
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
  padding: 15px;
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

const AvailableTimeDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  row-gap: 10px;
  column-gap: 10px;
  height: 30px;
  overflow-y: auto;
`;

const TimeSlot = styled.div`
  background-color: ${COLOR["violet/100"]};
  border-radius: 10000px;
  height: 30px;
  width: fit-content;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 156px;
  overflow-y: auto;
`;
export default AppointmentInput;
