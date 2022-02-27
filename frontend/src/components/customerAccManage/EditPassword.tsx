import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { useNavigate } from "react-router-dom";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { FiCheckSquare } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";

import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const EditPassword = () => {
  const [success, setSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [seeOPassword, setSeeOPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [seeNPassword, setSeeNPassword] = useState(false);

  const [newCPassword, setNewCPassword] = useState("");
  const [seeNewCPassword, setSeeNewCPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [blankPasswordError, setBlankPasswordError] = useState(false);
  const [wrongOldPasswordError, setWrongOldPasswordError] = useState(false);
  const [sameOldPasswordError, setSameOldPasswordError] = useState(false);

  let navigate = useNavigate();
  const updatePassword = () => {
    const user = cookies.get("user");
    axios({
      method: "patch",
      url: "https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/password_edit",
      data: {
        newPassword: newPassword,
        oldPassword: oldPassword,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        console.log("complete");
        setOldPassword("");
        setNewPassword("");
        setNewCPassword("");
        setSuccess(true);
      })
      .catch(function (error) {
        console.log(error.response.data.log);
        if (error.response.data.log.includes("Wrong Password")) {
          setWrongOldPasswordError(true);
        }
        if (error.response.data.log.includes("same")) {
          setSameOldPasswordError(true);
        }
      });
  };
  return (
    <Layout>
      <Header>
        <Circle>
          <InnerCircle></InnerCircle>
        </Circle>
      </Header>
      {success ? (
        <Padding>
          <ContentDiv>
            <BsCheck2Circle size={96} color={COLOR["green/400"]} />
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              Password Updated!
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: "normal",
                textAlign: "center",
              }}
            >
              Your Password has been change successfully.{" "}
            </p>
            <GreenButton
              onClick={() => {
                navigate("/");
              }}
            >
              Done
              <BsCheck2Circle />
            </GreenButton>
          </ContentDiv>
        </Padding>
      ) : (
        <div>
          <Padding>
            <ContentDiv>
              <div style={{ fontSize: 20 }}>Password Change</div>
              <PDiv>
                <InputDiv>
                  <div>
                    <FormLabel>Old Password </FormLabel>
                    <Star>*</Star>
                  </div>
                  {seeOPassword ? (
                    <PasswordDiv>
                      <Forminput
                        value={oldPassword}
                        type="text"
                        onChange={(event) => {
                          setOldPassword(event.target.value);
                        }}
                      />
                      <RiEyeFill
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseUpCapture={() => {
                          setSeeOPassword(false);
                        }}
                      />
                    </PasswordDiv>
                  ) : (
                    <PasswordDiv>
                      <Forminput
                        value={oldPassword}
                        type="password"
                        onChange={(event) => {
                          setOldPassword(event.target.value);
                        }}
                      />
                      <RiEyeCloseLine
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseDownCapture={() => {
                          setSeeOPassword(true);
                        }}
                      />
                    </PasswordDiv>
                  )}
                </InputDiv>{" "}
                <InputDiv>
                  <div>
                    <FormLabel>New Password </FormLabel>
                    <Star>*</Star>
                  </div>
                  {seeNPassword ? (
                    <PasswordDiv>
                      <Forminput
                        value={newPassword}
                        type="text"
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                          setPasswordError(false);
                          setBlankPasswordError(false);
                        }}
                      />
                      <RiEyeFill
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseUpCapture={() => {
                          setSeeNPassword(false);
                        }}
                      />
                    </PasswordDiv>
                  ) : (
                    <PasswordDiv>
                      <Forminput
                        value={newPassword}
                        type="password"
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                          setPasswordError(false);
                          setBlankPasswordError(false);
                        }}
                      />
                      <RiEyeCloseLine
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseDownCapture={() => {
                          setSeeNPassword(true);
                        }}
                      />
                    </PasswordDiv>
                  )}
                </InputDiv>{" "}
                <InputDiv>
                  <div>
                    <FormLabel>Confirm Password </FormLabel>
                    <Star>*</Star>
                  </div>
                  {seeNewCPassword ? (
                    <PasswordDiv>
                      <Forminput
                        value={newCPassword}
                        type="text"
                        onChange={(event) => {
                          setNewCPassword(event.target.value);
                          setPasswordError(false);
                          setBlankPasswordError(false);
                        }}
                      />
                      <RiEyeFill
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseUpCapture={() => {
                          setSeeNewCPassword(false);
                        }}
                      />
                    </PasswordDiv>
                  ) : (
                    <PasswordDiv>
                      <Forminput
                        value={newCPassword}
                        type="password"
                        onChange={(event) => {
                          setNewCPassword(event.target.value);
                          setPasswordError(false);
                          setBlankPasswordError(false);
                        }}
                      />
                      <RiEyeCloseLine
                        size={16}
                        style={{ marginRight: 4, zIndex: 500 }}
                        onMouseDownCapture={() => {
                          setSeeNewCPassword(true);
                        }}
                      />
                    </PasswordDiv>
                  )}
                </InputDiv>{" "}
                {passwordError ? (
                  <Error>New password doesn't match!</Error>
                ) : null}
                {blankPasswordError ? (
                  <Error>Password can't be blank!</Error>
                ) : null}
                {sameOldPasswordError ? (
                  <Error>
                    New password cannot be the same as old password!
                  </Error>
                ) : null}
                {wrongOldPasswordError ? (
                  <Error>Old password is wrong!</Error>
                ) : null}
              </PDiv>
              <Button
                onClick={() => {
                  setWrongOldPasswordError(false);
                  setSameOldPasswordError(false);

                  if (newPassword == "" || newCPassword == "") {
                    setBlankPasswordError(true);
                  } else if (newPassword != newCPassword) {
                    setPasswordError(true);
                  } else {
                    updatePassword();
                  }
                }}
              >
                Change <FiCheckSquare />
              </Button>
            </ContentDiv>
          </Padding>
        </div>
      )}
    </Layout>
  );
};
const Layout = styled.div`
  width: 500px;
  font-weight: bold;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
  @media screen and (max-width: 500px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 300px;
  } ;
`;
const Padding = styled.div`
  height: 100%;
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const PDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 15px;
`;
const InputDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  column-gap: 10px;
  align-items: center;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;
  } ;
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
  height: 32px;
  border-radius: 8px;
  border: solid #808080 1px;

  &:focus {
    outline: none;
    border: solid ${COLOR["magenta/200"]} 1px;
  }
`;
const Star = styled.p`
  display: inline;
  color: ${COLOR["magenta/400"]};
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
const Error = styled.p`
  color: ${COLOR["magenta/500"]};
  align-self: center;
  text-align: center;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  width: 100px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  :hover {
    background-color: ${COLOR["violet/500"]} !important ;
  }
`;
const GreenButton = styled.button`
  cursor: pointer;
  border: none;
  width: 100px;
  height: 40px;
  background-color: ${COLOR["green/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  :hover {
    background-color: ${COLOR["green/500"]} !important ;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 95px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
  display: flex;
  justify-content: center;
`;
const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  margin-top: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["blue/100"]};
  border-radius: 10000px;
`;
export default EditPassword;
