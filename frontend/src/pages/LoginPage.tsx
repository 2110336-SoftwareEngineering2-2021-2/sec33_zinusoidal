import LoginForm from "../components/LoginForm";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";
import LoginToRegister from "../components/LoginToRegister";

const logo = require("../assets/login.png");

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
      <ButtonAndImg>
        <LoginToRegister />
        <LoginImg src={logo} alt="" />
      </ButtonAndImg>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["violet/100"]};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonAndImg = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const LoginImg = styled.img`
  margin: 0px;
  padding: 0px;
  width: 441.5px;
  height: 470px;
`;

export default LoginPage;
