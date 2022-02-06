import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../CONSTANT";
import EditForm from "./EditForm";
import ProfileEditContainer from "../containers/ProfileEditContainer";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
const ProfileEdit = () => {
  const [current, setCurrent] = useState(0);
  return (
    <View>
      <AiOutlineLeft
        onClick={() => {
          setCurrent(Math.max(0, current - 1));
        }}
        size={100}
        color="white"
        style={{
          visibility: current == 0 ? "hidden" : "visible",
          cursor: "pointer",
        }}
      />
      <Layout>
        <HeaderBar />
        <Content>
          {/* <EditForm /> */}
          <ProfileEditContainer current={current} />
        </Content>
      </Layout>

      <AiOutlineRight
        onClick={() => {
          setCurrent(Math.min(2, current + 1));
        }}
        size={100}
        color="white"
        style={{
          visibility: current == 2 ? "hidden" : "visible",
          cursor: "pointer",
        }}
      />
    </View>
  );
};

const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Layout = styled.div`
  width: 536px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 20px;
`;

const HeaderBar = styled.div`
  width: 100%;
  background-color: ${COLOR["violet/400"]};
  height: 95px;
  border-radius: 20px 20px 0 0;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProfileEdit;
