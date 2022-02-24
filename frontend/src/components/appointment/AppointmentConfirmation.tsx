import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import styled from "styled-components";
import {
  BsFillBookmarkFill,
  BsCalendarCheck,
  BsChevronDown,
  BsCheck2,
} from "react-icons/bs";
import { AiOutlineProfile, AiFillMinusCircle } from "react-icons/ai";

import { COLOR } from "../../CONSTANT";
import { dividerClasses } from "@mui/material";
const MonthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AppointmentConfirmation = ({
  current,
  setCurrent,
  infoList,
  appointmentList,
  totalPrice,
  userInfo,
}: any) => {
  const [choice, setChoice] = useState(true);
  return (
    <Layout>
      <Padding>
        <HeaderDiv>
          <BsFillBookmarkFill
            color={COLOR["violet/400"]}
            size={24}
            style={{ marginRight: 5 }}
          />
          Appointment Confirmation
        </HeaderDiv>
        <ContentDiv>
          <ContentHeader>
            <ChoiceButton
              onClick={() => {
                setChoice(true);
              }}
              style={{
                borderRadius: "20px 0px 0px 0px",
                width: choice ? "100%" : "fit-content",
                backgroundColor: COLOR["violet/400"],
              }}
            >
              Appointment
            </ChoiceButton>
            <ChoiceButton
              onClick={() => {
                setChoice(false);
              }}
              style={{
                borderRadius: "0px 20px 0px 0px",
                width: !choice ? "100%" : "fit-content",
                justifyContent: "flex-end",
                backgroundColor: COLOR["violet/200"],
              }}
            >
              Information
            </ChoiceButton>
          </ContentHeader>
          <ContentContent>
            {choice ? (
              <Appointments>
                {appointmentList.map((i: any) => (
                  <AppointmentResult>
                    <ResultLine>
                      <ResultItem>
                        <ResultItem>
                          Service : <Normal>{i.Topic}</Normal>
                        </ResultItem>
                        <ResultItem>
                          Provider :{" "}
                          <Normal>
                            {userInfo.Name} {userInfo.Surname}
                          </Normal>
                        </ResultItem>
                      </ResultItem>
                      <ResultItem>
                        Date :{" "}
                        <Normal>
                          {i.Day.date} {MonthName[i.Day.month]} {i.Day.year}
                        </Normal>
                      </ResultItem>
                      <ResultItem>
                        Time :{" "}
                        <Normal>
                          {i.Time[0]} - {i.Time[1]}
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
                        Price : <Normal>{i.Price} baht</Normal>
                      </ResultItem>
                    </ResultLine>
                  </AppointmentResult>
                ))}
              </Appointments>
            ) : (
              <Scroll>
                {infoList.map((i: any) => (
                  <ShowDiv>
                    <NameAndValue>
                      <p>{i.Name} </p> : <Value> {i.Value}</Value>
                    </NameAndValue>
                  </ShowDiv>
                ))}
              </Scroll>
            )}
          </ContentContent>
        </ContentDiv>
        <div style={{ fontSize: 20, display: "flex", columnGap: "4px" }}>
          Total Price : <Normal>{totalPrice} baht</Normal>
        </div>
        <ButtonDiv>
          <PrevButton
            onClick={() => {
              setCurrent(1);
            }}
            style={{ visibility: current == 0 ? "hidden" : "visible" }}
          >
            <MdOutlineNavigateBefore />
            Back
          </PrevButton>

          <NextButton
            onClick={() => {
              setCurrent(3);
            }}
          >
            Confirm
            <BsCheck2 size={20} />
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
  /* padding: 30px; */

  font-weight: bold;
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 44px;
  border-radius: 20px 20px 0px 0px;
  align-items: center;
`;
const ContentContent = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  padding: 20px;
`;
const ChoiceButton = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 16px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NextButton = styled.div`
  width: 120px;
  height: 40px;
  background-color: ${COLOR["green/400"]};
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
  column-gap: 4px;
  :hover {
    cursor: pointer;
    background-color: ${COLOR["green/500"]} !important;
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
const ShowDiv = styled.div`
  margin-top: 4px;

  margin-bottom: 4px;
  display: flex;
`;
const NameAndValue = styled.div`
  display: flex;
  column-gap: 4px;
`;
const Value = styled.p`
  font-weight: normal;
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
  height: 360px;
  overflow-y: auto;
`;
const ShowInfo = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  display: flex;
  padding: 15px;
`;
const Scroll = styled.div`
  padding: 15px;
  width: 100%;
  height: 360px;
  overflow-y: auto;
`;
export default AppointmentConfirmation;
