import React, { useState } from "react";
import styled from "styled-components";
import LandingNav from "../components/landing/LandingNav";
import EditProfile from "../components/edit_profile/EditProfile";
import { COLOR } from "../CONSTANT";

const EditProfilePage = () => {
  return (
    <Layout>
      <LandingNav />
      <Form>
        <EditProfile />
      </Form>
    </Layout>
  );
};

const Layout = styled.div`
  min-height: max(100vh, 1024px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR["magenta/100"]};
`;
const Form = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

export default EditProfilePage;
