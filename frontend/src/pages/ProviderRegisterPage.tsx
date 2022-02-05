import styled from "styled-components";
import ProviderRegistrationForm from "../components/ProviderRegisterForm";
import ProviderTermAndCondition from "../components/ProviderTermAndCondition";
import { COLOR } from "../CONSTANT";
const Register = () => {
  return (
    <Layout>
      <ProviderTermAndCondition />
      <ProviderRegistrationForm />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["magenta/100"]};
  height: 100vh;

`;

export default Register;