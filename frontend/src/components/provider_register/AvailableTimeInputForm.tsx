import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { AiOutlineDown } from "react-icons/ai";

type InputPropType = {
  time?: boolean;
};
const AvailableTimeInputForm = () => {
  return (
    <Layout>
      <Input>
        <input type="text" placeholder="Sunday" />
        <AiOutlineDown />
      </Input>
      <Input time>
        <input type="text" placeholder="8 : 30" />
        <AiOutlineDown />
      </Input>
      <Input time>
        <input type="text" placeholder="8 : 30" />
        <AiOutlineDown />
      </Input>
      <Button>Add</Button>
    </Layout>
  );
};

const Layout = styled("div")`
  width: 100%;
  display: flex;
  height: 38px;
  margin-top: 15px;
  align-items: center;
`;

const Input = styled("div")<InputPropType>`
  align-self: stretch;
  flex: ${(props) => (props.time ? 2 : 3)};
  /* background-color: red; */
  margin-right: 16px;
  border: 1px solid ${COLOR["gray/500"]};
  padding-right: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 12px;
  }
`;

const Button = styled.button`
  width: 54px;
  height: 28px;
  background-color: ${COLOR["violet/400"]};
  flex: 1;
  border-radius: 10000px;
  border: none;

  font-size: 12px;
  line-height: 19px;
  font-weight: bold;
  color: white;

  :hover {
    cursor: pointer;
    background-color: ${COLOR["violet/500"]};
  }
`;

export default AvailableTimeInputForm;
