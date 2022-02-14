import styled from "styled-components";
import ProviderRegister from "../components/provider_register/ProviderRegister";
import ProviderAds from "../components/provider_register/ProviderAds";

import { COLOR } from "../CONSTANT";
const ProviderRegisterPage = () => {
  return (
    <Layout>
      <ProviderRegister />
      <ProviderAds />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["magenta/100"]};
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
  } ;
`;

export default ProviderRegisterPage;
