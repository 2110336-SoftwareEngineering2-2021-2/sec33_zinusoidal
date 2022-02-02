import { LayoutGroup } from "framer-motion";
import React from "react";
import styled from "styled-components";
import ProifileNavbar from "../components/ProifileNavbar";
import { COLOR } from "../CONSTANT";
import ProfileEdit from "../components/ProfileEdit";
import { Outlet } from "react-router-dom";
const Profile = () => {
  return (
    <Layout>
      <ProifileNavbar></ProifileNavbar>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  background: ${COLOR["magenta/100"]};
  /* background: transparent; */
  height: 100vh;
  overflow-y: scroll;
  border-radius: 20px 0 0 20px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default Profile;
