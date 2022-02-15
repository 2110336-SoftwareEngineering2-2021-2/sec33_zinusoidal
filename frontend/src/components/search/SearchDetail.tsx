import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import SearchDetailHeader from "./SearchDetailHeader";
import SearchResult from "./SearchResult";
import SearchDetailServiceSlider from "./SearchDetailServiceSlider";
import { FiArrowLeft } from "react-icons/fi";
interface SearchDetailPropType {
  person: {
    name: string;
    username: string;
    rating: number;
    priceRange: string;
  };
  onClickBack: Function;
}

const SERVICELIST = [
  { serviceName: "Bird", servicePrice: 200 },
  { serviceName: "Cat", servicePrice: 200 },
  { serviceName: "Dog", servicePrice: 200 },
  { serviceName: "Fish", servicePrice: 200 },
];
const SearchDetail = ({ person, onClickBack }: SearchDetailPropType) => {
  return (
    <Layout>
      <ReturnBackButton onClick={() => onClickBack(null)}>
        <FiArrowLeft size={25} />
        <p>search result</p>
      </ReturnBackButton>
      <SearchDetailHeader>
        <SearchResult person={person} />
        <ButtonDiv>
          <Button>Message</Button>
          <Button>Booking</Button>
        </ButtonDiv>
      </SearchDetailHeader>
      <ContentContainer>
        <h1>Biography</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          cursus suscipit scelerisque. Donec molestie non felis id facilisis.
          Maecenas aliquam, nulla luctus posuere commodo, nisl massa viverra
          lacus, sed pulvinar magna felis ac eros. Quisque viverra facilisis
          dui. orem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          cursus suscipit scelerisque. Donec molestie non felis id facilisis.{" "}
        </p>
      </ContentContainer>
      <ContentContainer>
        <h1>Available Services</h1>
        <SearchDetailServiceSlider serviceList={SERVICELIST} />
      </ContentContainer>
      <ContentContainer>
        <h1>Reviews</h1>
      </ContentContainer>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  background-color: ${COLOR["violet/50"]};
  margin-left: 9px;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  @media screen and (max-width: 768px) {
    position: relative;
    margin-left: 0px;
    width: 100%;
  }
`;

const Button = styled.button`
  width: 104px;
  height: 31px;
  background-color: ${COLOR["violet/400"]};
  font-size: 14px;
  line-height: 22px;
  color: white;
  font-weight: bold;
  margin-top: 9px;
  border-radius: 10000px;
  border: none;
  @media screen and (max-width: 1050px) {
    margin-left: 9px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  @media screen and (max-width: 1050px) {
    flex-direction: row;
    align-self: center;
  }
`;

const ContentContainer = styled.div`
  margin-top: 50px;
  /* height: 100px; */
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
      line-height: 22px;
    }
  }
  p {
    font-size: 16px;
    line-height: 25px;
    @media screen and (max-width: 1050px) {
      font-size: 12px;
      line-height: 19px;
    }
  }

  @media screen and (max-width: 1050px) {
    margin-top: 31px;
  }
`;

const ReturnBackButton = styled.div`
  color: #f66257;
  font-weight: bold;
  display: flex;
  align-items: center;
  p {
    font-size: 20px;
    line-height: 31px;
    margin-left: 8px;
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export default SearchDetail;
