import React, { ReactElement, ReactPropTypes, useState } from "react";
import styled from "styled-components";
import EditForm from "../components/edit_profile/EditForm";
import EditServiceType from "../components/edit_profile/EditServiceType";
import EditAvailableTime from "../components/edit_profile/EditAvailableTime";

import { COLOR } from "../CONSTANT";
import EditPassword from "../components/edit_profile/EditPassword";
import EditPasswordComplete from "../components/edit_profile/EditPasswordComplete";
import DeleteAccount from "../components/edit_profile/DeleteAccount";
import DeleteComplete from "../components/edit_profile/DeleteComplete";
interface SliderProp {
  idx: number;
}

interface ProfileEditContainer {}
const ProfileEditContainer = ({
  setCurrent,
  profilePicUrl,
  setProfilePicUrl,
  setGetProfilePicUrl,
  getProfilePicUrl,
  userData,
  changeUserData,
  current,
  service,
  setService,
  availableTime,
  setAvailableTime,
}: any) => {
  return (
    <Layout>
      <Slider idx={current}>
        <EditForm
          setCurrent={setCurrent}
          profilePicUrl={profilePicUrl}
          setProfilePicUrl={setProfilePicUrl}
          userData={userData}
          changeUserData={changeUserData}
          getProfilePicUrl={getProfilePicUrl}
          setGetProfilePicUrl={setGetProfilePicUrl}
        />
        <EditServiceType service={service} setService={setService} />
        <EditAvailableTime
          availableTime={availableTime}
          setAvailableTime={setAvailableTime}
        />
        <EditPassword setCurrent={setCurrent} />
        <EditPasswordComplete setCurrent={setCurrent} />
        <DeleteAccount setCurrent={setCurrent} userData={userData} />
        <DeleteComplete />
      </Slider>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  display: flex;

  /* background-color: red; */
`;

const Slider = styled("div")<SliderProp>`
  width: 700%;
  transform: ${(props) => `translateX(-${535 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 540px) {
    transform: ${(props) => `translateX(-${450 * props.idx}px)`};
  }
  @media screen and (max-width: 450px) {
    transform: ${(props) => `translateX(-${300 * props.idx}px)`};
  }
`;
const Button = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  button {
    width: 104px;
    height: 48px;
    background-color: ${COLOR["violet/400"]};
    color: white;
    font-size: 20px;
    font-weight: bold;
    line-height: 31px;
    border-radius: 10000px;
    outline: none;
    border: 0px solid;
    cursor: pointer;
  }
`;
export default ProfileEditContainer;
