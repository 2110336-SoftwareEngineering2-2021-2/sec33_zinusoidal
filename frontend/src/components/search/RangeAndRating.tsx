import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import RangeDropDown from "./RangeDropDown";
import RatingDropDowm from "./RatingDropDowm";

interface PriceRangeType {
  range?: string | null | Array<number>;
}
const RangeAndRating = ({ range, setRange, rating, setRating }: any) => {
  const [rangeOpen, setRangeOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const ratingWrapperRef = useRef(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setRangeOpen(false);
          setRatingOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(ratingWrapperRef);

  return (
    <Layout ref={ratingWrapperRef}>
      <PriceRange style={{ marginRight: 16 }} range={range}>
        <button
          onClick={() => {
            setRangeOpen(!rangeOpen);
            setRatingOpen(false);
          }}
        >
          {range == null ? `Price range (per 30 min)` : `${range}`}
        </button>
        {rangeOpen && <RangeDropDown range={range} setRange={setRange} />}
      </PriceRange>
      <PriceRange range={rating}>
        <button
          onClick={() => {
            setRatingOpen(!ratingOpen);
            setRangeOpen(false);
          }}
        >
          {rating == null
            ? `Provider's Rating`
            : `${rating[0]} - ${rating[1]} stars`}
        </button>
        {ratingOpen && (
          <RatingDropDowm
            rating={rating ? rating : [0, 5]}
            setRating={setRating}
          />
        )}
      </PriceRange>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
  max-width: 1150px;
  align-self: center;
  margin-top: 16px;
  @media screen and (max-width: 768px) {
    margin-top: 11px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
const PriceRange = styled("div")<PriceRangeType>`
  /* min-width: 174px; */
  position: relative;
  /* display: inline-block; */

  button {
    background-color: ${(props) =>
      props.range == null ? COLOR["magenta/700"] : "transparent"};
    width: 174px;
    height: 38px;
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => (props.range == null ? "white" : COLOR["magenta/700"])};
    border-radius: 8px;
    /* border: none; */
    border: 2px solid ${COLOR["magenta/700"]};
    cursor: pointer;

    @media screen and (max-width: 768px) {
      min-width: 154px;
      height: 35px;
    }

    @media screen and (max-width: 550px) {
      margin-top: 5px;
    }
  }
`;

export default RangeAndRating;
