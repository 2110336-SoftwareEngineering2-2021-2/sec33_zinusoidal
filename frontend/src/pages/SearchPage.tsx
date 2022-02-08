import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/search/SearchBar";
import LandingNav from "../components/landing/LandingNav";
import RangeAndRating from "../components/search/RangeAndRating";
import SearchResult from "../components/search/SearchResult";
//prettier-ignore
const SEARCHRESULT = [
{name : 'Chawin Gowanit' , username : 'yongming_ym' , rating : 3.67 , priceRange : '100-2,000 baht (per 30 min)' },
{name : 'Chayut Treenarin' , username : 'clown_computing' , rating : 4.85 , priceRange : '500-700 baht (per 30 min)' },
{name : 'Nathapong Sriwathanasak' , username : 'ryu_io' , rating : 4.02 , priceRange : '1,500-30,000 baht (per 30 min)' },

]

const SearchPage = () => {
  const [showResult, setShowResult] = useState(false);
  return (
    <Layout>
      <LandingNav />
      <SearchBar
        setShowResult={() => {
          setShowResult(!showResult);
        }}
      />
      <RangeAndRating />
      <br></br>
      {showResult &&
        SEARCHRESULT.map((item, index) => (
          <SearchResult key={index} person={item} />
        ))}
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
