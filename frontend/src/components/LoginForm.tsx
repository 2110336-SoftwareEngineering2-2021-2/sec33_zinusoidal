import React from "react";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";

const LoginForm: React.FC = () => {
  return (
    <LoginFormLayout>
      <LoginFormHeader1>Fortune 168</LoginFormHeader1>
      <LoginFormHeader2>Login</LoginFormHeader2>
      <InputDiv>
        <ErrorText>Invalid Username or Password</ErrorText>
        <FormLabel>Username</FormLabel>
        <Forminput type="text" id="fname" name="fname" />
      </InputDiv>
      <InputDiv>
        <FormLabel>Password</FormLabel>
        <Forminput type="password" id="fname" name="fname" />
      </InputDiv>

      <RememberAndForgetDiv>
        <RememberDiv>
          <CheckboxStyle type="checkbox" id="" name="" value="" />
          <p>Remember me</p>
        </RememberDiv>
        <Forget href="">Forget password?</Forget>
      </RememberAndForgetDiv>

      <LoginButton>Login</LoginButton>
    </LoginFormLayout>
  );
};
const LoginFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  background: #ffffff;
  padding: 50px;
  row-gap: 30px;
  border-radius: 20px;
  position: absolute;
  left: 202px;
  top: 210px;
  font-family: Baloo 2;
  font-weight: bold;
`;

const ErrorText = styled.div`
  color: ${COLOR["magenta/500"]};
  display: none;
`;

const InputDiv = styled.div`
  margin: 0px;
  width: 100%;
`;

const LoginFormHeader1 = styled.p`
  margin: 0px;
  font-size: 64px;
  color: ${COLOR["violet/800"]};
`;
const LoginFormHeader2 = styled.p`
  margin: 0px;
  width: 100%;
  font-size: 36px;
`;

const FormLabel = styled.p`
  margin: 0px;
  font-size: 16px;
`;
const Forminput = styled.input`
  padding-left:5px;
  font-size: 16px;
  font-family: Baloo 2;
  font-weight: bold;
  width: 100%;
  height: 32px;
  border-radius: 8px;
  border:solid #808080 1px;

  &:focus {
    outline:solid ${COLOR["violet/400"]} 1px;
    border:solid ${COLOR["violet/400"]} 1px;
  }
`;

const RememberAndForgetDiv = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;
`;
const RememberDiv = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
  text-align: center;
`;

const CheckboxStyle = styled.input`
  width: 24px;
  height: 24px;
`;

const Forget = styled.a`
  text-decoration: none;
  color: ${COLOR["magenta/300"]};
`;

const LoginButton = styled.button`
  border: none;
  width: 100%;
  padding: 13.5px 0px 13.5px 0px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-weight: bold;
  font-size: 24px;
`;

export default LoginForm;
