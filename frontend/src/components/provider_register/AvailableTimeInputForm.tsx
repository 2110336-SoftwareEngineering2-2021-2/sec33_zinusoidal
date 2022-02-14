import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { AiOutlineDown } from "react-icons/ai";
import DayDropDown from "./DayDropDown";
import StartTimeDropDown from "./StartTimeDropDown";
import StopTimeDropDown from "./StopTimeDropDown";
import { isConstructorDeclaration } from "typescript";

type InputPropType = {
  time?: boolean;
};
const AvailableTimeInputForm = ({ availableTime, setAvailableTime }: any) => {
  const [dayDropDownOpen, setDayDropDownOpen] = useState(false);
  const [startTimeDropDownOpen, setStartTimeDropDownOpen] = useState(false);
  const [stopTimeDropDownOpen, setStopTimeDropDownOpen] = useState(false);
  const [timeConflict, setTimeConflict] = useState(false);

  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("-1.0");
  const [stopTime, setStopTime] = useState("24.0");

  const wrapperRef = useRef(null);
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

  const handleInputForm = () => {
    const remainTime = availableTime.filter(
      (dateSlot: any) => dateSlot.day != day
    );
    const oldTimeList = availableTime.filter(
      (dateSlot: any) => dateSlot.day == day
    )[0].timeList;

    let newTimeList = [...oldTimeList, [startTime, stopTime]].sort();
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
    let list = [...newnewList];
    const newData = [...remainTime, { day: day, timeList: list }];
    setAvailableTime(newData);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDayDropDownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter1(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setStartTimeDropDownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter1(wrapperRef1);

  function useOutsideAlerter2(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setStopTimeDropDownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter2(wrapperRef2);

  return (
    <Layout>
      <InputLayout>
        <DayDiv ref={wrapperRef}>
          <DayInput
            onClick={() => {
              setDayDropDownOpen(!dayDropDownOpen);
            }}
          >
            {day == "" ? <PlaceHolder>Sunday</PlaceHolder> : <p>{day}</p>}
            <AiOutlineDown />
          </DayInput>
          {dayDropDownOpen ? (
            <DayDropDown
              selectDay={setDay}
              setDayDropDownOpen={setDayDropDownOpen}
            />
          ) : null}
        </DayDiv>
        <TimeAndButton>
          <Time>
            <TimeDiv ref={wrapperRef1}>
              <TimeInput
                onClick={() => {
                  setStartTimeDropDownOpen(!startTimeDropDownOpen);
                }}
              >
                {startTime == "-1.0" ? (
                  <PlaceHolder>start time</PlaceHolder>
                ) : (
                  <p>{startTime}</p>
                )}
                <AiOutlineDown />
              </TimeInput>
              {startTimeDropDownOpen ? (
                <StartTimeDropDown
                  stopTime={stopTime}
                  setStartTime={setStartTime}
                  setStartTimeDropDownOpen={setStartTimeDropDownOpen}
                />
              ) : null}
            </TimeDiv>
            <p>to</p>
            <TimeDiv ref={wrapperRef2}>
              <TimeInput
                onClick={() => {
                  setStopTimeDropDownOpen(!stopTimeDropDownOpen);
                }}
              >
                {stopTime == "24.0" ? (
                  <PlaceHolder>stop time</PlaceHolder>
                ) : (
                  <p>{stopTime}</p>
                )}
                <AiOutlineDown />
              </TimeInput>
              {stopTimeDropDownOpen ? (
                <StopTimeDropDown
                  startTime={startTime}
                  setStopTime={setStopTime}
                  setStopTimeDropDownOpen={setStopTimeDropDownOpen}
                />
              ) : null}
            </TimeDiv>
          </Time>
          <Button
            disabled={day == "" || startTime == "-1.0" || stopTime == "24.0"}
            onClick={() => {
              setTimeConflict(false);
              setDay("");
              setStartTime("-1.0");
              setStopTime("24.0");
              handleInputForm();
            }}
            style={{
              backgroundColor:
                day == "" || startTime == "-1.0" || stopTime == "24.0"
                  ? COLOR["gray/400"]
                  : COLOR["violet/400"],
              pointerEvents:
                day == "" || startTime == "-1.0" || stopTime == "24.0"
                  ? "none"
                  : "unset",
            }}
          >
            Add
          </Button>
        </TimeAndButton>
      </InputLayout>
      {timeConflict ? <Error>Can't select overlapped time period</Error> : null}
    </Layout>
  );
};
const Layout = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const InputLayout = styled("div")`
  width: 100%;
  display: flex;
  height: 38px;
  margin-top: 15px;
  align-items: center;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    justify-content: center;
  } ;
`;

const DayDiv = styled.div`
  cursor: pointer;
  height: 40px;
  width: 180px;
  border: 1px solid ${COLOR["gray/500"]};
  padding-right: 12px;
  border-radius: 8px;
  @media screen and (max-width: 540px) {
    width: 150px;

    margin-top: 20px;
    margin-bottom: 8px;
  } ;
`;

const PlaceHolder = styled.p`
  color: ${COLOR["gray/500"]};
`;

const DayInput = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
`;
const TimeAndButton = styled.div`
  display: flex;
  align-items: center;
`;
const Time = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  @media screen and (max-width: 540px) {
    justify-content: center;
  }
  @media screen and (max-width: 320px) {
    width: 190px;
  } ;
`;

const TimeDiv = styled.div`
  cursor: pointer;

  font-size: 14px;
  width: 100px;
  height: 36px;
  border: 1px solid ${COLOR["gray/500"]};
  padding-right: 12px;
  border-radius: 8px;
  margin-right: 8px;
  margin-left: 8px;
`;

const TimeInput = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-left: 10px;
  align-items: center;
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
const Error = styled.div`
  margin-top: 8px;
  color: ${COLOR["magenta/500"]};
`;

export default AvailableTimeInputForm;
