import React, { useState } from "react";
import styled from "styled-components";
import { Slider } from "@mui/material";
// import Slider from "@mui/base/SliderUnstyled";
import { COLOR } from "../../CONSTANT";

type RatingDropDownType = {
  rating: number[];
  setRating: Function;
};
const RatingDropDowm = ({ rating, setRating }: RatingDropDownType) => {
  const minDistance = 0.5;

  const handleChange = (
    event: Event,
    newValue: number[] | number,
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return;
    if (activeThumb === 0) {
      setRating([Math.min(newValue[0], rating[1] - minDistance), rating[1]]);
    } else {
      setRating([rating[0], Math.max(newValue[1], rating[0] + minDistance)]);
    }
  };
  return (
    <Layout>
      <Header>
        <p>Provider's Rating</p>
      </Header>
      <SliderContainer>
        <p>
          {rating[0]} - {rating[1]} stars
        </p>
        <CustomSlider
          getAriaLabel={() => "Minimum distance"}
          defaultValue={30}
          step={0.5}
          marks
          min={0.0}
          onChange={handleChange}
          max={5.0}
          value={rating}
          disableSwap
        />
      </SliderContainer>
    </Layout>
  );
};

const Layout = styled.div`
  position: absolute;
  margin-top: 4px;
  width: 276px;
  height: 142px;
  background-color: white;
  border-radius: 4px;
  padding: 4px 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 47px;
  p {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
  }
`;

const SliderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0;

  p {
    font-size: 20px;
    line-height: 31px;
  }
`;

const CustomSlider = styled(Slider)`
  color: #0f0f0f;

  & .MuiSlider-thumb {
    background-color: ${COLOR["magenta/700"]};
    box-shadow: none;
  }

  & .MuiSlider-mark {
    background-color: ${COLOR["gray/500"]};
    height: 12px;
    width: 2px;
  }

  & .MuiSlider-rail {
    opacity: 0.5;
    background-color: grey;
  }

  & .MuiSlider-track {
    height: 4px;
    background-color: ${COLOR["magenta/700"]};
    border: none;
  }
`;

export default RatingDropDowm;
