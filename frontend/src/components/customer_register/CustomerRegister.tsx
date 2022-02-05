import { useState } from "react";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import CustomerRegisterContainer from "../../containers/CustomerRegisterContainer";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const CustomerRegister = () => {
  const [current, setCurrent] = useState(0);
  const [clicked, setClicked] = useState(false);
  const clickToggle = () => {
    setClicked(!clicked);
  };
  return (
    <Layout>
      <Header>
        <Circle>
          <InnerCircle></InnerCircle>
        </Circle>
      </Header>
      <Form>
        <CustomerRegisterContainer
          current={current}
          checked={clicked}
          callBack={clickToggle}
        />
      </Form>
      <ButtonDiv
        style={{ justifyContent: current == 0 ? "center" : "space-between" }}
      >
        <Button
          onClick={() => {
            setCurrent(Math.max(0, current - 1));
          }}
          style={{ display: current == 0 ? "none" : "flex" }}
        >
          <MdOutlineNavigateBefore />
          Back
        </Button>
        <Button
          style={{
            pointerEvents: clicked ? "unset" : "none",
          }}
          onClick={() => {
            setCurrent(Math.min(2, current + 1));
          }}
        >
          {current == 2 ? (
            <>
              Done
              <MdOutlineNavigateNext />{" "}
            </>
          ) : (
            <>
              Next
              <MdOutlineNavigateNext />
            </>
          )}
        </Button>
      </ButtonDiv>
    </Layout>
  );
};
const Layout = styled.div`
  width: 535px;
  position: absolute;
  left: 131px;
  top: 164px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 95px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 20px 20px 0px 0px;
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
  width: 100%;
`;

const ButtonDiv = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  padding: 15px 15px 15px 15px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  width: 86px;
  height: 40px;
  border: none;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CustomerRegister;
