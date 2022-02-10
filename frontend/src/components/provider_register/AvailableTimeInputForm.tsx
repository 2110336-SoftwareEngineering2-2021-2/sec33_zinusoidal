import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { AiOutlineDown } from "react-icons/ai";
import DayDropDown from "./DayDropDown";
import StartTimeDropDown from "./StartTimeDropDown";
import StopTimeDropDown from "./StopTimeDropDown";

type InputPropType = {
  time?: boolean;
};
const AvailableTimeInputForm = ({ userData, changeUserData }: any) => {
  const [dayDropDownOpen, setDayDropDownOpen] = useState(false);
  const [startTimeDropDownOpen, setStartTimeDropDownOpen] = useState(false);
  const [stopTimeDropDownOpen, setStopTimeDropDownOpen] = useState(false);

  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("-1.0");
  const [stopTime, setStopTime] = useState("24.0");

  const wrapperRef = useRef(null);
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

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
        onClick={() => {
          setDay("");
          setStartTime("-1.0");
          setStopTime("24.0");
          changeUserData({
            ...userData,
            AvailableTime: { day: day, timeList: [startTime, stopTime] },
          });
          console.log(userData);
        }}
      >
        Add
      </Button>
    </Layout>
  );
};

const Layout = styled("div")`
  width: 100%;
  display: flex;
  height: 38px;
  margin-top: 15px;
  align-items: center;
`;

const DayDiv = styled.div`
  height: 40px;
  width: 150px;
  border: 1px solid ${COLOR["gray/500"]};
  padding-right: 12px;
  border-radius: 8px;
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

const Time = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const TimeDiv = styled.div`
  height: 36px;
  width: 120px;
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
  width: 54px;
  height: 28px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;

  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: white;

  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]};
  }
`;

export default AvailableTimeInputForm;
