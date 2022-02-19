import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineArrowBack } from "react-icons/md";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { FiCheckSquare } from "react-icons/fi";

const EditPassword = ({ setCurrent }: any) => {
  const [getPassword, setGetPassword] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [seeOPassword, setSeeOPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [seeNPassword, setSeeNPassword] = useState(false);

  const [newCPassword, setNewCPassword] = useState("");
  const [seeNewCPassword, setSeeNewCPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [blankPasswordError, setBlankPasswordError] = useState(false);

  const getOldPassword = () => {
    console.log("WAIT FOR FCKING API");
  };
  useEffect(() => {
    getOldPassword();
  }, []);
  const updatePassword = () => {
    console.log("WAIT FOR FCKING API");
  };
  return (
    <Layout>
      <Padding>
        <BackDiv
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOldPassword("");
            setNewPassword("");
            setNewCPassword("");
            setCurrent(0);
          }}
        >
          <MdOutlineArrowBack />
          back
        </BackDiv>
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
                <PasswordDiv
                  style={{
                    backgroundColor:
                      oldPassword == getPassword ? "white" : COLOR["gray/400"],
                  }}
                >
                  <Forminput
                    style={{
                      backgroundColor:
                        oldPassword == getPassword
                          ? "white"
                          : COLOR["gray/400"],
                    }}
                    value={newPassword}
                    disabled={oldPassword == getPassword ? false : true}
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
                <PasswordDiv
                  style={{
                    backgroundColor:
                      oldPassword == getPassword ? "white" : COLOR["gray/400"],
                  }}
                >
                  <Forminput
                    style={{
                      backgroundColor:
                        oldPassword == getPassword
                          ? "white"
                          : COLOR["gray/400"],
                    }}
                    value={newPassword}
                    disabled={oldPassword == getPassword ? false : true}
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
                <PasswordDiv
                  style={{
                    backgroundColor:
                      oldPassword == getPassword ? "white" : COLOR["gray/400"],
                  }}
                >
                  <Forminput
                    value={newCPassword}
                    style={{
                      backgroundColor:
                        oldPassword == getPassword
                          ? "white"
                          : COLOR["gray/400"],
                    }}
                    disabled={oldPassword == getPassword ? false : true}
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
                <PasswordDiv
                  style={{
                    backgroundColor:
                      oldPassword == getPassword ? "white" : COLOR["gray/400"],
                  }}
                >
                  <Forminput
                    value={newCPassword}
                    style={{
                      backgroundColor:
                        oldPassword == getPassword
                          ? "white"
                          : COLOR["gray/400"],
                    }}
                    disabled={oldPassword == getPassword ? false : true}
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
            {passwordError ? <Error>New password doesn't match!</Error> : null}
            {blankPasswordError ? (
              <Error>Password can't be blank!</Error>
            ) : null}
          </PDiv>
          <Button
            onClick={() => {
              if (newPassword == "" || newCPassword == "") {
                setBlankPasswordError(true);
              } else if (newPassword != newCPassword) {
                setPasswordError(true);
              } else {
                setOldPassword("");
                setNewPassword("");
                setNewCPassword("");
                updatePassword();
                setCurrent(4);
              }
            }}
          >
            Change <FiCheckSquare />
          </Button>
        </ContentDiv>
      </Padding>
    </Layout>
  );
};
const Layout = styled.div`
  width: 100%;
  min-height: 600px;
  font-weight: bold;
  background-color: white;
  border-radius: 0 0 20px 20px;
  overflow-y: scroll;
`;
const Padding = styled.div`
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BackDiv = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const ContentDiv = styled.div`
  height: 100%;
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

export default EditPassword;
