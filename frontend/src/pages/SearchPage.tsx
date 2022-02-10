import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/search/SearchBar";
import LandingNav from "../components/landing/LandingNav";
import RangeAndRating from "../components/search/RangeAndRating";
import SearchResult from "../components/search/SearchResult";
import SearchDetail from "../components/search/SearchDetail";
import { COLOR } from "../CONSTANT";
import { Outlet, NavLink } from "react-router-dom";
//prettier-ignore
const SEARCHRESULT = [
{name : 'Chawin Gowanit' , username : 'yongming_ym' , rating : 3.67 , priceRange : '100-2,000 baht (per 30 min)' },
{name : 'Chayut Treenarin' , username : 'clown_computing' , rating : 4.85 , priceRange : '500-700 baht (per 30 min)' },
{name : 'Nathapong Sriwathanasak' , username : 'ryu_io' , rating : 4.02 , priceRange : '1,500-30,000 baht (per 30 min)' },

]

const SearchPage = () => {
  const [showResult, setShowResult] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <Layout>
      <LandingNav />
      <SearchPane>
        <SearchBar
          setShowResult={() => {
            setShowResult(!showResult);
          }}
        />
        <RangeAndRating />
      </SearchPane>

      <br></br>
      {showResult && (
        <SearchContent>
          <SearchResultList>
            {SEARCHRESULT.map((item, index) => (
              <SearchResult
                key={index}
                person={item}
                onClick={setSelectedPerson}
              />
            ))}
          </SearchResultList>
          {selectedPerson ? <SearchDetail person={selectedPerson} /> : null}
        </SearchContent>
      )}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  background-image: url(https://s3-alpha-sig.figma.com/img/df68/cd15/425f624aed5ae4c31cf5ece70613ca84?Expires=1645401600&Signature=Hd1OzQVwT-uOMTRjqoEMw4FU5QBa25WlvGZUD1XrfEJqGoNyPal2oD0VWwjt275HfYulQGopTjaf2x3eMzuVpogyqkmXPCHFkoha9zh97lUfwFmyNLkrErVHwmsPtC7xVO-ExcpOXxayyZfTsf5E9XDN6kMZM5A3sY3S7o~JRHmDIXKAFJWmf2AOyQvHp92Ar4FzpbAnt330nScB8ckksZNn2Rb0-FwGxUGdYgLl2BIudPiA6jeP8GA9PMFrJHcxW-33r9AYBArVyNlk0ucOOugrW3bekHxg5OH7Qr~GAZyWyqQMP8UVlYBHLh1~z~nakS2lu47zg8MeDePsoknb5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
`;

const SearchPane = styled.div`
  background-color: ${COLOR["violet/200"]};
  display: flex;
  flex-direction: column;
  padding: 32px 0;
`;

const SearchContent = styled.div`
  display: flex;
  margin: 0 10rem 5rem;

  flex: 1;
`;

const SearchResultList = styled.div`
  background-color: ${COLOR["violet/50"]};
  align-self: flex-start;
  border-radius: 8px;
`;
export default SearchPage;
