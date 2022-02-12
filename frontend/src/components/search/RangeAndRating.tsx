import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import RangeDropDown from "./RangeDropDown";
import RatingDropDowm from "./RatingDropDowm";

interface PriceRangeType {
  range?: string | null | Array<number>;
}
const RangeAndRating = () => {
  const [rangeOpen, setRangeOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [range, setRange] = useState(null);
  const [rating, setRating] = useState([0, 5]);
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
      <PriceRange range={range}>
        <button onClick={() => setRangeOpen(!rangeOpen)}>
          {range == null ? `Price range (per 30 min)` : `${range}`}
        </button>
        {rangeOpen && <RangeDropDown range={range} setRange={setRange} />}
      </PriceRange>
      <PriceRange style={{ marginLeft: 16 }} range={rating}>
        <button onClick={() => setRatingOpen(!ratingOpen)}>
          {rating == null
            ? `Provider's Rating`
            : `${rating[0]} - ${rating[1]} stars`}
        </button>
        {ratingOpen && <RatingDropDowm rating={rating} setRating={setRating} />}
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
`;
const PriceRange = styled("div")<PriceRangeType>`
  min-width: 174px;
  position: relative;
  /* display: inline-block; */

  button {
    background-color: ${(props) =>
      props.range == null ? COLOR["magenta/700"] : "transparent"};
    min-width: 174px;
    height: 38px;
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => (props.range == null ? "white" : COLOR["magenta/700"])};
    border-radius: 8px;
    /* border: none; */
    border: 2px solid ${COLOR["magenta/700"]};
    cursor: pointer;
  }
`;

export default RangeAndRating;
