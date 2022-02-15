import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import { MdOutlineStar } from "react-icons/md";

export interface PersonType {
  name: string;
  username: string;
  rating: number;
  priceRange: string;
}
interface SearchResultPropType {
  person: PersonType;
  onClick?: Function;
  selected?: boolean;
}

interface LayoutPropType {
  selected: boolean;
}
const SearchResult = ({
  person,
  onClick,
  selected = false,
}: SearchResultPropType) => {
  const { name, username, rating, priceRange } = person;
  return (
    <Layout
      onClick={() => {
        if (!onClick) return;
        onClick(person);
      }}
      selected={selected}
    >
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
            <strong>Price rate: </strong>
            {priceRange}
          </p>
        </Block>
      </Detail>
    </Layout>
  );
};

const Layout = styled("div")<LayoutPropType>`
  min-height: 121px;
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: ${(props) =>
    props.selected ? COLOR["violet/200"] : "transparent"};
  border-radius: 8px;

  flex: 1;
`;

const Image = styled.div`
  min-width: 64px;
  width: 64px;
  height: 64px;
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
  /* min-height: 89px; */

  p {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
    display: inline;

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
  min-height: 25px;
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
