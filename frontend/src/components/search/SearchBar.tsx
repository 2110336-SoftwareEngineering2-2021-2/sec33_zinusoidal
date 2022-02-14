import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiSearch } from "react-icons/fi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import SearchDropdown from "./SearchDropdown";

type SearchBarPropType = {
  setShowResult: Function;
};
const SearchBar = ({ setShowResult }: SearchBarPropType) => {
  const [searchWord, setSearchWord] = useState("");
  const [serviceList, setServiceList] = useState(["All"] as string[]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleDropdown = (e: any) => {
    setDropDownOpen(!dropDownOpen);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropDownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const handleServiceList = (service: string, type: number) => {
    //type 1 add
    if (type == 1) {
      if (service == "All") {
        setServiceList(["All"]);
        return;
      }
      if (serviceList.length == 1 && serviceList[0] == "All") {
        setServiceList([service]);
      } else {
        const newServiceList: Array<string> = [...serviceList, service];
        setServiceList(newServiceList);
      }
    } else {
      const newServiceList: Array<string> = serviceList.filter(
        (s) => s != service
      );
      if (newServiceList.length === 0) {
        setServiceList(["All"]);
      } else {
        setServiceList(newServiceList);
      }
    }
  };

  return (
    <Layout>
      <SearchInput>
        <FiSearch style={{ marginLeft: 16 }} size={16} />
        <input
          type="text"
          placeholder="Provider's name, or keyword"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </SearchInput>
      <ServiceTypeContainer ref={wrapperRef}>
        <ServiceTypeSelector onClick={handleDropdown}>
          <BsFillPersonLinesFill style={{ marginLeft: 16 }} />
          <p>
            {serviceList.length == 1 && serviceList[0] == "All"
              ? "All types of service"
              : serviceList.join(",")}
          </p>
          <DownArrow>
            <AiOutlineDown />
          </DownArrow>
        </ServiceTypeSelector>
        {dropDownOpen ? (
          <SearchDropdown
            serviceList={serviceList}
            handleServiceList={handleServiceList}
          />
        ) : null}
      </ServiceTypeContainer>

      <button onClick={() => setShowResult()}>Search</button>
    </Layout>
  );
};

const Layout = styled.div`
  margin-bottom: 0 0px 16px;
  display: flex;
  align-items: center;
  max-width: 1150px;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  button {
    height: 36px;
    background-color: ${COLOR["violet/400"]};
    border: none;
    border-radius: 10000px;
    width: 178px;
    font-size: 16px;
    line-height: 25px;
    color: white;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      display: none;
    }
    :hover {
      background-color: ${COLOR["violet/500"]};
    }
    :active {
      background-color: ${COLOR["violet/600"]};
    }
  }
`;

const SearchInput = styled.div`
  flex: 1;
  height: 38px;
  background-color: white;

  border-radius: 8px;
  display: flex;
  align-items: center;

  :focus-within {
    outline: auto;
  }
  @media screen and (max-width: 768px) {
    align-self: flex-start;
    width: 100%;
  }

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

const ServiceTypeContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 8px;

  @media screen and (max-width: 768px) {
    margin-top: 11px;
    margin-left: 0;
    align-self: flex-start;
  }
`;
const ServiceTypeSelector = styled.div`
  height: 38px;
  background-color: white;
  width: 320px;
  margin-right: 8px;
  border-radius: 8px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  position: relative;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    width: 255.5px;
  }

  p {
    margin-left: 8px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const DownArrow = styled.div`
  width: 40px;
  height: 100%;
  margin: 0 16px 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default SearchBar;
