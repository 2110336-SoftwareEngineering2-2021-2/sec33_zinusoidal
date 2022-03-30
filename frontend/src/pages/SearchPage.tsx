import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/search/SearchBar";
import LandingNav from "../components/landing/LandingNav";
import RangeAndRating from "../components/search/RangeAndRating";
import SearchResult, { PersonType } from "../components/search/SearchResult";
import SearchDetail from "../components/search/SearchDetail";
import { COLOR } from "../CONSTANT";
import { UserContext } from "../context/UserContext";
import { ImBlocked } from "react-icons/im";
import Cookies from "universal-cookie";
import axios from "axios";
const searchBg = require("../assets/searchBg.jpeg");
const cookies = new Cookies();

//prettier-ignore
// const SEARCHRESULT : any = null
// // [
// // {name : 'Chawin Gowanit' , username : 'yongming_ym' , rating : 3.67 , priceRange : '100-2,000 baht (per 30 min)' },
// // {name : 'Chayut Treenarin' , username : 'clown_computing' , rating : 4.85 , priceRange : '500-700 baht (per 30 min)' },
// // {name : 'Nathapong Sriwathanasak' , username : 'ryu_io' , rating : 4.02 , priceRange : '1,500-30,000 baht (per 30 min)' },

// // ]

type SearchPanePropType = {
  pressed: boolean;
};
type SearchResultListPropType = {
  selected: boolean;
};

const SearchPage = () => {
  const [showResult, setShowResult] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(
    null as PersonType | null
  );
  const [pressed, setPressed] = useState(false);

  const [SEARCHRESULT, setSEARCHRESULT] = useState(null as any);
  const [searchWord, setSearchWord] = useState("");
  const [serviceList, setServiceList] = useState(["All"] as string[]);
  const [range, setRange] = useState(null);
  const [rating, setRating] = useState(null);

  const searchRequestHandler = async () => {
    setSelectedPerson(null);
    let data = {};
    if (serviceList.length == 1 && serviceList[0] == "All") {
      data = { ...data, fortuneType: [] };
    } else {
      data = { ...data, fortuneType: serviceList };
    }
    if (rating != null) {
      data = { ...data, minRating: rating[0], maxRating: rating[1] };
    }
    if (range == "All") {
      data = { ...data, minPrice: 0, maxPrice: 1000000 };
    }
    if (range == "Below 50 baht (per 30 min)") {
      data = { ...data, minPrice: 0, maxPrice: 50 };
    }
    if (range == "50-100 baht (per 30 min)") {
      data = { ...data, minPrice: 50, maxPrice: 100 };
    }
    if (range == "100-200 baht (per 30 min)") {
      data = { ...data, minPrice: 100, maxPrice: 200 };
    }
    if (range == "200-500 baht (per 30 min)") {
      data = { ...data, minPrice: 200, maxPrice: 500 };
    }
    if (range == "500-1000 baht (per 30 min)") {
      data = { ...data, minPrice: 500, maxPrice: 1000 };
    }
    if (range == "Above 1000 baht (per 30 min)") {
      data = { ...data, minPrice: 1000, maxPrice: 1000000 };
    }

    data = { ...data, keyword: searchWord };

    await axios({
      method: "post",
      url: `https://zinusoidal-fortune.kirkpig.dev/api/fortune168/v1/search`,
      data: data,
    })
      .then(function (response) {
        if (!pressed) setPressed(true);

        setSEARCHRESULT(response.data);
        console.log("RESST", response.data);
      })
      .catch(function (error) {});
  };

  return (
    <Layout>
      <LandingNav />
      <SearchPane pressed={pressed} style={{ marginTop: pressed ? 0 : "15%" }}>
        {!pressed && <h1>Find provider that match to you!</h1>}
        <SearchBar
          setShowResult={() => {
            setShowResult(!showResult);
            if (!pressed) setPressed(true);
          }}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          serviceList={serviceList}
          setServiceList={setServiceList}
          searchRequestHandler={searchRequestHandler}
        />
        <RangeAndRating
          range={range}
          setRange={setRange}
          rating={rating}
          setRating={setRating}
        />
        <Button
          onClick={() => {
            searchRequestHandler();
          }}
        >
          Search
        </Button>
      </SearchPane>

      {pressed && (
        <Padding>
          <SearchContent>
            <SearchResultList selected={selectedPerson == null ? false : true}>
              {SEARCHRESULT != null ? (
                SEARCHRESULT.map((item: any, index: number) => (
                  <SearchResult
                    key={index}
                    person={item}
                    onClick={setSelectedPerson}
                    selected={selectedPerson?.username == item.username}
                  />
                ))
              ) : (
                <SearchNotFound>
                  <ImBlocked size={80} />
                  <h1>Search not found</h1>
                </SearchNotFound>
              )}
            </SearchResultList>
            {selectedPerson ? (
              <SearchDetail
                person={selectedPerson}
                onClickBack={setSelectedPerson}
              />
            ) : null}
          </SearchContent>
        </Padding>
      )}
      {/* <div>{msg}</div> */}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  position: relative;
  flex: 1 1 auto;
  min-height: max(100vh, 1000px);
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  overflow-y: visible;
  background-image: url(${searchBg});
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
  position: relative;
  h1 {
    font-size: 36px;
    line-height: 57px;
    font-weight: bold;
    /* margin-left: 10rem; */
    margin-bottom: 32px;

    width: 100%;
    max-width: 1150px;

    @media screen and (max-width: 768px) {
      font-size: 18px;
      line-height: 28px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: ${(props) => (props.pressed ? "16px" : "32px 16px")};
  }
`;

const Padding = styled.div`
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;
const SearchContent = styled.div`
  display: flex;
  margin: 8px 0px 17px;
  max-width: 1150px;
  flex: 1;
  width: 100%;
  position: relative;
  @media screen and (max-width: 900px) {
    /* flex-direction: column; */
  }
`;

const SearchResultList = styled("div")<SearchResultListPropType>`
  background-color: ${COLOR["violet/50"]};
  align-self: flex-start;
  border-radius: 8px;
  width: 450px;
  max-height: 605px;
  /* align-self: stretch; */
  overflow-y: auto;

  @media screen and (max-width: 930px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.selected == true ? "none" : "initial")};
  }
`;

const SearchNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 175px;
  flex-direction: column;

  h1 {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
    margin-top: 16px;
  }
`;
export default SearchPage;
