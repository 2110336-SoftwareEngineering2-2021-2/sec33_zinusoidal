import { useState } from "react";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import CustomerRegisterContainer from "../../containers/CustomerRegisterContainer";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
interface Current {
  currentPage: any;
}
const CustomerRegister = () => {
  const [current, setCurrent] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [userInput, setUserInput] = useState({
    Name: "",
    Surname: "",
    Email: "",
    CitizenID: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });
  const clickToggle = () => {
    setClicked(!clicked);
  };
  console.log(userInput);
  return (
    <Layout>
      <Header>
        <Circle>
          <InnerCircle></InnerCircle>
        </Circle>
      </Header>
      <Form>
        <CustomerRegisterContainer
          userData={userInput}
          changeUserData={setUserInput}
          current={current}
          checked={clicked}
          callBack={clickToggle}
        />
      </Form>
      <ButtonDiv
        style={{ justifyContent: current == 0 ? "center" : "space-between" }}
      >
        <PrevButton
          onClick={() => {
            setCurrent(Math.max(0, current - 1));
          }}
          style={{ display: current == 0 ? "none" : "flex" }}
        >
          <MdOutlineNavigateBefore />
          Back
        </PrevButton>
        <Button
          currentPage={current}
          style={{
            backgroundColor:
              current == 2
                ? COLOR["green/400"]
                : clicked
                ? COLOR["violet/400"]
                : COLOR["gray/400"],
            pointerEvents: clicked ? "unset" : "none",
          }}
          onClick={() => {
            setCurrent(Math.min(2, current + 1));
          }}
        >
          {current == 2 ? (
            <>
              Done
              <AiOutlineCheck />{" "}
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
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1300px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 540px) {
    width: 450px;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 95px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 20px 20px 0px 0px;

  display: flex;
  justify-content: center;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background-color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  margin-top: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${COLOR["blue/100"]};
  border-radius: 10000px;
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
const PrevButton = styled.button`
  cursor: pointer;
  border: ${COLOR["violet/400"]} solid 1px;
  width: 86px;
  height: 40px;
  background-color: white;
  text-decoration: none;
  color: ${COLOR["violet/400"]};
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;

  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &:hover {
    border: ${COLOR["violet/500"]} solid 1px;
    color: ${COLOR["violet/500"]};
  }
`;
const Button = styled("button")<Current>`
  cursor: pointer;
  border: none;
  width: 86px;
  height: 40px;
  background-color: ${COLOR["violet/400"]};
  text-decoration: none;
  color: white;
  border-radius: 10000px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  :hover {
    background-color: ${(prop) =>
      prop.currentPage == 2
        ? COLOR["green/500"]
        : COLOR["violet/500"]} !important ;
  }
`;
export default CustomerRegister;
