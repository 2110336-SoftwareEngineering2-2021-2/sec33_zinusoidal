import React from "react";
import styled from "styled-components";
import { COLOR } from "../CONSTANT";
const ProfileServiceType = () => {
  return (
    <Layout>
      <SearchBar>
        <p>Service Type</p>
        <Input>
          <input type="text" />
          <button>Search</button>
        </Input>
      </SearchBar>
      <ServiceList></ServiceList>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;

  /* background-color:; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBar = styled.div`
  width: 100%;
  height: 184px;
  border-radius: 0 0 20px 20px;
  background-color: white;
  padding: 1rem;

  p {
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
`;

const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  margin-top: 0.5rem;
  align-items: center;
  input {
    flex: 1;
    height: 32px;
    outline: none;
    border: 1px solid ${COLOR["gray/600"]};
    border-radius: 8px;
    margin-right: 1rem;
  }
  button {
    width: 96px;
    height: 32px;
    background-color: ${COLOR["violet/400"]};
    border-radius: 10000px;
    outline: none;
    border: none;
    font-size: 16px;
    line-height: 25px;
    color: white;
    cursor: pointer;
  }
`;
const ServiceList = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  height: 100%;
  background-color: white;
  border-radius: 20px;
`;
export default ProfileServiceType;
