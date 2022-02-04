import  { useState } from "react";

import styled from "styled-components";
import { COLOR, TERMS } from "../CONSTANT";
import CustomerRegisterContainer from "../containers/CustomerRegisterContainer";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

const CustomerRegister = () => {
  const [current, setCurrent] = useState(0);

  return (
    <Layout>
      <Header>
        <Circle><InnerCircle></InnerCircle></Circle>
      </Header>
      <Form>
        <CustomerRegisterContainer current={current}/>
      </Form>
      <ButtonDiv>
          <Button 
            onClick={() => {
              setCurrent(Math.max(0, current - 1));
            }}
            style={{ visibility: current == 0 ? "hidden" : "visible" }}
          ><MdOutlineNavigateBefore/>Back</Button>
          <Button
            onClick={() => {
              setCurrent(Math.min(2, current + 1));
            }}
          >Next <MdOutlineNavigateNext/></Button>
      </ButtonDiv>
    </Layout>
  );
};
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 535px;
  position: absolute;
  left: 131px;
  top: 164px;
  font-family: Baloo 2;
`;

const Header = styled.div`
  width: 100%;
  height: 95px;

  border-radius: 20px 20px 0px 0px;
  background-color: ${COLOR["violet/400"]};
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  position: relative;
  left: 232.5px;
  top: -30px;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["blue/100"]};
  border-radius: 10000px;
  position: relative;
  left: 23px;
  top: 23px;
`;

const Form = styled.div`
  width:100%;
`;

const ButtonDiv = styled.div`
background-color: #ffffff;
  justify-content: space-between;
  padding: 15px 15px 15px 15px;
  width: 100%;
  display: flex;
  border-radius: 0px 0px 20px 20px;
`;

const Button = styled.div`
  align-self: center;
  cursor: pointer;

  border: none;
  width: 86px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: #ffffff;
  border-radius: 10000px;
  font-family: Baloo 2;
  font-size: 16px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CustomerRegister;


