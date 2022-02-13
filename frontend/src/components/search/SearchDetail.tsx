import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

type SearchDetailPropType = {
  person: {
    name: string;
    username: string;
    rating: number;
    priceRange: string;
  };
};

const SearchDetail = ({ person }: SearchDetailPropType) => {
  return <Layout>dd</Layout>;
};

const Layout = styled.div`
  flex: 1;
  background-color: ${COLOR["violet/50"]};
  margin-left: 9px;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default SearchDetail;
