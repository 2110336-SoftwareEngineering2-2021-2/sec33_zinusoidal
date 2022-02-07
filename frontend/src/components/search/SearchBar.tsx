import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { FiSearch } from "react-icons/fi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import SearchDropdown from "./SearchDropdown";
const SearchBar = () => {
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
      const newServiceList: Array<string> = [...serviceList, service];
      setServiceList(newServiceList);
    } else {
      const newServiceList: Array<string> = serviceList.filter(
        (s) => s != service
      );
      setServiceList(newServiceList);
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

      <button>Search</button>
    </Layout>
  );
};

const Layout = styled.div`
  margin: 76px 10rem 16px;
  display: flex;
  align-items: center;

  button {
    height: 38px;
    background-color: ${COLOR["violet/400"]};
    border: none;
    border-radius: 10000px;
    width: 112px;
    font-size: 16px;
    line-height: 25px;
    color: white;

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
  input {
    width: 100%;
    border-radius: 8px;
    border: none;
    padding-left: 8px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    outline: none;
  }
`;

const ServiceTypeContainer = styled.div`
  position: relative;
  display: inline-block;
`;
const ServiceTypeSelector = styled.div`
  height: 38px;
  background-color: white;
  width: 320px;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  position: relative;

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
