import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/search/SearchBar";
import LandingNav from "../components/landing/LandingNav";
const SearchPage = () => {
  return (
    <Layout>
      <LandingNav />
      <SearchBar />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
export default SearchPage;
