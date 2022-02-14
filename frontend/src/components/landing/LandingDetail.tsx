import React from "react";
import styled from "styled-components";

type LandingDetailPropType = {
  headerText: string;
  detail: string;
};
const LandingDetail = ({ headerText, detail }: LandingDetailPropType) => {
  return (
    <Layout>
      <h1>{headerText}</h1>
      <p>{detail}</p>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 38px;
    text-align: center;
  }

  p {
    font-size: 20px;
    line-height: 31px;
    text-align: center;
  }
`;

export default LandingDetail;
