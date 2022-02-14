import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/search/SearchBar";
import LandingNav from "../components/landing/LandingNav";
import RangeAndRating from "../components/search/RangeAndRating";
import SearchResult, { PersonType } from "../components/search/SearchResult";
import SearchDetail from "../components/search/SearchDetail";
import { COLOR } from "../CONSTANT";
import { UserContext } from "../context/UserContext";
//prettier-ignore
const SEARCHRESULT = [
{name : 'Chawin Gowanit' , username : 'yongming_ym' , rating : 3.67 , priceRange : '100-2,000 baht (per 30 min)' },
{name : 'Chayut Treenarin' , username : 'clown_computing' , rating : 4.85 , priceRange : '500-700 baht (per 30 min)' },
{name : 'Nathapong Sriwathanasak' , username : 'ryu_io' , rating : 4.02 , priceRange : '1,500-30,000 baht (per 30 min)' },

]

type SearchPanePropType = {
  pressed: boolean;
};

const SearchPage = () => {
  const msg = useContext(UserContext);
  const [showResult, setShowResult] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(
    null as PersonType | null
  );
  const [pressed, setPressed] = useState(false);
  return (
    <Layout>
      <LandingNav />
      <SearchPane
        pressed={pressed}
        style={{ marginTop: pressed ? 0 : "248px" }}
      >
        {!pressed && <h1>Find provider that match to you!</h1>}
        <SearchBar
          setShowResult={() => {
            setShowResult(!showResult);
            if (!pressed) setPressed(true);
          }}
        />
        <RangeAndRating />
        <Button onClick={() => {}}>Search</Button>
      </SearchPane>

      {showResult && (
        <Padding>
          <SearchContent>
            <SearchResultList>
              {SEARCHRESULT.map((item, index) => (
                <SearchResult
                  key={index}
                  person={item}
                  onClick={setSelectedPerson}
                  selected={selectedPerson?.username == item.username}
                />
              ))}
            </SearchResultList>
            {selectedPerson ? <SearchDetail person={selectedPerson} /> : null}
          </SearchContent>
        </Padding>
      )}
      {/* <div>{msg}</div> */}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  background-image: url(https://s3-alpha-sig.figma.com/img/df68/cd15/425f624aed5ae4c31cf5ece70613ca84?Expires=1645401600&Signature=Hd1OzQVwT-uOMTRjqoEMw4FU5QBa25WlvGZUD1XrfEJqGoNyPal2oD0VWwjt275HfYulQGopTjaf2x3eMzuVpogyqkmXPCHFkoha9zh97lUfwFmyNLkrErVHwmsPtC7xVO-ExcpOXxayyZfTsf5E9XDN6kMZM5A3sY3S7o~JRHmDIXKAFJWmf2AOyQvHp92Ar4FzpbAnt330nScB8ckksZNn2Rb0-FwGxUGdYgLl2BIudPiA6jeP8GA9PMFrJHcxW-33r9AYBArVyNlk0ucOOugrW3bekHxg5OH7Qr~GAZyWyqQMP8UVlYBHLh1~z~nakS2lu47zg8MeDePsoknb5g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA);
`;

const Button = styled.button`
  height: 36px;
  background-color: ${COLOR["violet/400"]};
  border: none;
  border-radius: 10000px;
  width: 163px;
  font-size: 16px;
  line-height: 25px;
  color: white;
  cursor: pointer;
  margin-top: 11px;
  align-self: flex-start;
  @media screen and (min-width: 769px) {
    display: none;
  }
  :hover {
    background-color: ${COLOR["violet/500"]};
  }
  :active {
    background-color: ${COLOR["violet/600"]};
  }
`;
const SearchPane = styled("div")<SearchPanePropType>`
  background-color: ${COLOR["violet/200"]};
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.pressed ? "32px" : "64px")};
  align-items: center;
  h1 {
    font-size: 36px;
    line-height: 57px;
    font-weight: bold;
    margin-left: 10rem;
    margin-bottom: 32px;
  }
`;

const Padding = styled.div`
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchContent = styled.div`
  display: flex;
  margin: 8px 0px 17px;
  max-width: 1150px;
  flex: 1;
  width: 100%;

  @media screen and (max-width: 900px) {
    /* flex-direction: column; */
  }
`;

const SearchResultList = styled.div`
  background-color: ${COLOR["violet/50"]};
  align-self: flex-start;
  border-radius: 8px;
  width: 450px;
  /* align-self: stretch; */

  @media screen and (max-width: 900px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default SearchPage;
