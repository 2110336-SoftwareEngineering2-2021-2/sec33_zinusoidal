import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { NavLink, Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";

const LoginToRegister = () => {
  return (
    <Layout>
      <JoinUs>Join Us !</JoinUs>
      <CustomerAndProvider>
        <Provider>
          <TextAndbuttonProvider>
            <Text style={{ color: COLOR["magenta/300"] }}>As Provider</Text>
            <Link to="/register/provider" style={{ textDecoration: "none" }}>
              <ProviderButton>
                Register
                <MdOutlineNavigateNext />
              </ProviderButton>
            </Link>
          </TextAndbuttonProvider>
          <RightTriangle></RightTriangle>
        </Provider>
        <Customer>
          <TextAndbuttonCustomer>
            <Text style={{ color: COLOR["blue/200"] }}>As Customer</Text>
            <Link to="/register/customer" style={{ textDecoration: "none" }}>
              <CustomerButton>
                Register
                <MdOutlineNavigateNext />
              </CustomerButton>
            </Link>
          </TextAndbuttonCustomer>
          <LeftTriangle></LeftTriangle>
        </Customer>
      </CustomerAndProvider>
    </Layout>
  );
};

const Layout = styled.div`
  margin-top: auto;
  @media screen and (max-width: 1100px) {
    margin-top: 0;
  } ;
`;

const JoinUs = styled.p`
  margin: 0px;
  font-weight: bold;
  color: #ffffff;
  font-size: 48px;
  @media screen and (max-width: 750px) {
    text-align: center;
  } ;
`;
const CustomerAndProvider = styled.div`
  display: flex;
  width: 573px;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    width: fit-content;
  } ;
`;
const TextAndbuttonProvider = styled.div`
  margin: 0px;
  background: #ffffff;
  width: 260px;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  row-gap: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
`;

const Provider = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1100px) {
    margin-bottom: 32px;
  } ;
`;
const Customer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextAndbuttonCustomer = styled.div`
  margin: 0px;
  background: #ffffff;
  width: 260px;
  height: 173px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  row-gap: 20px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
`;
const Text = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 28px;
`;
const ProviderButton = styled.div`
  font-size: 20px;
  color: #ffffff;
  background: ${COLOR["violet/400"]};
  height: 40px;
  width: 133px;
  text-align: center;
  border-radius: 10000px;
  text-align: center;
  text-justify: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;

  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;
const CustomerButton = styled.div`
  font-size: 20px;
  color: white;
  column-gap: 5px;
  background: ${COLOR["violet/400"]};
  height: 40px;
  width: 133px;
  text-align: center;
  border-radius: 10000px;
  text-align: center;
  text-justify: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR["violet/500"]};
  }
`;
const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 40px solid white;
  border-left: 40px solid transparent;
  margin-left: 20%;
  margin-top: auto;
  @media screen and (max-width: 1100px) {
    border-left: 0 solid transparent;
    border-right: 40px solid transparent;
    margin-left: 65%;
  } ;
`;
const LeftTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 40px solid white;
  border-right: 40px solid transparent;
  margin-left: 65%;
`;

export default LoginToRegister;
