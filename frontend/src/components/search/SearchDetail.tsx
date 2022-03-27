import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import SearchDetailHeader from "./SearchDetailHeader";
import SearchResult from "./SearchResult";
import SearchDetailServiceSlider from "./SearchDetailServiceSlider";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import AvailableTimeCalendar from "../calendar/AvailableTimeCalendar";
import ReviewBlock from "../review/ReviewBlock";

const REVIEWMOCK = [1, 2, 3, 4, 5];
const cookies = new Cookies();
const SearchDetail = ({ person, onClickBack }: any) => {
  const user = cookies.get("user");
  console.log(person);
  return (
    <Layout style={{ maxHeight: 700, overflowY: "scroll" }}>
      <ReturnBackButton onClick={() => onClickBack(null)}>
        <FiArrowLeft size={25} />
        <p>search result</p>
      </ReturnBackButton>
      <SearchDetailHeader>
        <SearchResult person={person} />
        <ButtonDiv>
          <Link
            to={{
              //send provider ID here
              pathname: `/chat/${person.userId}`,
            }}
          >
            <Button>Message</Button>
          </Link>
          <Link
            to={{
              pathname: `/appointment/${person.userId}`,
            }}
            target="_blank"
          >
            {typeof user != "undefined" && user.user_id.slice(0, 1) == "C" && (
              <Button>Booking</Button>
            )}
          </Link>
        </ButtonDiv>
      </SearchDetailHeader>
      <ContentContainer>
        <h1>Biography</h1>
        <p>{person.biography}</p>
      </ContentContainer>
      <ContentContainer>
        <h1>Available Services</h1>
        <SearchDetailServiceSlider serviceList={person.fortuneList} />
      </ContentContainer>
      <ContentContainer>
        <h1>Reviews</h1>
        <ReviewBox>
          {REVIEWMOCK.map((item, index) => (
            <ReviewBlock key={index} />
          ))}
        </ReviewBox>
      </ContentContainer>
      <ContentContainer>
        <h1>Available Time</h1>
        <AvailableTimeCalendar providerID={person.userId} />
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
  cursor: pointer;
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

const ReviewBox = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-bottom: 10px;
`;

export default SearchDetail;
