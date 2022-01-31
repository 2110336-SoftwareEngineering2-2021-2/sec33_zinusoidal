import LoginForm from "../components/LoginForm";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";
import LoginToRegister from "../components/LoginToRegister";

const logo = require("../assets/login.png");

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
      <LoginToRegister />
      <LoingImg src={logo} alt="" />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["violet/100"]};
  height: 100vh;
`;
const LoingImg = styled.img`
  width: 441px;
  height: 493px;
  position: absolute;
  left: 843px;
  top: 493px;
`;

export default LoginPage;
