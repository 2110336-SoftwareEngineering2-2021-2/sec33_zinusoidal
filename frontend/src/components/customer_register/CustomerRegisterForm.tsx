import styled from "styled-components";
import React, { useState } from "react";

import { COLOR } from "../../CONSTANT";
import { BsPeopleFill } from "react-icons/bs";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import zIndex from "@mui/material/styles/zIndex";

const CustomerRegistrationForm = ({
  userData,
  changeUserData,
  samePassword,
  setSamePassword,
  openPasswordError,
  setOpenPasswordError,
  usernameError,
  setUsernameError,
  emailError,
  setEmailError,
}: any) => {
  const [seePassword, setSeePassword] = useState(false);
  const [seeCPassword, setSeeCPassword] = useState(false);
  console.log("child", openPasswordError);
  return (
    <Layout>
      <Padding>
        <CustomerRegistration>
          <BsPeopleFill color="#a44cd7" />
          Customer Registration
        </CustomerRegistration>
        <Flex>
          <DoubleInput>
            <InputDiv>
              <FormLabel>Name</FormLabel>
              <Star>*</Star>
              <Forminput
                type="text"
                onChange={(event) => {
                  changeUserData({ ...userData, Name: event.target.value });
                }}
              />
            </InputDiv>
            <InputDiv>
              <FormLabel>Surname</FormLabel>
              <Star>*</Star>
              <Forminput
                type="text"
                onChange={(event) => {
                  changeUserData({ ...userData, Surname: event.target.value });
                }}
              />
            </InputDiv>
          </DoubleInput>
          <InputDiv>
            <FormLabel>Email</FormLabel>
            <Star>*</Star>
            {emailError ? (
              <Error style={{ display: "inline", marginLeft: 8 }}>
                email has already been taken
              </Error>
            ) : null}
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, Email: event.target.value });
                setEmailError(false);
              }}
            />
          </InputDiv>
          <InputDiv>
            <FormLabel>CitizenID</FormLabel>
            <Star>*</Star>
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, CitizenID: event.target.value });
              }}
            />
          </InputDiv>
          <InputDiv>
            <FormLabel>Username</FormLabel>
            <Star>*</Star>
            {usernameError ? (
              <Error style={{ display: "inline", marginLeft: 8 }}>
                username has already been taken
              </Error>
            ) : null}
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, Username: event.target.value });
                setUsernameError(false);
              }}
            />
          </InputDiv>
          <DoubleInput>
            <InputDiv>
              <FormLabel>Password</FormLabel>
              <Star>*</Star>
              {seePassword ? (
                <PasswordDiv>
                  <Forminput
                    type="text"
                    onChange={(event) => {
                      changeUserData({
                        ...userData,
                        Password: event.target.value,
                      });
                      setSamePassword(
                        event.target.value == userData.ConfirmPassword
                      );
                    }}
                  />
                  <RiEyeFill
                    size={16}
                    style={{ marginRight: 4, zIndex: 500 }}
                    onMouseUpCapture={() => {
                      setSeePassword(false);
                    }}
                  />
                </PasswordDiv>
              ) : (
                <PasswordDiv>
                  <Forminput
                    type="password"
                    onChange={(event) => {
                      changeUserData({
                        ...userData,
                        Password: event.target.value,
                      });
                      setSamePassword(
                        event.target.value == userData.ConfirmPassword
                      );
                    }}
                  />
                  <RiEyeCloseLine
                    size={16}
                    style={{ marginRight: 4, zIndex: 500 }}
                    onMouseDownCapture={() => {
                      setSeePassword(true);
                    }}
                  />
                </PasswordDiv>
              )}
            </InputDiv>
            <InputDiv>
              <FormLabel>Confirm Password</FormLabel>
              <Star>*</Star>
              {seeCPassword ? (
                <div>
                  <PasswordDiv>
                    <Forminput
                      type="text"
                      onChange={(event) => {
                        changeUserData({
                          ...userData,
                          ConfirmPassword: event.target.value,
                        });
                        setSamePassword(
                          event.target.value == userData.Password
                        );
                      }}
                    />
                    <RiEyeFill
                      size={16}
                      style={{ marginRight: 4, zIndex: 500 }}
                      onMouseUpCapture={() => {
                        setSeeCPassword(false);
                      }}
                    />
                  </PasswordDiv>
                  {openPasswordError ? (
                    <Error>password does not match</Error>
                  ) : null}
                </div>
              ) : (
                <div>
                  <PasswordDiv>
                    <Forminput
                      type="password"
                      onChange={(event) => {
                        changeUserData({
                          ...userData,
                          ConfirmPassword: event.target.value,
                        });
                        setSamePassword(
                          event.target.value == userData.Password
                        );
                      }}
                    />
                    <RiEyeCloseLine
                      size={16}
                      style={{ marginRight: 4, zIndex: 500 }}
                      onMouseDownCapture={() => {
                        setSeeCPassword(true);
                      }}
                    />
                  </PasswordDiv>
                  {openPasswordError ? (
                    <Error>password does not match</Error>
                  ) : null}
                </div>
              )}
            </InputDiv>
          </DoubleInput>
        </Flex>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  background-color: #ffffff;
  font-weight: bold;
`;
const Padding = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 15px 0px 15px;
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const CustomerRegistration = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const Star = styled.p`
  display: inline;
  color: ${COLOR["magenta/400"]};
`;
const Error = styled.p`
  align-self: flex-end;
  font-size: 16px;
  color: ${COLOR["magenta/400"]};
`;

const InputDiv = styled.div`
  width: 100%;
`;

const DoubleInput = styled.div`
  display: flex;
  column-gap: 15px;
  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`;

const FormLabel = styled.p`
  display: inline;
  font-size: 16px;
`;
const Forminput = styled.input`
  width: 100%;
  height: 32px;
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
const PasswordDiv = styled.div`
  display: flex;
  align-items: center;
  border: solid #808080 1px;
  border-radius: 8px;
  :focus-within {
    outline: none;
    border: solid ${COLOR["blue/300"]} 1px;
  }
  input {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
export default CustomerRegistrationForm;
