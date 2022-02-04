import styled from "styled-components";
import CustomerRegister from "../components/CustomerRegister";


import { COLOR } from "../CONSTANT";
const Register = () => {
  return (
    <Layout>
      <CustomerRegister/>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["blue/100"]};
  height: 100vh;

`;

export default Register;
