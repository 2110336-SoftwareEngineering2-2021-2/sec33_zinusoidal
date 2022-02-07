import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Service from "./Service";

const SERVICELIST = [
  "All",
  "Taro",
  "ไพ่ยิปซี",
  "ไพ่",
  "Dropdown Item #4",
  "Dropdown Item #5",
  "Dropdown Item #6",
];
interface SearchDropDownType {
  serviceList: string[];
  handleServiceList: Function;
}
const SearchDropdown = ({
  serviceList,
  handleServiceList,
}: SearchDropDownType) => {
  const [searchWord, setSearchWord] = useState("");
  return (
    <Layout>
      <SearchInput>
        <FiSearch style={{ marginLeft: 16 }} size={16} />
        <input
          type="text"
          placeholder="Search for services"
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
      </SearchInput>
      {SERVICELIST.map(
        (item, index) =>
          item.toLowerCase().includes(searchWord.toLowerCase()) && (
            <Service
              service={item}
              key={index}
              selected={serviceList.includes(item)}
              callback={handleServiceList}
            />
          )
      )}
    </Layout>
  );
};

const Layout = styled.div`
  position: absolute;
  top: 42px;
  max-height: 246px;
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: scroll;
  padding: 4px 0;
  z-index: 1;
  /* pointer-events: none !important; */
`;

const SearchInput = styled.div`
  height: 38px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    border-radius: 8px;
    border: none;
    padding-left: 8px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    outline: none;
    height: 38px;
  }
`;

export default SearchDropdown;
