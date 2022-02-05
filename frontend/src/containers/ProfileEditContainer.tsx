import React, { ReactElement, ReactPropTypes, useState } from "react";
import styled from "styled-components";
import EditForm from "../components/EditForm";
import { COLOR } from "../CONSTANT";
import ProfileServiceType from "./ProfileServiceType";
import ProfileAvaTime from "./ProfileAvaTime";
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
        <ProfileAvaTime />
      </Slider>
      <Button>
        <button>Save</button>
      </Button>
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
  width: 300%;
  /* background-color: green; */
  transform: ${(props) => `translateX(-${536 * props.idx}px)`};
  display: flex;
  flex-direction: row;
  /* transition: transform none 0.3s; */
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
