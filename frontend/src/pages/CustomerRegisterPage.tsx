import styled from "styled-components";
import CustomerRegister from "../components/customer_register/CustomerRegister";
import CustomerAds from "../components/customer_register/CustomerAds";

import { COLOR } from "../CONSTANT";
const CustomerRegisterPage = () => {
  return (
    <Layout>
      <CustomerRegister />
      <CustomerAds />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["blue/100"]};
  min-height: max(100vh,1024px);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
  } ;
`;

export default CustomerRegisterPage;
