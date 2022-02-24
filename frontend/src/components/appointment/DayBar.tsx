import React, { memo } from "react";
import styled from "styled-components";

const DayBar = () => {
  return (
    <Layout>
      <p style={{ color: "#F44336" }}>Sun</p>
      <p style={{ color: "#E7EA5B" }}>Mon</p>
      <p style={{ color: "#E691B3" }}>Tue</p>
      <p style={{ color: "#83DE6D" }}>Wed</p>
      <p style={{ color: "#F88279" }}>Thu</p>
      <p style={{ color: "#7CBDFC" }}>Fri</p>
      <p style={{ color: "#B46CDF" }}>Sat</p>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 30px;
  display: grid;
  margin: 20px 0 5px;
  grid-template-columns: repeat(7, 1fr);
  p {
    text-align: left;
    padding-left: 5px;
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }
`;
export default memo(DayBar);
