import React from "react";
import styled from "styled-components";
import { IoRadioButtonOff, IoRadioButtonOnOutline } from "react-icons/io5";

const RANGE = [
  "All",
  "Below 50 baht (per 30 min)",
  "50-100 baht (per 30 min)",
  "100-200 baht (per 30 min)",
  "200-500 baht (per 30 min)",
  "500-1000 baht (per 30 min)",
  "Above 1000 baht (per 30 min)",
];

interface RangeDropDownType {
  range: string | null;
  setRange: Function;
}
const RangeDropDown = ({ range, setRange }: RangeDropDownType) => {
  return (
    <Layout>
      {RANGE.map((item) => (
        <Item key={item}>
          {range == item ? (
            <IoRadioButtonOnOutline size={24} onClick={() => setRange(null)} />
          ) : (
            <IoRadioButtonOff size={24} onClick={() => setRange(item)} />
          )}
          <span>{item}</span>
        </Item>
      ))}
    </Layout>
  );
};
const Layout = styled.div`
  position: absolute;
  width: 240px;
  margin-top: 4px;
  height: 274px;
  background-color: white;
  border-radius: 4px;
  padding: 4px 0;
`;

const Item = styled.div`
  height: 38px;
  /* background-color: red; */
  padding: 11px 12px;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    line-height: 22px;
    margin-left: 8px;
    width: 100%;
  }
`;

export default RangeDropDown;
