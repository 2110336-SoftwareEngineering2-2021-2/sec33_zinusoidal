import LoginForm from "../components/login/LoginForm";
import { COLOR } from "../CONSTANT";
import styled from "styled-components";
import LoginToRegister from "../components/login/LoginToRegister";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const logo = require("../assets/login.png");

const LoginPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const data = cookies.get("user");
    if (typeof data != "undefined") {
      alert("You are already logged in");
      navigate("/", { replace: true });
    }
  }, []);
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
  min-height: max(100vh, 1024px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  } ;
`;
const ButtonAndImg = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1100px) {
    justify-content: center;
  } ;
`;
const LoginImg = styled.img`
  margin: 0px;
  padding: 0px;
  width: 441.5px;
  height: 470px;
  @media screen and (max-width: 1100px) {
    display: none;
  } ;
`;

export default LoginPage;
