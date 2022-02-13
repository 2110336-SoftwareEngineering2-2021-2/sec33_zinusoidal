import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";

type ServicePropType = {
  serviceName: string;
  servicePrice: Number;
};
type SliderPropType = {
  serviceName: string;
  servicePrice: Number;
  idx: number;
};
type SearchDetailServiceSliderPropType = {
  serviceList: Array<ServicePropType>;
};

type ItemFramePropType = {
  idx: number;
};
const ColorSelector = (index: number) => {
  switch (index) {
    case 0:
      return "#F3F4C1";
    case 1:
      return COLOR["blue/200"];
    case 2:
      return COLOR["magenta/100"];
    case 3:
      return COLOR["gray/200"];
    default:
      return COLOR["gray/100"];
  }
};
const SearchDetailServiceSlider = ({
  serviceList,
}: SearchDetailServiceSliderPropType) => {
  return (
    <Layout>
      {serviceList.map((service, index) => (
        <SliderItem
          serviceName={service.serviceName}
          servicePrice={service.servicePrice}
          key={index}
          idx={index}
        />
      ))}
    </Layout>
  );
};

const SliderItem = ({ serviceName, servicePrice, idx }: SliderPropType) => {
  return (
    <ItemFrame idx={idx}>
      <h1>{serviceName}</h1>
      <h2>{servicePrice} Baht</h2>
    </ItemFrame>
  );
};

const Layout = styled.div`
  /* height: 200px; */
  margin-top: 27px;
  display: flex;
  max-width: 100%;
  overflow: scroll;
  @media screen and (max-width: 1050px) {
    margin-top: 20px;
  }
`;

const ItemFrame = styled("div")<ItemFramePropType>`
  min-width: 121px;
  height: 168px;
  background-color: ${(props) => ColorSelector(props.idx)};
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;

  @media screen and (max-width: 1050px) {
    height: 129px;
    min-width: 93px;
  }

  h1 {
    font-size: 20px;
    line-height: 31px;
    font-weight: bold;
  }
  h2 {
    font-size: 14px;
    line-height: 22px;
  }
`;

export default SearchDetailServiceSlider;
