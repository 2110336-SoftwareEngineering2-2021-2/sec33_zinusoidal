import { useState } from "react";

import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import ProviderRegisterContainer from "../../containers/ProviderRegisterContainer";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
interface Current {
  currentPage: any;
}
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
        <ProviderRegisterContainer
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
          disabled={!clicked}
          style={{
            backgroundColor:
              current == 4
                ? COLOR["green/400"]
                : clicked
                ? COLOR["violet/400"]
                : COLOR["gray/400"],

            pointerEvents: clicked ? "unset" : "none",
          }}
          onClick={() => {
            setCurrent(Math.min(4, current + 1));
          }}
        >
          {current == 4 ? (
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
  background-color: ${COLOR["magenta/100"]};
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
  padding: 15px 15px 15px 15px;
  border-radius: 0px 0px 20px 20px;
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
      prop.currentPage == 4
        ? COLOR["green/500"]
        : COLOR["violet/500"]} !important ;
  }
`;
export default CustomerRegister;
