import React, { ReactElement, ReactPropTypes, useState } from "react";
import styled from "styled-components";
import EditForm from "../components/EditForm";
import ProfileServiceType from "./ProfileServiceType";

interface SliderProp {
  idx: number;
}

interface ProfileEditContainer {}
const ProfileEditContainer = ({ children, current }: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <EditForm />
        <ProfileServiceType />
        <EditForm />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;

  /* background-color: red; */
`;

const Slider = styled("div")<SliderProp>`
  width: 300%;
  /* background-color: green; */
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  /* transition: transform none 0.3s; */
`;

export default ProfileEditContainer;
