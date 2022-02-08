import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineStar } from "react-icons/md";

type PersonType = {
  name: string;
  username: string;
  rating: number;
  priceRange: string;
};
type SearchResultPropType = {
  person: PersonType;
};
const SearchResult = ({ person }: SearchResultPropType) => {
  const { name, username, rating, priceRange } = person;
  return (
    <Layout>
      <Image>
        <img
          src="http://images.summitmedia-digital.com/preview/images/2020/06/09/son-ye-jin-most-beautiful-woman-nm.jpg"
          alt="profle"
        />
      </Image>

      <Detail>
        <p>
          {name}
          <span>@{username}</span>
        </p>
        <Block>
          <div className="ratings">
            <div className="empty-stars"></div>
            <div
              className="full-stars"
              style={{ width: `${(rating * 100) / 5}%` }}
            ></div>
          </div>

          <p>
            <b>{rating}</b>
          </p>
        </Block>
        <Block>
          <p>
            <strong>Price rate: </strong> {priceRange}
          </p>
        </Block>
      </Detail>
    </Layout>
  );
};

const Layout = styled.div`
  height: 89px;
  display: flex;
  align-items: center;
  margin: 0 10rem;
`;

const Image = styled.div`
  width: 64px;
  height: 64px;
  background-color: red;
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const Detail = styled.div`
  flex: 1;
  align-self: stretch;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;

    span {
      font-size: 12px;
      line-height: 100%;
      color: ${COLOR["gray/700"]};
      vertical-align: middle;
      margin-left: 8px;
    }
  }
`;

const Block = styled.div`
  height: 25px;
  display: flex;
  align-items: center;

  p {
    font-size: 16px;
    line-height: 25px;
    font-weight: normal;

    b {
      margin-left: 8px;
    }
  }
`;

export default SearchResult;
