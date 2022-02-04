import styled from "styled-components";
import { COLOR } from "../CONSTANT";

import { MdOutlineNavigateNext } from "react-icons/md";


const LoginToRegister = () => {
  return (
    <div>
      <JoinUs>Join Us !</JoinUs>

      <TextAndbuttonProvider>
        

        <Text style={{ color: COLOR["magenta/300"] }}>As Provider</Text>
        <ProviderButton>
          <LinkText href="/register/provider">Register </LinkText>
          <MdOutlineNavigateNext/>
        </ProviderButton>
        <RightTriangle></RightTriangle>
      </TextAndbuttonProvider>

      <TextAndbuttonCustomer>
        <Text style={{ color: COLOR["blue/200"] }}>As Customer</Text>
        <CustomerButton>
          <LinkText href="/register/customer">Register</LinkText>
          <MdOutlineNavigateNext/>
        </CustomerButton>
        <LeftTriangle></LeftTriangle>
      </TextAndbuttonCustomer>
    </div>
  );
};

const LinkText = styled.a`
  text-decoration: none;
  color: #ffffff;
`;

const JoinUs = styled.p`
  margin: 0px;
  font-family: Baloo 2;
  font-weight: bold;
  color: #ffffff;
  font-size: 48px;
  position: absolute;
  left: 931px;
  top: 240px;
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
  position: absolute;
  left: 931px;
  top: 310px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
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
  position: absolute;
  left: 1233px;
  top: 310px;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Text = styled.p`
  margin: 0px;
  font-family: Baloo 2;
  font-weight: bold;
  font-size: 28px;
`;
const ProviderButton = styled.a`
  border: none;
  margin: 0px;
  font-family: Baloo 2;
  font-size: 20px;
  color: #ffffff;
  background: ${COLOR["violet/400"]};
  height: 40px;
  width: 133px;
  text-align: center;
  border-radius: 10000px;
  text-align: center;
  text-decoration: none;
  text-justify: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;

  &:hover {
    background-color: ${COLOR["magenta/100"]};
  }
`;
const CustomerButton = styled.div`
  border: none;
  margin: 0px;
  font-family: Baloo 2;
  font-size: 20px;
  color: white;

  column-gap: 5px;
  background: ${COLOR["violet/400"]};
  height: 40px;
  width: 133px;
  text-align: center;
  border-radius: 10000px;
  text-align: center;
  text-decoration: none;
  text-justify: center;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR["blue/200"]};
  }
`;
const RightTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 37.5px solid white;
  border-left: 37.5px solid transparent;
  position: absolute;
  left: 50px;
  top: 173px;
  `;
const LeftTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 37.5px solid white;
  border-right: 37.5px solid transparent;
  position: absolute;
  left: 150px;
  top: 173px;
`;

export default LoginToRegister;
