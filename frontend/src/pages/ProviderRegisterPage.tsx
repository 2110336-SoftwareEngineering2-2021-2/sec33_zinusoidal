import styled from "styled-components";
import ProviderRegister from "../components/provider_register/ProviderRegister";
import { COLOR } from "../CONSTANT";
const ProviderRegisterPage = () => {
  return (
    <Layout>
      <ProviderRegister />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["magenta/100"]};
  height: 100vh;
`;

export default ProviderRegisterPage;
