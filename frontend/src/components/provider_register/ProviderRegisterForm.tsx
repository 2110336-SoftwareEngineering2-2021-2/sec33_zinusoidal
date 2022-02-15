import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import React, { useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import zIndex from "@mui/material/styles/zIndex";
const ProviderRegistrationForm = ({ userData, changeUserData }: any) => {
  const [seePassword, setSeePassword] = useState(false);
  const [seeCPassword, setSeeCPassword] = useState(false);

  return (
    <Layout>
      <Padding>
        <ProviderRegistration>
          <MdRemoveRedEye color={COLOR["violet/400"]} />
          Provider Registration
        </ProviderRegistration>
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
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, Email: event.target.value });
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
            <Forminput
              type="text"
              onChange={(event) => {
                changeUserData({ ...userData, Username: event.target.value });
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
                <PasswordDiv>
                  <Forminput
                    type="text"
                    onChange={(event) => {
                      changeUserData({
                        ...userData,
                        ConfirmPassword: event.target.value,
                      });
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
              ) : (
                <PasswordDiv>
                  <Forminput
                    type="password"
                    onChange={(event) => {
                      changeUserData({
                        ...userData,
                        ConfirmPassword: event.target.value,
                      });
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
              )}
            </InputDiv>
          </DoubleInput>
          <BioDiv>
            <div>
              <FormLabel>Biography</FormLabel>
              <Star>*</Star>
            </div>
            <Biotext
              onChange={(event) => {
                changeUserData({
                  ...userData,
                  Biography: event.target.value,
                });
              }}
              style={{ height: 140 }}
            />
          </BioDiv>
        </Flex>
      </Padding>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  font-weight: bold;
  background-color: white;
  overflow-y: scroll;
  p {
    margin-left: initial;
  }
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
const ProviderRegistration = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
  font-size: 20px;
`;

const Star = styled.p`
  display: inline;
  color: ${COLOR["magenta/400"]};
`;

const InputDiv = styled.div`
  width: 100%;
`;

const DoubleInput = styled.div`
  display: flex;
  column-gap: 15px;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`;

const FormLabel = styled.p`
  display: inline;
  margin: 0px;
  font-size: 16px;
`;
const Forminput = styled.input`
  padding-left: 5px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border: solid #808080 1px;

  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
`;

const BioDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  @media screen and (max-width: 1300px) {
    height: 134px;
  }
`;

const Biotext = styled.textarea`
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
`;

const PasswordDiv = styled.div`
  display: flex;
  align-items: center;
  border: solid #808080 1px;
  border-radius: 8px;
  :focus-within {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
  input {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
export default ProviderRegistrationForm;
