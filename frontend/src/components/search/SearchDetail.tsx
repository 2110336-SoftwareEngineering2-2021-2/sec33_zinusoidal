import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import SearchResult from "./SearchResult";

type SearchDetailPropType = {
  person: {
    name: string;
    username: string;
    rating: number;
    priceRange: string;
  };
};

const SearchDetail = ({ person }: SearchDetailPropType) => {
  return (
    <Layout>
      <SearchResult person={person} />
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  background-color: ${COLOR["violet/50"]};
  margin-left: 9px;
  border-radius: 8px;
`;

export default SearchDetail;
