import React, { FC, ReactElement, ReactPropTypes } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";

const SearchDetailHeader: React.FC = ({ children }) => {
  return <Layout>{children}</Layout>;
};

const Layout = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: 1050px) {
    flex-direction: column;
  }
`;

export default SearchDetailHeader;
