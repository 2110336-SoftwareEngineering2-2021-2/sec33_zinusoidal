import React from "react";
import styled from "styled-components";

const DayBar = () => {
  return (
    <Layout>
      <p>Sun</p>
      <p>Mon</p>
      <p>Tue</p>
      <p>Wed</p>
      <p>Thu</p>
      <p>Fri</p>
      <p>Sat</p>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  p {
    text-align: center;
  }
`;
export default DayBar;
