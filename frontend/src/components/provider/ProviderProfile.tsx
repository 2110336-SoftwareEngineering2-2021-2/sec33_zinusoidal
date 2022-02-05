import React from "react";
import styled from "styled-components";
import HeaderPad from "../common/HeaderPad";
import ProviderDetail from "./ProviderDetail";

const ProviderProfile = () => {
  return (
    <Layout>
      <HeaderPad />
      <ProviderDetail />
    </Layout>
  );
};

const Layout = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

export default ProviderProfile;
