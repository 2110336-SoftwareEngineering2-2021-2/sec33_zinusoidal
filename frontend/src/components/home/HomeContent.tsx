import React from "react";
import styled from "styled-components";
import { COLOR } from "../../CONSTANT";
import ProviderProfile from "../provider/ProviderProfile";
const HomeContent = () => {
  return (
    <Layout>
      <ProviderProfile />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: ${COLOR["blue/100"]};
  flex: 1;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  overflow: scroll;
`;
export default HomeContent;
