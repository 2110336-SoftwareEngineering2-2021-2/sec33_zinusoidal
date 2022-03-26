import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import styled from "styled-components";
import { AiOutlineProfile, AiFillMinusCircle } from "react-icons/ai";

import { COLOR } from "../../CONSTANT";

const AppointmentOtheInfo = ({
  current,
  setCurrent,
  infoList,
  setInfoList,
  setOpenOneAppointmentError,
}: any) => {
  const [infoName, setInfoName] = useState("");
  const [infoValue, setInfoValue] = useState("");
  const [openDuplicateInfoError, setOpenDuplicateInfoError] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    (messagesEndRef as any).current?.scrollIntoView({ behavior: "instant" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [infoList]);
  const addInfo = (newInfo: any) => {
    console.log(newInfo);
    for (var s of infoList) {
      if (s.Name == newInfo.Name) {
        setOpenDuplicateInfoError(true);
        setInfoName("");
        setInfoValue("");
        return;
      }
    }
    setInfoList([...infoList, newInfo]);
    setInfoName("");
    setInfoValue("");
  };
  const deleteInfo = (deleteInfo: any) => {
    setInfoList(
      infoList.filter(
        (info: any) =>
          info.Name != deleteInfo.Name || info.Value != deleteInfo.Value
      )
    );
  };

  return (
    <Layout>
      <Padding>
        <HeaderDiv>
          <AiOutlineProfile
            color={COLOR["violet/400"]}
            size={24}
            style={{ marginRight: 5 }}
          />
          Additional Information
        </HeaderDiv>
        <ButtonAndInput>
          <Input>
            <InputDiv>
              Information
              <Forminput
                type="text"
                value={infoName}
                onChange={(e) => {
                  setInfoName(e.target.value);
                  setOpenOneAppointmentError(false);
                  setOpenDuplicateInfoError(false);
                }}
              />
            </InputDiv>
            <InputDiv>
              Value
              <Forminput
                type="text"
                value={infoValue}
                onChange={(e) => {
                  setInfoValue(e.target.value);
                  setOpenOneAppointmentError(false);
                  setOpenDuplicateInfoError(false);
                }}
              />
            </InputDiv>
          </Input>
          <Button
            style={{
              backgroundColor:
                infoName == "" || infoValue == ""
                  ? COLOR["gray/400"]
                  : COLOR["violet/400"],
              pointerEvents:
                infoName == "" || infoValue == "" ? "none" : "unset",
            }}
            onClick={() => {
              setOpenOneAppointmentError(false);
              setOpenDuplicateInfoError(false);
              addInfo({
                Name: infoName,
                Value: infoValue,
              });
            }}
          >
            Add
          </Button>
        </ButtonAndInput>
        {openDuplicateInfoError ? (
          <Error>You can't have duplicate information</Error>
        ) : null}
        <ShowInfo>
          <Scroll>
            {infoList.map((i: any, index: number) => (
              <ShowDiv key={index}>
                <NameAndValue ref={messagesEndRef}>
                  <div>{i.Name} :</div>
                  <div style={{ fontWeight: "normal" }}> {i.Value}</div>
                </NameAndValue>
                <AiFillMinusCircle
                  color={"#f44336"}
                  size={24}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    deleteInfo(i);
                  }}
                />
              </ShowDiv>
            ))}
          </Scroll>
        </ShowInfo>
        <ButtonDiv>
          {current == 0 ? null : (
            <PrevButton
              onClick={() => {
                setOpenOneAppointmentError(false);
                setOpenDuplicateInfoError(false);
                setCurrent(0);
              }}
              style={{ visibility: current == 0 ? "hidden" : "visible" }}
            >
              <MdOutlineNavigateBefore />
              Back
            </PrevButton>
          )}

          <NextButton
            onClick={() => {
              setOpenOneAppointmentError(false);
              setOpenDuplicateInfoError(false);
              setCurrent(2);
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
  /* padding: 30px; */

  font-weight: bold;
  @media screen and (max-width: 540px) {
    width: 300px;
  } ;
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
const ButtonAndInput = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    row-gap: 8px;
  }
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
const InputDiv = styled.div`
  font-weight: bold;
  width: 50%;
  @media screen and (max-width: 540px) {
    width: 100%;
  }
`;

const Input = styled.div`
  margin-right: 16px;
  display: flex;
  column-gap: 15px;
  @media screen and (max-width: 540px) {
    flex-direction: column;
    width: 100%;
    margin-right: 0px;
  }
`;

const Forminput = styled.input`
  width: 100%;
  height: 38px;
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: solid #808080 1px;
  &:focus {
    outline: none;
    border: solid ${COLOR["blue/300"]} 1px;
  }
`;
const ShowInfo = styled.div`
  width: 100%;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  display: flex;
  padding: 15px;
  flex: 1;
  padding: 5px;
  background-color: ${COLOR["gray/100"]};
  @media screen and (max-width: 540px) {
    height: 200px;
  }
`;
const Scroll = styled.div`
  padding: 15px;
  height: 400px;
  overflow-y: auto;
  width: 100%;
  @media screen and (max-width: 540px) {
    height: 100%;
  }
`;
const Button = styled.button`
  width: 80px;
  height: 38px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  border: none;
  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: white;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]} !important;
  }
  @media screen and (max-width: 540px) {
    width: 100%;
  }

  align-self: center;
`;
const ShowDiv = styled.div`
  margin-top: 4px;
  width: 100%;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 540px) {
    margin-bottom: 8px;
  }
`;
const NameAndValue = styled.div`
  overflow-wrap: break-word;
  display: flex;
  column-gap: 4px;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`;

const Error = styled.p`
  width: 100%;
  font-size: 16px;
  margin-left: 16px;
  font-weight: bold;
  color: ${COLOR["magenta/400"]};
`;
export default AppointmentOtheInfo;
